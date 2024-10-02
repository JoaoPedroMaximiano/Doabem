<?php

namespace App\Http\Controllers;

use App\Models\Doador;
use App\Models\EntidadeBeneficente;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $usuario = Usuario::create([
            'login' => 'entidade',
            'senha' => '1234',
            'email' => 'entidade@doacao.com',
            'celular' => '11987654321',
            'status' => 'ativo',
        ]);

        if ($usuario->isAtivo());

        $usuarios = Usuario::all();
        dd($usuarios);
    }

    public function logout(Request $request){
        Auth::logout();
        return redirect('/');
    }

    public function loginPage(){
        return Inertia::render('Autenticacao/Login');
    }

    public function autenticacao(Request $request){
        $request->validate([
            'cpf' => 'required|string',
            'senha' =>'required|string',
        ], [
            'cpf.required' => 'O campo CPF ou CNPJ é obrigatório'
        ]);

        if (strlen(str_replace(['.', '/', '-'], '', $request->cpf)) >= 14) {
            $entidade = EntidadeBeneficente::where('cnpj', $request->cpf)->first();
        } else {
            $entidade = Doador::where('cpf', $request->cpf)->first();
        }

        if ($entidade) {
            $usuario = Usuario::find($entidade->id_usuario);
            if ($usuario && password_verify($request->senha, $usuario->senha)) {
                Auth::login($usuario);
                return response("Autenticação realizada com sucesso", 200);
            }
        }

        return response("Ocorreu um erro na hora da autenticação", 400);
    }

}
