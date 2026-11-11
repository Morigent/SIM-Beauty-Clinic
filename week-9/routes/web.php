<?php

use App\Http\Controllers\ClinicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Rute utama aplikasi Klinik Kecantikan menggunakan method index dari ClinicController.
|
*/

Route::get('/', [ClinicController::class, 'index'])->name('home');
Route::get('/clinic', [ClinicController::class, 'index'])->name('clinic.index');

