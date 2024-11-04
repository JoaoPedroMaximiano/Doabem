<?php

namespace App\Http\Controllers;

use App\Models\Necessidade;
use App\Models\EventoBeneficente;
use App\Models\LocalDoacao;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DoacaoController extends Controller
{
    public function create()
    {
        return Inertia::render('Doacao/Cadastro', [
            'necessidades' => Necessidade::getNecessidadesForCadastroDoacao(),
            'eventos' => EventoBeneficente::getEventosBeneficentesForCadastroDoacao(),
            'locais' => LocalDoacao::getLocalDoacaoForCadastroDoacao(),
        ]);
    }

    public function store(Request $request)
    {
        return response($request->all(), 200);
    }
}
