<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DescriptionRepository")
 */
class Description
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $devlivery;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $quantity;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $unit;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $unitPrice;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $tva;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $htAmount;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $ttcAmount;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Estimate", inversedBy="descriptions")
     */
    private $estimate;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDevlivery(): ?string
    {
        return $this->devlivery;
    }

    public function setDevlivery(?string $devlivery): self
    {
        $this->devlivery = $devlivery;

        return $this;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(?float $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getUnit(): ?string
    {
        return $this->unit;
    }

    public function setUnit(?string $unit): self
    {
        $this->unit = $unit;

        return $this;
    }

    public function getUnitPrice(): ?float
    {
        return $this->unitPrice;
    }

    public function setUnitPrice(?float $unitPrice): self
    {
        $this->unitPrice = $unitPrice;

        return $this;
    }

    public function getTva(): ?float
    {
        return $this->tva;
    }

    public function setTva(?float $tva): self
    {
        $this->tva = $tva;

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

    public function getEstimate(): ?Estimate
    {
        return $this->estimate;
    }

    public function setEstimate(?Estimate $estimate): self
    {
        $this->estimate = $estimate;

        return $this;
    }
}
