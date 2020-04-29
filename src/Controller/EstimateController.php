<?php

namespace App\Controller;

use App\Entity\Description;
use App\Entity\Estimate;
use App\Repository\CustomerRepository;
use App\Repository\EstimateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class EstimateController extends AbstractController
{
    /**
     * @Route("/estimates", name="estimates")
     */
    public function estimatesPage()
    {
        return $this->render('ReactIndex/index.html.twig');
    }

    /**
     * @Route("/estimates/new", name="estimate_new")
     * @return Response
     */
    public function estimateNewPage()
    {
        return $this->render('ReactIndex/index.html.twig');
    }



    /**
     * Permet de récupérer l'ensemble des devis liés à une company
     *
     * @Route("/estimates/findAll", name="estimates_find_all")
     *
     * @param EstimateRepository $repo
     * @param SerializerInterface $serializer
     * @return Response
     */
    public function findAll(EstimateRepository $repo, SerializerInterface $serializer)
    {
        $estimates = $repo->findBy(['company' => $this->getUser()]);
        $data = $serializer->serialize($estimates, 'json', [
            "groups" => "estimates"
        ]);

        return new Response($data, Response::HTTP_OK);
    }

    /**
     * @Route("/estimates/add", name="estimates_add")
     * @param CustomerRepository $customerRepo
     * @param SerializerInterface $serializer
     * @param EntityManagerInterface $manager
     * @param Request $request
     */
    public function estimateAdd(CustomerRepository $customerRepo, SerializerInterface $serializer, EntityManagerInterface $manager, Request $request)
    {
        $data = $request->getContent();
        dump($data);
    }



    /**
     * Permet de supprimer un devis
     *
     * @Route("/estimates/delete/{id}", name="estimate_delete")
     *
     * @param Estimate $estimate
     * @param EntityManagerInterface $manager
     * @return Response
     */
    public function deleteEstimate(Estimate $estimate, EntityManagerInterface $manager)
    {
        $manager->remove($estimate);
        $manager->flush();

        return new Response('deleted', Response::HTTP_NO_CONTENT);
    }


}
