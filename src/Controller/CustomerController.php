<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CustomerController extends AbstractController
{
    /**
     * @Route("/customers", name="customers")
     */
    public function index()
    {
        return $this->render('customer/customers.html.twig');
    }


}
