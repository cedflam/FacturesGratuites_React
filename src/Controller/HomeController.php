<?php

namespace App\Controller;

use App\Entity\Company;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     *
     * @return Response
     */
    public function index()
    {
        return $this->render('home/home.html.twig', [
            "company" => $this->getUser()
        ]);
    }

    /**
     * Permet de se connecter
     *
     * @Route("/login", name="account_login")
     *
     * @param AuthenticationUtils $utils
     * @return Response
     */
    public function login(AuthenticationUtils $utils)
    {
        $error = $utils->getLastAuthenticationError();
        $username = $utils->getLastUsername();



        return $this->render('home/home.html.twig', [
            'hasError' => $error,
            'username' => $username
        ]);
    }

    /**
     * Permet de se deconnecter
     * @Route("/logout", name="account_logout")
     */
    public function logout()
    {
        //géré par Symfony
    }
}
