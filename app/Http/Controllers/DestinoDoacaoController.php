<?php

namespace App\Http\Controllers;

use App\Models\DestinoDoacao;
use Illuminate\Http\Request;

class DestinoDoacaoController extends Controller
{
    public function index(Request $request)
    {
        $destinoDoacao = DestinoDoacao::create([
            'id_doacao' => 1,
            'status' => 'Recebida',
            'data_atualizacao' => now(),
        ]);

        $destinosDoacoes = DestinoDoacao::with('doacao')->get();

        dd($destinosDoacoes);
    }
}
