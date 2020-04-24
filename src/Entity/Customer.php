<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CustomerRepository")
 */
class Customer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"customers"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers"})
     */
    private $postalCode;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers"})
     */
    private $tel;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Estimate", mappedBy="customer")
     *
     */
    private $estimates;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="customers")
     * @Groups({"customers"})
     */
    private $company;

    public function __construct()
    {
        $this->estimates = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel;
    }

    public function setTel(string $tel): self
    {
        $this->tel = $tel;

        return $this;
    }

    /**
     * @return Collection|Estimate[]
     */
    public function getEstimates(): Collection
    {
        return $this->estimates;
    }

    public function addEstimate(Estimate $estimate): self
    {
        if (!$this->estimates->contains($estimate)) {
            $this->estimates[] = $estimate;
            $estimate->setCustomer($this);
        }

        return $this;
    }

    public function removeEstimate(Estimate $estimate): self
    {
        if ($this->estimates->contains($estimate)) {
            $this->estimates->removeElement($estimate);
            // set the owning side to null (unless already changed)
            if ($estimate->getCustomer() === $this) {
                $estimate->setCustomer(null);
            }
        }

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): self
    {
        $this->company = $company;

        return $this;
    }
}
