<?php

namespace App\Http\Controllers;

use App\Models\Doador;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DoadorController extends Controller
{
    public function index(Request $request)
    {
        $doador = Doador::create([
            'id_usuario' => 1,
            'nome' => 'João da Silva',
            'cpf' => '123.456.789-00',
        ]);

        if ($doador->isValid());
        $doadores = Doador::all();
        dd($doadores);
    }

    public function create(){
        return Inertia::render('Autenticacao/CadastrarDoador');
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'login' => 'required|string|unique:usuarios,login',
            'email' => 'required|email|unique:usuarios,email',
            'celular' => 'required|string|min:11',
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
            Auth::login($usuario);

            return response()->json(['message' => 'Usuário e doador cadastrados com sucesso!'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Erro ao cadastrar usuário e entidade.'], 500);
        }
    }
}
