<?php

namespace App\Http\Controllers;

use App\Models\Doacao;
use App\Models\EntidadeBeneficente;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RelatorioController extends Controller
{
    public function relatorioDoacaoPage(){
        $usuario = Auth::user();
        $entidade = EntidadeBeneficente::where('id_usuario', $usuario->id)->firstOrFail();

        $doacoes = Doacao::with('doador:id,nome,cpf')
        ->where('id_entidade_beneficente', $entidade->id)
        ->select('id', 'id_doador', 'id_entidade_beneficente', 'id_destino_final', 'id_necessidade', 'id_evento_beneficente', 'id_local_doacao', 'descricao', 'qtd', 'data_recebimento')
        ->get();

        $response = [];
        foreach ($doacoes as $doacao) {
            $dataRecebimento = Carbon::parse($doacao->data_recebimento);
            $diaMesAno = $dataRecebimento->format('d-m-Y');

            if (!isset($response[$diaMesAno])) {
                $response[$diaMesAno] = [];
            }

            $response[$diaMesAno]['itens'][] = [
                'id_doacao' => $doacao->id,
                'descricao' => $doacao->descricao,
                'cpf' => $doacao->doador->cpf,
                'data' => $dataRecebimento->startOfMonth()->format('Y-m-d'),
                'quantidade' => $doacao->qtd,
                'nome' => $doacao->doador->nome,
            ];
        }

        return Inertia::render('Relatorio/EntidadeBeneficente/RelatorioDoacao', ['doacoes' => $response]);
    }
}
