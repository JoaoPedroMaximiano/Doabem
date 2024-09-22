<?php

namespace App\Http\Controllers;

use App\Models\Local;
use Illuminate\Http\Request;

class LocalController extends Controller
{
    public function index(Request $request)
    {
        $local = Local::create([
            'id_cidade' => 1,
            'latitude' => '-23.5505',
            'longitude' => '-46.6333',
            'cep' => '01000-000',
            'status' => 'ativo',
        ]);

        if ($local->isAtivo());

        $locais = Local::all();
        dd($locais);

    }
}
