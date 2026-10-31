<?php
declare(strict_types=1);

abstract class ClinicItem
{
    protected int $id;
    protected string $name;
    protected string $status;
    protected string $image;

    public function __construct(int $id, string $name, string $status, string $image)
    {
        $this->id = $id;
        $this->name = $name;
        $this->status = $status;
        $this->image = $image;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    protected function hasStatus(string $status): bool
    {
        return $this->status === $status;
    }

    abstract public function getStatusLabel(): string;

    abstract public function getStatusBadgeClass(): string;
}
