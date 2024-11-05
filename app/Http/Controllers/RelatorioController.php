<?php

namespace App\Http\Controllers;

use App\Models\Doacao;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RelatorioController extends Controller
{
    public function relatorioDoacaoPage(){
        $usuario = Auth::user();

        $doacoes = Doacao::whereHas('doador', function ($query) use ($usuario) {
                $query->where('id_usuario', $usuario->id_usuario);
            })
            ->with('doador')
            ->get(['id', 'descricao', 'data_recebimento', 'qtd']);
    
        $response = [];
    
        foreach ($doacoes as $doacao) {
            $dataRecebimento = Carbon::parse($doacao->data_recebimento);
            $mesAno = $dataRecebimento->format('Y-m'); 
    
            if (!isset($response[$mesAno])) {
                $response[$mesAno] = [];
            }
    
            $response[$mesAno][] = [
                'id_doacao' => $doacao->id,
                'descricao' => $doacao->descricao,
                'cpf_doador' => $doacao->doador->cpf, 
                'data_inicio' => $dataRecebimento->startOfMonth()->format('Y-m-d'),
                'data_fim' => $dataRecebimento->endOfMonth()->format('Y-m-d'),
                'quantidade' => $doacao->qtd,
                'nome_doador' => $doacao->doador->nome,
            ];
        }

        return Inertia::render('Relatorio/EntidadeBeneficente/RelatorioDoacao', ['doacao' => $response]);
    }
}
