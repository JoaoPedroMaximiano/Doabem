<?php

namespace App\Http\Controllers;

use App\Models\Doador;
use Illuminate\Http\Request;
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

    public function store(){}
}
