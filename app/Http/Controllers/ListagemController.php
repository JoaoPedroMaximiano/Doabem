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
        $necessidades = Necessidade::where('status', 'ativo')->get()->toArray();
        $eventos = EventoBeneficente::where('status', 'ativo')
            ->whereDate('data_inicio', '<=', now())
            ->whereDate('data_fim', '>=', now())
            ->get()
            ->toArray();
        $locais = LocalDoacao::where('status', 'ativo')->get()->toArray();

        $listagem = [
            'Necessidades' => $necessidades,
            'Eventos' => $eventos,
            'Locais' => $locais,
        ];

        return Inertia::render('Listagem/Listagem', [
            'listagem' => $listagem,
        ]);
    }
}
