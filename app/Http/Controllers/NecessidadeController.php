<?php

namespace App\Http\Controllers;

use App\Models\EntidadeBeneficente;
use App\Models\Local;
use App\Models\Necessidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NecessidadeController extends Controller
{
    public function create()
    {
        return Inertia::render('Necessidade/Cadastro');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'imagem' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'qtd' => 'required|integer|min:1',
            'cep' => 'required|string|size:8',
            'cidade' => 'required|string|max:255',
            'uf' => 'required|string|size:2',
            'estado' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $usuario = Auth::user();
        $idEntidade = EntidadeBeneficente::where('id_usuario', $usuario->id)->first('id')->id;

        $dados = $request->all();
        $nomeImagem = uniqid().".".$dados['imagem']->extension();
        $diretorio = "necessidades/";

        Storage::putFileAs('public/'.$diretorio, $dados['imagem'], $nomeImagem);
        DB::beginTransaction();

        $local = Local::findOrCreateLocal($dados);

        Necessidade::create([
            'id_entidade_beneficente' => $idEntidade,
            'id_local' => $local->id,
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'],
            'imagem' => '/storage/'.$diretorio.$nomeImagem,
            'status' => 'ativo',
            'qtd_necessaria' => $dados['qtd'],
        ]);
        DB::commit();
        return response('Sucesso', 200);
    }

    public function view($id){
        $necessidade = Necessidade::findOrfail($id);
        $necessidade->qtd_doacoes = Necessidade::getQtdDoacoesPorNecessidade($id);

        $response = [
            'necessidade' => $necessidade,
            'entidade' => EntidadeBeneficente::findOrFail($necessidade->id_entidade_beneficente),
            'local' => Local::findOrFail($necessidade->id_local),
        ];
        return Inertia::render('Necessidade/Detalhe', $response);
    }

    public function edit($id){
        $necessidade = Necessidade::findOrfail($id);
        $entidade = EntidadeBeneficente::findOrFail($necessidade->id_entidade_beneficente);
        $usuario = Auth::user();

        if ($usuario->id != $entidade->id_usuario) {
            return redirect()->route('listagem')->with('error', 'Você não tem permissão para editar esta necessidade.');
        }

        $response = [
            'necessidade' => $necessidade,
            'entidade' => $entidade,
            'local' => Local::findOrFail($necessidade->id_local),
        ];

        return Inertia::render('Necessidade/Cadastro', $response);
    }

    public function update(Request $request){
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'imagem' => 'required|max:2048',
            'qtd' => 'required|integer|min:1',
            'cep' => 'required|string|size:8',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $dados = $request->all();
        $necessidade = Necessidade::findOrFail($dados['id']);

        $local = Local::findOrCreateLocal($dados);

        if ($request->hasFile('imagem')) {
            $nomeImagem = uniqid() . "." . $dados['imagem']->extension();
            $diretorio = "necessidades/";
            Storage::delete(str_replace($necessidade->imagem, '/storage/', 'public/'));

            Storage::putFileAs('public/' . $diretorio, $dados['imagem'], $nomeImagem);
            $dados['imagem'] = '/storage/' . $diretorio . $nomeImagem;
        } else {
            $dados['imagem'] = $necessidade->imagem;
        }

        DB::beginTransaction();
        $necessidade->update([
            'id_local' => $local->id,
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'],
            'imagem' => $dados['imagem'],
            'status' => 'ativo',
            'qtd_necessaria' => $dados['qtd'],
        ]);
        DB::commit();
        return response('Atualização bem-sucedida', 200);
    }
}
