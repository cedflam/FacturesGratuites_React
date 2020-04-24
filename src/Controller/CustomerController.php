<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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

    /**
     * Permet de créer un customer
     *
     * @Route("/customers/new", name="customers_new")
     *
     * @param SerializerInterface $serializer
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @param ValidatorInterface $validator
     * @return Response
     */
    public function addCustomer(SerializerInterface $serializer, Request $request, EntityManagerInterface $manager, ValidatorInterface $validator)
    {
        //
        $data = $request->getContent();
        $customer = $serializer->deserialize($data,Customer::class, 'json');
        $customer->setCompany($this->getUser());

        //Je gère les erreurs
        $violations = $validator->validate($customer);
        if (count($violations) > 0) {
            $error = $serializer->serialize($violations, 'json');
            return JsonResponse::fromJsonString($error, 400);
        }
        //
        $manager->persist($customer);
        $manager->flush();

        return new Response('created', Response::HTTP_CREATED);
    }

    /**
     * Permet de récupérer un customer
     *
     * @Route("/customers/{id}", name="customers_findOne")
     *
     * @param Customer $customer
     * @param SerializerInterface $serializer
     * @return Response
     */
    public function findCustomer(Customer $customer, SerializerInterface $serializer)
    {
        $customer = $serializer->serialize($customer, 'json',[
           'groups'=>"customers"
        ]);

        return new Response($customer, Response::HTTP_OK);

    }


}
