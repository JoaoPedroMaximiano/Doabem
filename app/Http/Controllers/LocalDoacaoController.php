<?php

namespace App\Http\Controllers;

use App\Models\EntidadeBeneficente;
use App\Models\Local;
use App\Models\LocalDoacao; 
use Inertia\Inertia;

class LocalDoacaoController extends Controller
{
    public function create(){
        return Inertia::render('LocalDoacao/Cadastro');
    }

    public function paginaDetalhe($id){
        $localDoacao = LocalDoacao::findOrfail($id);
        
        $response = [
            'localDoacao' => $localDoacao,
            'entidade' => EntidadeBeneficente::findOrFail($localDoacao->id_entidade_beneficente),
            'local' => Local::findOrFail($localDoacao->id_local),
        ];
        return Inertia::render('LocalDoacao/Detalhe', $response);
    }

    public function paginaEditar($id){
        $localDoacao = LocalDoacao::findOrfail($id);
        
        $response = [
            'localDoacao' => $localDoacao,
            'entidade' => EntidadeBeneficente::findOrFail($localDoacao->id_entidade_beneficente),
            'local' => Local::findOrFail($localDoacao->id_local),
        ];

        dd($response);
        return Inertia::render('LocalDoacao/Detalhe', $response);
    }
}
