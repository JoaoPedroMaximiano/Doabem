<?php

namespace App\Http\Controllers;

use App\Models\DestinoDoacao;
use App\Models\Doacao;
use App\Models\DestinoFinal;
use App\Models\Doador;
use App\Models\EntidadeBeneficente;
use App\Models\Necessidade;
use App\Models\EventoBeneficente;
use App\Models\LocalDoacao;
use App\Models\Usuario;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DoacaoController extends Controller
{
    public function create()
    {
        $user = Auth::user();
        $idEntidade = null;

        if ($user && $user->nivel_acesso == 'entidade') $idEntidade = EntidadeBeneficente::where('id_usuario', $user->id)->first('id')->id;

        return Inertia::render('Doacao/Cadastro', [
            'necessidades' => Necessidade::getNecessidadesForCadastroDoacao($idEntidade),
            'eventos' => EventoBeneficente::getEventosBeneficentesForCadastroDoacao($idEntidade),
            'locais' => LocalDoacao::getLocalDoacaoForCadastroDoacao($idEntidade),
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

        $usuario = Auth::user();
        $idEntidade = EntidadeBeneficente::where('id_usuario', $usuario->id)->first('id')->id;
        $dadosInsert = [
            'id_doador' => $doador->id,
            'id_entidade_beneficente' => $idEntidade,
            'id_destino_final' => null,
            'descricao' => $request->descricao,
            'qtd' => $request->qtd,
        ];

        $dadosInsert['id_necessidade'] = $request->tipoDoacao == 'necessidade' ? $request->idTipoDoacao : null;
        $dadosInsert['id_evento_beneficente'] = $request->tipoDoacao == 'evento' ? $request->idTipoDoacao : null;
        $dadosInsert['id_local_doacao'] = $request->tipoDoacao == 'local' ? $request->idTipoDoacao : null;
        DB::beginTransaction();
        $doacao = Doacao::create($dadosInsert);

        DestinoDoacao::create([
            'id_doacao' => $doacao->id,
            'status' => 'Recebida',
            'data_atualizacao' => now()
        ]);

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
            'quantidade' => 'required|integer|min:1',
        ]);

        $dados = $request->all();
        $doacao = Doacao::findOrFail($dados['id']);

        DB::beginTransaction();

        $doacao->update([
            'descricao' => $dados['descricao'],
            'qtd' => $dados['quantidade'],
            'data_recebimento' => $dados['dataRecebimento'],
            'id_destino_final' => $dados['idDestinoFinal']
        ]);
        DestinoDoacao::where('id_doacao', $doacao->id)->delete();
        foreach ($dados['situacoes'] as $destinoFinal) {
            DestinoDoacao::create([
                'id_doacao' => $doacao->id,
                'status' => $destinoFinal['status'],
                'data_atualizacao' => now()
            ]);
        }

        DB::commit();

        return response('Atualização bem sucedida', 200);
    }

    public function storeFinalDestination(Request $request)
    {
        $request->validate([
            'nome' => 'required|string',
        ]);

        $usuario = Auth::user();

        $entidade = EntidadeBeneficente::where('id_usuario', $usuario->id)->first();

        if (!$entidade) {
            return response()->json([
                'error' => 'Nenhuma entidade associada ao usuário.',
            ], 400);
        }

        $dados = $request->all();
        $destinoFinal = new DestinoFinal;
        $destinoFinal->nome = $dados['nome'];
        $destinoFinal->id_entidade_beneficente = $entidade->id;
        $destinoFinal->save();

        return response()->json([
            'message' => 'Destino Final criado com sucesso!',
            'destinoFinal' => [
                'value' => $destinoFinal->id,
                'label' => $destinoFinal->nome,
            ]
        ], 200);
    }

    public function verifyDonator(Request $request)
    {
        $doador = Doador::where('cpf', $request->cpf)->first();
        return response()->json(['exists' => !empty($doador)]);
    }

    public function storeDoador(Request $request) {
        $request->validate([
            'login' => 'required|string|unique:usuarios,login',
            'email' => 'required|email|unique:usuarios,email',
            'celular' => 'required|string|min:15',
            'nomeCompleto' => 'required|string',
            'cpf' => 'required|string|unique:doadores,cpf',
            'senha' => 'required|string|min:6|confirmed',
        ], [
            'senha.confirmed' => 'A confirmação de senha não coincide com a senha.',
            'senha_confirmation.required' => 'O campo confirmação de senha é obrigatório.',
        ]);

        DB::beginTransaction();

        try {
            $usuario = Usuario::create([
                'login' => $request->login,
                'email' => $request->email,
                'celular' => $request->celular,
                'senha' => $request->senha,
                'nivel_acesso' => 'doador',
                'status' => 'ativo',
            ]);

            Doador::create([
                'id_usuario' => $usuario->id,
                'nome' => $request->nomeCompleto,
                'cpf' => $request->cpf,
            ]);

            DB::commit();

            return response()->json(['message' => 'Usuário e doador cadastrados com sucesso!'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Erro ao cadastrar usuário e entidade.'], 500);
        }
    }
}
