<?php

namespace App\Http\Controllers;

use App\Models\Necessidade;
use Illuminate\Http\Request;

class NecessidadeController extends Controller
{
    public function index(Request $request)
    {
        $necessidade = Necessidade::create([
            'identidade_beneficente' => 1,
            'id_local' => 1,
            'nome' => 'Alimentos Não Perecíveis',
            'descricao' => 'Arrecadação de alimentos não perecíveis para famílias necessitadas.',
            'data_cadastro' => now(),
            'qtd_necessaria' => 100,
            'imagem' => 'imagem_necessidade.jpg',
            'status' => 'ativo',
        ]);

        if ($necessidade->isAtiva());

        $necessidades = Necessidade::all();
        dd($necessidades);
    }
}
