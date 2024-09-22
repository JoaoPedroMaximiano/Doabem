<?php

namespace App\Http\Controllers;

use App\Models\EventoBeneficente;
use Illuminate\Http\Request;

class EventoBeneficenteController extends Controller
{
    public function index(Request $request)
    {
        $evento = EventoBeneficente::create([
            'identidade_beneficente' => 1,
            'id_local' => 1,
            'nome' => 'Evento Beneficente Exemplo',
            'descricao' => 'Este é um evento beneficente para uma boa causa.',
            'data_inicio' => '2024-09-25 10:00:00',
            'data_fim' => '2024-09-25 18:00:00',
            'data_cadastro' => now(),
            'imagem' => 'imagem_evento.jpg',
            'status' => 'ativo',
        ]);

        if ($evento->isAtivo());

        $eventos = EventoBeneficente::all();
        dd($eventos);
    }
}
