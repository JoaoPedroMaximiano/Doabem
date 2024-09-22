<?php

namespace App\Http\Controllers;

use App\Models\Cidade;
use Illuminate\Http\Request;

class CidadeController extends Controller
{
    public function index(Request $request)
    {
        $cidade = Cidade::create([
            'id_uf' => 1,
            'nome' => 'São Paulo',
            'status' => 'ativo',
        ]);

        if ($cidade->isAtiva())
        $ufs = Cidade::all();
        dd($ufs);

    }
}
