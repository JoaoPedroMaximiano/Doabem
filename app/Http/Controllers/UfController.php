<?php

namespace App\Http\Controllers;

use App\Models\Uf;
use Illuminate\Http\Request;

class UfController extends Controller
{
    public function index(request $request){
        $uf = Uf::create([
            'nome' => 'São Paulo',
            'sigla' => 'SP',
            'status' => 'ativo',
        ]);
        
        if ($uf->isAtiva())
        
        $ufs = Uf::all();
        dd($ufs);
    }
}
