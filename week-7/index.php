<?php
declare(strict_types=1);

require_once __DIR__ . '/controllers/ClinicController.php';

$assetPath = '../assets/images/';
$clinicModel = new ClinicModel($assetPath);
$clinicController = new ClinicController($clinicModel);
$clinicController->index();
