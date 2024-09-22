<?php

namespace App\Http\Controllers;

use App\Models\LocalDoacao;
use Illuminate\Http\Request;

class LocalDoacaoController extends Controller
{
    public function index(Request $request)
    {
        $localDoacao = LocalDoacao::create([
            'id_entidade_beneficente' => 1,
            'id_local' => 1,
            'nome' => 'Local de Doação Exemplo',
            'descricao' => 'Local de doação para arrecadação de itens.',
            'data_cadastro' => now(),
            'imagem' => 'imagem_local.jpg',
            'status' => 'ativo',
        ]);

        if ($localDoacao->isAtivo());

        $locais = LocalDoacao::all();
        dd($locais);
    }
}
