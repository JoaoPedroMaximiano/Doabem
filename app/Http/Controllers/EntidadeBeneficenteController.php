<?php

namespace App\Http\Controllers;

use App\Models\EntidadeBeneficente;
use Illuminate\Http\Request;

class EntidadeBeneficenteController extends Controller
{
    public function index(Request $request)
    {
        $entidade = EntidadeBeneficente::create([
            'id_usuario' => 1,
            'cnpj' => '12.345.678/0001-90',
            'razao_social' => 'Razão Social',
            'nome_fantasia' => 'Nome Fantasia',
        ]);

        if ($entidade->hasCnpj());

        $entidades = EntidadeBeneficente::all();
        dd($entidade);

    }
}
