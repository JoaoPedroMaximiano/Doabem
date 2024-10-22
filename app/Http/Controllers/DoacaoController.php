<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DoacaoController extends Controller
{
    public function create()
    {
        return Inertia::render('Doacao/Cadastro');
    }

    public function store(Request $request)
    {
        return response($request->all(), 200);
    }
}
