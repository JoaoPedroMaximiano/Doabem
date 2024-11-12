<?php

namespace App\Http\Controllers;

use App\Models\Necessidade;
use App\Models\EventoBeneficente;
use App\Models\LocalDoacao;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ListagemController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $idEntidade = null;
        if ($user && $user->nivel_acesso == 'entidade') $idEntidade = $user->id;

        return Inertia::render('Listagem/Listagem', [
            'listagem' => [
                'Necessidades' => Necessidade::getNecessidadesForListagem($idEntidade),
                'Eventos' => EventoBeneficente::getEventosBeneficentesForListagem($idEntidade),
                'Locais' => LocalDoacao::getLocalDoacaoForListagem($idEntidade),
            ],
        ]);
    }
}
