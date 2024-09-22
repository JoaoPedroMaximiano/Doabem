<?php

namespace App\Http\Controllers;

use App\Models\Doacao;
use Illuminate\Http\Request;

class DoacaoController extends Controller
{
    public function index(Request $request)
    {
        $doacao = Doacao::create([
            'id_doador' => 1,
            'identidade_beneficente' => 1,
            'id_destino_final' => 1,
            'id_necessidade' => 1,
            'id_evento_beneficente' => 1,
            'id_local_doacao' => 1,
            'descricao' => 'Doação de alimentos',
            'qtd' => 50,
            'data_recebimento' => now(),
        ]);

        $doacoes = Doacao::with([
            'doador',
            'entidadeBeneficente',
            'destinoFinal',
            'necessidade',
            'eventoBeneficente',
            'localDoacao'
        ])->get();

        dd($doacoes);
    }
}
