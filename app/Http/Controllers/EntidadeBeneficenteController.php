<?php

namespace App\Http\Controllers;

use App\Models\EntidadeBeneficente;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EntidadeBeneficenteController extends Controller
{
    public function index(Request $request)
    {
        $entidade = EntidadeBeneficente::create([
            'id_usuario' => 1,
            'cnpj' => '12.345.678/0001-90',
            'razao_social' => 'Razão Social',
            'nome_fantasia' => 'Nome Fantasia',
        ]);

        if ($entidade->hasCnpj());

        $entidades = EntidadeBeneficente::all();
        dd($entidade);

    }

    public function create(){
        return Inertia::render('Autenticacao/CadastrarEntidadeBeneficente');
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'login' => 'required|string|max:255|unique:usuarios,login',
            'email' => 'required|email|max:255|unique:usuarios,email',
            'celular' => 'required|string|min:10|max:14',
            'senha' => 'required|string|min:6|confirmed',
            'cnpj' => 'required|string|unique:entidade_beneficentes,cnpj',
            'razaoSocial' => 'required|string|max:255',
            'nomeFantasia' => 'required|string|max:255',
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
                'nivel_acesso' => 'entidade',
                'status' => 'ativo',
            ]);

            EntidadeBeneficente::create([
                'id_usuario' => $usuario->id,
                'cnpj' => $request->cnpj,
                'razao_social' => $request->razaoSocial,
                'nome_fantasia' => $request->nomeFantasia,
            ]);

            DB::commit();
            Auth::login($usuario);

            return response()->json(['message' => 'Usuário e Entidade cadastrados com sucesso!'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Erro ao cadastrar usuário e entidade.'], 500);
        }
    }
}
