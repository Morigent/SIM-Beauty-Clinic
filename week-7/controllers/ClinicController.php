<?php
declare(strict_types=1);

require_once __DIR__ . '/../models/ClinicModel.php';

class ClinicController
{
    private ClinicModel $clinicModel;

    public function __construct(ClinicModel $clinicModel)
    {
        $this->clinicModel = $clinicModel;
    }

    public function index(): void
    {
        $doctors = $this->clinicModel->getDoctors();
        $services = $this->clinicModel->getServices();
        $slides = $this->clinicModel->getSlides();

        require __DIR__ . '/../views/home.php';
    }
}
