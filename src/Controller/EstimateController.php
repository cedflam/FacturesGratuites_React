<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Entity\Estimate;
use App\Repository\EstimateRepository;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\DocBlock\Serializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class EstimateController extends AbstractController
{
    /**
     * @Route("/estimates", name="estimates")
     */
    public function index()
    {
        return $this->render('estimate/estimates.html.twig');
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

    /**
     * Permet d'afficher un devis
     *
     * @Route("/estimates/{id}", name="estimate_show")
     *
     * @param Customer $customer
     * @param EstimateRepository $repo
     * @param SerializerInterface $serializer
     * @param ValidatorInterface $validator
     * @return Response
     */
    public function editEstimate(Customer $customer, EstimateRepository $repo, SerializerInterface $serializer, ValidatorInterface $validator)
    {
        $estimates = $repo->findBy(['customer'=> $customer]);
        $data = $serializer->serialize($estimates, 'json', [
           "groups"=>"estimates"
        ]);

        //Je gère les erreurs
        $violations = $validator->validate($estimates);
        if (count($violations) > 0) {
            $error = $serializer->serialize($violations, 'json');
            return JsonResponse::fromJsonString($error, Response::HTTP_BAD_REQUEST);
        }

        return new Response($data, Response::HTTP_OK);
    }
}
