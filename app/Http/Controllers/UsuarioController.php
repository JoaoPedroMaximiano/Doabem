<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $usuario = Usuario::create([
            'login' => 'admin',
            'senha' => '1234',
            'email' => 'admin@doacao.com',
            'celular' => '11987654321',
            'status' => 'ativo',
        ]);

        if ($usuario->isAtivo());

        $usuarios = Usuario::all();
        dd($usuario);
    }

    public function loginPage(){
        return Inertia::render('Autenticacao/Login');
    }

}
