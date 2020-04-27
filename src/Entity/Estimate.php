<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EstimateRepository")
 */
class Estimate
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"customers", "estimates"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"customers", "estimates"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"customers", "estimates"})
     *
     */
    private $htAmount;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"customers", "estimates"})
     */
    private $ttcAmount;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Invoice", cascade={"persist", "remove"})
     */
    private $invoice;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="estimates")
     */
    private $company;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="estimates")
     * @Groups({"estimates"})
     */
    private $customer;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Description", mappedBy="estimate")
     */
    private $descriptions;

    public function __construct()
    {
        $this->descriptions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getHtAmount(): ?float
    {
        return $this->htAmount;
    }

    public function setHtAmount(?float $htAmount): self
    {
        $this->htAmount = $htAmount;

        return $this;
    }

    public function getTtcAmount(): ?float
    {
        return $this->ttcAmount;
    }

    public function setTtcAmount(?float $ttcAmount): self
    {
        $this->ttcAmount = $ttcAmount;

        return $this;
    }

    public function getInvoice(): ?Invoice
    {
        return $this->invoice;
    }

    public function setInvoice(?Invoice $invoice): self
    {
        $this->invoice = $invoice;

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

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * @return Collection|Description[]
     */
    public function getDescriptions(): Collection
    {
        return $this->descriptions;
    }

    public function addDescription(Description $description): self
    {
        if (!$this->descriptions->contains($description)) {
            $this->descriptions[] = $description;
            $description->setEstimate($this);
        }

        return $this;
    }

    public function removeDescription(Description $description): self
    {
        if ($this->descriptions->contains($description)) {
            $this->descriptions->removeElement($description);
            // set the owning side to null (unless already changed)
            if ($description->getEstimate() === $this) {
                $description->setEstimate(null);
            }
        }

        return $this;
    }
}
