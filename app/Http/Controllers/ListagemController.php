<?php

namespace App\Http\Controllers;

use App\Models\Necessidade;
use App\Models\EventoBeneficente;
use App\Models\LocalDoacao;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListagemController extends Controller
{
    public function index()
    {
        $listagem = [
            'Necessidades' => Necessidade::where('status', 'ativo')->get()->toArray(),
            'Eventos' => EventoBeneficente::where('status', 'ativo')->get()->toArray(),
            'Locais' => LocalDoacao::where('status', 'ativo')->get()->toArray(),
        ];

        return Inertia::render('Listagem/Listagem', [
            'listagem' => $listagem,
        ]);
    }
}
