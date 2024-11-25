<?php

namespace App\Http\Controllers;

use App\Models\DestinoDoacao;
use App\Models\Doacao;
use App\Models\DestinoFinal;
use App\Models\DestinoDoacao;
use App\Models\Doador;
use App\Models\Necessidade;
use App\Models\EventoBeneficente;
use App\Models\LocalDoacao;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DoacaoController extends Controller
{
    public function create()
    {
        return Inertia::render('Doacao/Cadastro', [
            'necessidades' => Necessidade::getNecessidadesForCadastroDoacao(),
            'eventos' => EventoBeneficente::getEventosBeneficentesForCadastroDoacao(),
            'locais' => LocalDoacao::getLocalDoacaoForCadastroDoacao(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cpf' => 'required|exists:doadores,cpf',
            'descricao' => 'required|string',
            'idTipoDoacao' => 'required|integer',
            'qtd' => 'required|integer|min:1',
            'tipoDoacao' => 'required|string|in:necessidade,evento,local',
        ]);
        $doador = Doador::where('cpf', $request->cpf)->first();

        $dadosInsert = [
            'id_doador' => $doador->id,
            'id_entidade_beneficente' => Auth::id(),
            'id_destino_final' => null,
            'descricao' => $request->descricao,
            'qtd' => $request->qtd,
        ];

        $dadosInsert['id_necessidade'] = $request->tipoDoacao == 'necessidade' ? $request->idTipoDoacao : null;
        $dadosInsert['id_evento_beneficente'] = $request->tipoDoacao == 'evento' ? $request->idTipoDoacao : null;
        $dadosInsert['id_local_doacao'] = $request->tipoDoacao == 'local' ? $request->idTipoDoacao : null;
        
        DB::beginTransaction();
        Doacao::insert($dadosInsert);
        DB::commit();

        return response()->json(['message' => "Sucesso"]);
    }

    public function edit($id)
    {
        $doacao = Doacao::find($id);
        if (!$doacao) {
            return redirect('/');
        }
        $destinosFinaisTemp = DestinoFinal::where('id_entidade_beneficente', $doacao->id_entidade_beneficente)->get();
        $destinosFinais = [];
        foreach ($destinosFinaisTemp as $destino) {
            $destinosFinais[] = [
                'value' => $destino->id,
                'label' => $destino->nome,
            ];
        }

        $situacoes = DestinoDoacao::where('id_doacao', $doacao->id)->get();
        return Inertia::render('Doacao/Gerenciar', [
            'doacao' => $doacao,
            'destinosFinais' => $destinosFinais,
            'situacoes' => $situacoes,
        ]);
    }

    public function update(Request $request) 
    {
        $request->validate([
            'descricao' => 'required|string',
            'qtd' => 'required|integer|min:1',
        ]);
    
        $dados = $request->all();
        $doacao = Doacao::findOrFail($dados['id']);
    
        DB::beginTransaction();
    
        $doacao->update([
            'descricao' => $dados['descricao'],
            'qtd' => $dados['qtd'],
            'data_recebimento' => $dados['dataRecebimento'],
            'id_destino_final' => $dados['idDestinoFinal']
        ]);
    
        DB::table('destinos_doacoes')
            ->where('id_doacao', $doacao->id)
            ->delete();
    
        foreach ($dados['destinoFinal'] as $destinoFinal) {
            DestinoDoacao::create([
                'id_doacao' => $doacao->id,
                'status' => 'ativo',
                'data_atualizacao' => now()
            ]);
        }
        
        DB::commit();
    
        return response('Atualização bem sucedida', 200);
    }

    public function storeFinalDestination(Request $request)
    {
    }

    public function verifyDonator(Request $request)
    {
        $doador = Doador::where('cpf', $request->cpf)->first();
        return response()->json(['exists' => !empty($doador)]);
    }
}
