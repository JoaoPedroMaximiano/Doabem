<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cidade extends Model
{
    use HasFactory;

    protected $table = 'cidades';
    public $timestamps = false;

    protected $fillable = [
        'id_uf',
        'nome',
        'status',
    ];

    public function uf()
    {
        return $this->belongsTo(Uf::class, 'id_uf');
    }

    public function isAtiva()
    {
        return $this->status === 'ativo';
    }
}
