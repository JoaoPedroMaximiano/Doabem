<?php

namespace App\Http\Controllers;

use App\Models\EntidadeBeneficente;
use App\Models\EventoBeneficente;
use App\Models\Local;
use Inertia\Inertia;

class EventoController extends Controller
{
    public function paginaDetalhe($id){
        $evento = EventoBeneficente::findOrfail($id);
        
        $response = [
            'evento' => $evento,
            'entidade' => EntidadeBeneficente::findOrFail($evento->id_entidade_beneficente),
            'local' => Local::findOrFail($evento->id_local),
        ];
        return Inertia::render('Evento/Detalhe', $response);
    }
}
