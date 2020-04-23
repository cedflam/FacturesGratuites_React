<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Customer;
use App\Entity\Description;
use App\Entity\Estimate;
use App\Entity\Invoice;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {

        $faker = Factory::create('fr-FR');


        for ($i = 0; $i < 10; $i++) {


            $company = new Company();
            $company
                ->setCompanyName($faker->company)
                ->setFirstName($faker->firstName)
                ->setLastName($faker->lastName)
                ->setAddress($faker->streetAddress)
                ->setPostalCode($faker->postcode)
                ->setCity($faker->city)
                ->setEmail($faker->companyEmail)
                ->setTel($faker->e164PhoneNumber)
                ->setPassword($this->encoder->encodePassword($company, 'password'));


            for ($j = 0; $j < 10; $j++) {
                $customer = new Customer();
                $customer
                    ->setFirstName($faker->firstName)
                    ->setLastName($faker->lastName)
                    ->setAddress($faker->streetAddress)
                    ->setPostalCode($faker->postcode)
                    ->setCity($faker->city)
                    ->setEmail($faker->email)
                    ->setTel($faker->e164PhoneNumber);

                for ($k = 0; $k < 10; $k++) {
                    $invoice = new Invoice();
                    $invoice
                        ->setCompany($company)
                        ->setCreatedAt($faker->dateTimeBetween('-3 month', 'now'))
                        ->setTotalAdvance(0)
                        ->setRemaining(0)
                        ->setHtAmount(0)
                        ->setTtcAmount(0);

                    for ($n = 0; $n < 1; $n++) {
                        $estimate = new Estimate();
                        $estimate
                            ->setCompany($company)
                            ->setCustomer($customer)
                            ->setInvoice($invoice)
                            ->setCreatedAt($invoice->getCreatedAt())
                            ->setHtAmount($invoice->getHtAmount())
                            ->setTtcAmount($invoice->getTtcAmount());

                        for ($t = 0; $t < 5; $t++) {
                            $description = new Description();
                            $description
                                ->setEstimate($estimate)
                                ->setDevlivery($faker->sentence(6))
                                ->setQuantity(mt_rand(1, 10))
                                ->setUnit("Unité")
                                ->setUnitPrice(mt_rand(10, 1000))
                                ->setTva(19.6)
                                ->setHtAmount($description->getQuantity() * $description->getUnitPrice())
                                ->setTtcAmount($description->getHtAmount() * 19.6 / 100 + $description->getHtAmount());

                            $manager->persist($description);
                        }
                        $manager->persist($estimate);
                    }
                    $manager->persist($invoice);
                }
                $customer->setCompany($company);
                $manager->persist($customer);
            }
            $manager->persist($company);
        }
        $manager->flush();
    }
}
