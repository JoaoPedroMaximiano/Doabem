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
        return Inertia::render('Listagem/Listagem', [
            'listagem' => [
                'Necessidades' => Necessidade::getNecessidadesForListagem(),
                'Eventos' => EventoBeneficente::getEventosBeneficentesForListagem(),
                'Locais' => LocalDoacao::getLocalDoacaoForListagem(),
            ],
        ]);
    }
}
