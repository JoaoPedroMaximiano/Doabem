<?php

namespace App\Http\Controllers;

use App\Models\EntidadeBeneficente;
use App\Models\EventoBeneficente;
use App\Models\Local;
use App\Models\LocalDoacao;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class EventoController extends Controller
{
    public function create(){
        return Inertia::render('Evento/Cadastro');
    }

    public function store(Request $request){
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'imagem' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'cep' => 'required|string|size:9',
            'cidade' => 'required|string|max:255',
            'uf' => 'required|string|size:2',
            'data_inicio' => 'required',
            'data_fim' => 'required',
            'estado' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $usuario = Auth::user();
        $idEntidade = EntidadeBeneficente::where('id_usuario', $usuario->id)->first('id')->id;
        $dados = $request->all();
        $nomeImagem = uniqid().".".$dados['imagem']->extension();
        $diretorio = "Eventos/";

        Storage::putFileAs('public/'.$diretorio, $dados['imagem'], $nomeImagem);

        DB::beginTransaction();

        $local = Local::findOrCreateLocal($dados);

        EventoBeneficente::create([
            'id_entidade_beneficente' => $idEntidade,
            'id_local' => $local->id,
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'],
            'data_inicio' => $dados['dataInicio'],
            'data_fim' => $dados['dataFim'],
            'imagem' => '/storage/'.$diretorio.$nomeImagem,
            'status' => 'ativo',
        ]);

        DB::commit();
        return response('Sucesso', 200);
    }

    public function paginaDetalhe($id){
        $evento = EventoBeneficente::findOrfail($id);

        $response = [
            'evento' => $evento,
            'entidade' => EntidadeBeneficente::findOrFail($evento->id_entidade_beneficente),
            'local' => Local::findOrFail($evento->id_local),
        ];
        return Inertia::render('Evento/Detalhe', $response);
    }

    public function paginaEditar($id){
        $evento = EventoBeneficente::findOrfail($id);
        $entidade = EntidadeBeneficente::findOrFail($evento->id_entidade_beneficente);
        $usuario = Auth::user();

        if ($usuario->id != $entidade->id_usuario) {
            return redirect()->route('listagem')->with('error', 'Você não tem permissão para editar esta necessidade.');
        }

        $response = [
            'evento' => $evento,
            'entidade' => $entidade,
            'local' => Local::findOrFail($evento->id_local),
        ];
        return Inertia::render('Evento/Cadastro', $response);
    }

    public function update(Request $request){
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'imagem' => 'nullable|max:2048',
            'cep' => 'required|string|size:9',
            'dataInicio' => 'required',
            'dataFim' => 'required',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $dados = $request->all();
        $evento = EventoBeneficente::findOrFail($dados['id']);

        $local = Local::findOrCreateLocal($dados);

        if ($request->hasFile('imagem')) {
            $nomeImagem = uniqid() . "." . $dados['imagem']->extension();
            $diretorio = "Eventos/";
            Storage::delete(str_replace($evento->imagem, '/storage/', 'public/'));

            Storage::putFileAs('public/' . $diretorio, $dados['imagem'], $nomeImagem);
            $dados['imagem'] = '/storage/' . $diretorio . $nomeImagem;
        } else {
            $dados['imagem'] = $evento->imagem;
        }

        DB::beginTransaction();

        $evento->update([
            'id_local' => $local->id,
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'],
            'data_inicio' => $dados['dataInicio'],
            'data_fim' => $dados['dataFim'],
            'imagem' => $dados['imagem'],
            'status' => 'ativo',
        ]);

        DB::commit();
        return response('Atualização bem-sucedida', 200);
    }
}
