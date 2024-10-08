<?php

namespace App\Http\Controllers;

use App\Models\EntidadeBeneficente;
use App\Models\Local;
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

    public function paginaDetalhe($id){
        $necessidade = Necessidade::findOrfail($id);
        
        $response = [
            'necessidade' => $necessidade,
            'entidade' => EntidadeBeneficente::findOrFail($necessidade->id_entidade_beneficente),
            'local' => Local::findOrFail($necessidade->id_local),
        ];
        return Inertia::render('Necessidade/Detalhe', $response);
    }
}
