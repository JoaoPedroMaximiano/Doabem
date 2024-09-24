<?php

namespace App\Http\Controllers;

use App\Models\Necessidade;
use App\Models\EventoBeneficente;
use App\Models\LocalDoacao;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListagemController extends Controller
{
    public function index(Request $response)
    {
        $necessidades = Necessidade::where('status', 'ativo');
        $eventos = EventoBeneficente::where('status', 'ativo');
        $locais = LocalDoacao::where('status', 'ativo');

        if (!empty($response->get('s'))) {
            $necessidades->where('nome', 'like', $response->get('s'))
                ->orWhere('descricao', 'like', $response->get('s'));
            $eventos->where('nome', 'like', $response->get('s'))
                ->orWhere('descricao', 'like', $response->get('s'));
            $locais->where('nome', 'like', $response->get('s'))
                ->orWhere('descricao', 'like', $response->get('s'));
        }

        $listagem = [
            'Necessidades' => $necessidades->get()->toArray(),
            'Eventos' => $eventos->get()->toArray(),
            'Locais' => $locais->get()->toArray(),
        ];

        return Inertia::render('Listagem/Listagem', [
            'listagem' => $listagem,
        ]);
    }
}
