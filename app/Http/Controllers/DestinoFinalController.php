<?php

namespace App\Http\Controllers;

use App\Models\DestinoFinal;
use Illuminate\Http\Request;

class DestinoFinalController extends Controller
{
    public function index(Request $request)
    {
        $destino = DestinoFinal::create([
            'nome' => 'Hospital São Paulo',
        ]);

        $destinos = DestinoFinal::all();

        dd($destinos);
    }
}
