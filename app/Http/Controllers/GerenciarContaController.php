<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GerenciarContaController extends Controller
{
    public function index()
    {

        $usuario = Auth::user();
        if ($usuario->nivel_acesso == 'entidade'){
            $usuario = DB::table('usuarios')
                ->join('entidade_beneficentes', 'usuarios.id', '=', 'entidade_beneficentes.id_usuario')
                ->where('usuarios.id', $usuario->id)
                ->select('usuarios.*', 'entidade_beneficentes.*')
                ->first();

            return Inertia::render('EntidadeBeneficente/GerenciarConta', ['usuario' => $usuario]);
        }
        $usuario = DB::table('usuarios')
            ->join('doadores', 'usuarios.id', '=', 'doadores.id_usuario')
            ->where('usuarios.id', $usuario->id)
            ->select('usuarios.*', 'doadores.*')
            ->first();

        return Inertia::render('Doador/GerenciarConta', ['usuario' => $usuario]);;
    }

    public function update(Request $request)
    {
        $usuario = Auth::user();
        if ($usuario->nivel_acesso == 'entidade') {
            return $this->updateEntidadeBeneficente($request);
        }
        return $this->updateDoador($request);
    }

    private function updateEntidadeBeneficente($request)
    {
        $validatedData = $request->validate([
            'login' => 'required|string|max:255|unique:usuarios,login,' . Auth::id(),
            'email' => 'required|email|max:255|unique:usuarios,email,' . Auth::id(),
            'celular' => 'required|string|min:10|max:15',
            'senha' => 'nullable|string|min:6|confirmed',
            'cnpj' => 'required|string|unique:entidade_beneficentes,cnpj,' . Auth::id() . ',id_usuario',
            'razaoSocial' => 'required|string|max:255',
            'nomeFantasia' => 'required|string|max:255',
        ], [
            'senha.confirmed' => 'A confirmação de senha não coincide com a senha.',
            'senha_confirmation.required' => 'O campo confirmação de senha é obrigatório.',
        ]);


        $this->updateUsuario($validatedData);

        $usuario = Usuario::find(Auth::id());
        $usuario->entidadeBeneficente->update([
            'cnpj' => $validatedData['cnpj'],
            'razao_social' => $validatedData['razaoSocial'],
            'nome_fantasia' => $validatedData['nomeFantasia'],
        ]);

        return response()->json(['message' => 'Entidade atualizada com sucesso!']);
    }

    private function updateDoador($request)
    {
        $validatedData = $request->validate([
            'login' => 'required|string|max:255|unique:usuarios,login,' . Auth::id(),
            'email' => 'required|email|max:255|unique:usuarios,email,' . Auth::id(),
            'celular' => 'required|string|min:10|max:15',
            'senha' => 'nullable|string|min:6|confirmed',
            'cpf' => 'required|string|unique:doadores,cpf,' . Auth::id() . ',id_usuario',
        ], [
            'senha.confirmed' => 'A confirmação de senha não coincide com a senha.',
            'senha_confirmation.required' => 'O campo confirmação de senha é obrigatório.',
        ]);

        $this->updateUsuario($validatedData);

        $usuario = Usuario::find(Auth::id());
        $usuario->doador->update([
            'cpf' => $validatedData['cpf'],
        ]);

        return response()->json(['message' => 'Doador atualizado com sucesso!']);
    }

    private function updateUsuario($dados)
    {
        $dadosUsuario = [
            'login' => $dados['login'],
            'email' => $dados['email'],
            'celular' => $dados['celular'],
        ];

        if(!empty($dados['senha'])) {
            $dadosUsuario['senha'] = $dados['senha'];
        }

        $usuario = Usuario::find(Auth::id());
        $usuario->update($dadosUsuario);
    }
}
