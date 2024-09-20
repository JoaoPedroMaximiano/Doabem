<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ListagemController extends Controller
{
    public function index()
    {
        $listagem = [
            'Necessidades' => [
                ['id' => 1, 'nome' => 'Agasalhos', 'imagem' => ''],
                ['id' => 2, 'nome' => 'Cestas básicas', 'imagem' => ''],
            ],
            'Eventos' => [],
            'Locais' => [],
        ];

        return Inertia::render('Listagem/Listagem', [
            'listagem' => $listagem,
        ]);
    }
}
