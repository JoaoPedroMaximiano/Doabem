<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Doador;
use App\Models\Doacao;

class MonitorarDoacoesController extends Controller
{
    public function index()
    {
        return Inertia::render('MonitorarDoacoes/MonitorarDoacoes');
    }

    public function getListaDoacoes(Request $request)
    {
        $request->validate(['cpf' => 'required|string']);

        $doador = Doador::where('cpf', $request->cpf)->first();
        if (!$doador) {
            return response()->json(['errors' => 'Doador não encontrado com o CPF informado.'], 422);
        }

        $doacoes = Doacao::getDoacoesDestinosByIdDoador($doador->id);
        return response()->json(["doacoes" => $doacoes], 200);
    }
}
