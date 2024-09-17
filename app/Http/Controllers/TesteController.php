<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TesteController extends Controller
{
    public function index()
    {
        $nome = "Douglas";

        return Inertia::render('Teste/Teste', [
            "nome" => $nome,
        ]);
    }
}
