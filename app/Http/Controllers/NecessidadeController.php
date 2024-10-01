<?php

namespace App\Http\Controllers;

use App\Models\Necessidade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NecessidadeController extends Controller
{
    public function create()
    {
        return Inertia::render('Necessidade/Cadastro');
    }

    public function store(Request $request)
    {
        return response($request->all());
    }
}
