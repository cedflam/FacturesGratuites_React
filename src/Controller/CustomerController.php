<?php

namespace App\Controller;

use App\Repository\CustomerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CustomerController extends AbstractController
{
    /**
     * @Route("/customers", name="customers")
     */
    public function index()
    {
        return $this->render('customer/customers.html.twig');
    }

    /**
     * Permet de récupérer les customers d'une company
     *
     * @Route("/customers/findAll", name="customers_find_all" )
     *
     * @param CustomerRepository $repo
     * @param SerializerInterface $serializer
     * @return Response
     */
    public function findCustomers(CustomerRepository $repo, SerializerInterface $serializer)
    {
        $customers = $repo->findBy(['company'=> $this->getUser()]);
        $data = $serializer->serialize($customers, 'json', [
            'groups'=>"customers"
        ]);

        return new Response($data, Response::HTTP_OK );

    }
}
