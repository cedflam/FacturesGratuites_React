<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $totalAdvance;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $remaining;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $htAmount;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $ttcAmount;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Advance", mappedBy="invoice")
     */
    private $advances;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="invoices")
     */
    private $company;

    public function __construct()
    {
        $this->advances = new ArrayCollection();
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

    public function getTotalAdvance(): ?float
    {
        return $this->totalAdvance;
    }

    public function setTotalAdvance(?float $totalAdvance): self
    {
        $this->totalAdvance = $totalAdvance;

        return $this;
    }

    public function getRemaining(): ?float
    {
        return $this->remaining;
    }

    public function setRemaining(?float $remaining): self
    {
        $this->remaining = $remaining;

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

    /**
     * @return Collection|Advance[]
     */
    public function getAdvances(): Collection
    {
        return $this->advances;
    }

    public function addAdvance(Advance $advance): self
    {
        if (!$this->advances->contains($advance)) {
            $this->advances[] = $advance;
            $advance->setInvoice($this);
        }

        return $this;
    }

    public function removeAdvance(Advance $advance): self
    {
        if ($this->advances->contains($advance)) {
            $this->advances->removeElement($advance);
            // set the owning side to null (unless already changed)
            if ($advance->getInvoice() === $this) {
                $advance->setInvoice(null);
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
