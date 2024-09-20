<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Uf extends Model
{
    use HasFactory;

    protected $table = 'ufs'; 

    protected $fillable = [
        'nome',
        'sigla',
        'status',
    ];

    public function isAtiva()
    {
        return $this->status === 'ativo';
    }
}
