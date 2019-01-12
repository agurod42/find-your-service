<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebappController extends Controller
{
    public function admin()
    {
        return view('webapp/index');
    }
}