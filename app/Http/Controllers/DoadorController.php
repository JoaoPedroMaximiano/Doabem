<?php

namespace App\Http\Controllers;

use App\Models\Doador;
use Illuminate\Http\Request;

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
}
