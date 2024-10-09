<?php

namespace App\Http\Controllers;

use App\Models\Cidade;
use App\Models\EntidadeBeneficente;
use App\Models\Local;
use App\Models\Necessidade;
use App\Models\Uf;
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
        $diretorio = "necessidades/";

        Storage::putFileAs('public/'.$diretorio, $dados['imagem'], $nomeImagem);
        DB::beginTransaction();
        $local = Local::where('cep', $dados['cep'])->first();
        if (empty($local)) {
            $cidade = Cidade::where('nome', $dados['cidade'])->first();
            if (empty($cidade)) {
                $uf = Uf::where('sigla', $dados['uf'])->first();
                if (empty($uf)) {
                    $uf = Uf::create([
                        'nome' => $dados['estado'],
                        'sigla' => $dados['uf'],
                        'status' => 'ativo',
                    ]);
                }

                $cidade = Cidade::create([
                    'id_uf' => $uf->id,
                    'nome' => $dados['cidade'],
                    'status' => 'ativo',
                ]);
            }

            $local = Local::create([
                'cep' => $dados['cep'],
                'id_cidade' => $cidade->id,
                'latitude' => $dados['latitude'],
                'longitude' => $dados['longitude'],
                'status' => 'ativo',
            ]);
        }

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

    public function paginaDetalhe($id){
        $necessidade = Necessidade::findOrfail($id);

        $response = [
            'necessidade' => $necessidade,
            'entidade' => EntidadeBeneficente::findOrFail($necessidade->id_entidade_beneficente),
            'local' => Local::findOrFail($necessidade->id_local),
        ];
        return Inertia::render('Necessidade/Cadastro', $response);
    }

    public function paginaEditar($id){
        $necessidade = Necessidade::findOrfail($id);
        
        $response = [
            'necessidade' => $necessidade,
            'entidade' => EntidadeBeneficente::findOrFail($necessidade->id_entidade_beneficente),
            'local' => Local::findOrFail($necessidade->id_local),
        ];
        
        dd($response);
        return Inertia::render('Necessidade/Detalhe', $response);
    }
}
