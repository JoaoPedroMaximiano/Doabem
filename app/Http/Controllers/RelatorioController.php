<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RelatorioController extends Controller
{
    public function relatorioDoacaoPage(){
        return Inertia::render('Relatorio/EntidadeBeneficente/RelatorioDoacao');
    }
}
