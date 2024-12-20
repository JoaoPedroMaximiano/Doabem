<?php

namespace App\Http\Controllers;

use App\Models\EntidadeBeneficente;
use App\Models\Local;
use App\Models\LocalDoacao;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class LocalDoacaoController extends Controller
{
    public function create(){
        return Inertia::render('LocalDoacao/Cadastro');
    }

    public function store(Request $request){
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'imagem' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'cep' => 'required|string|size:9',
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
        $diretorio = "LocaisDoacoes/";

        Storage::putFileAs('public/'.$diretorio, $dados['imagem'], $nomeImagem);

        DB::beginTransaction();

        $local = Local::findOrCreateLocal($dados);

        $localDoacao = LocalDoacao::create([
            'id_entidade_beneficente' => $idEntidade,
            'id_local' => $local->id,
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'],
            'imagem' => '/storage/'.$diretorio.$nomeImagem,
            'status' => $dados['status'],
        ]);

        DB::commit();
        return response($localDoacao->id, 200);
    }

    public function update(Request $request){
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'imagem' => 'nullable|max:2048',
            'cep' => 'required|string|size:9',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $dados = $request->all();
        $localDoacao = LocalDoacao::findOrFail($dados['id']);

        $local = Local::findOrCreateLocal($dados);

        if ($request->hasFile('imagem')) {
            $nomeImagem = uniqid() . "." . $dados['imagem']->extension();
            $diretorio = "LocaisDoacoes/";
            Storage::delete(str_replace($localDoacao->imagem, '/storage/', 'public/'));

            Storage::putFileAs('public/' . $diretorio, $dados['imagem'], $nomeImagem);
            $dados['imagem'] = '/storage/' . $diretorio . $nomeImagem;
        } else {
            $dados['imagem'] = $localDoacao->imagem;
        }

        DB::beginTransaction();

        $localDoacao->update([
            'id_local' => $local->id,
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'],
            'imagem' => $dados['imagem'],
            'status' => $dados['status'],
        ]);

        DB::commit();
        return response($localDoacao->id, 200);
    }

    public function view($id){
        $localDoacao = LocalDoacao::findOrfail($id);

        $response = [
            'localDoacao' => $localDoacao,
            'entidade' => EntidadeBeneficente::with(['usuario' => function($query) {
                $query->select('id', 'celular', 'email');
            }])->findOrFail($localDoacao->id_entidade_beneficente),
            'local' => Local::findOrFail($localDoacao->id_local),
        ];
        return Inertia::render('LocalDoacao/Detalhe', $response);
    }

    public function edit($id){
        $localDoacao = LocalDoacao::findOrfail($id);
        $entidade = EntidadeBeneficente::findOrFail($localDoacao->id_entidade_beneficente);
        $usuario = Auth::user();

        if ($usuario->id != $entidade->id_usuario) {
            return redirect()->route('listagem')->with('error', 'Você não tem permissão para editar este local de doação.');
        }

        $response = [
            'localDoacao' => $localDoacao,
            'local' => Local::findOrFail($localDoacao->id_local),
        ];

        return Inertia::render('LocalDoacao/Cadastro', $response);
    }
}
