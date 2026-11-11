<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Service;
use App\Models\Slide;
use Illuminate\Http\Request;

class ClinicController extends Controller
{
    /**
     * Display landing page with data from database.
     */
    public function index()
    {
        $slides = Slide::all();
        $doctors = Doctor::all();
        $services = Service::all();

        return view('index', compact('slides', 'doctors', 'services'));
    }
}

