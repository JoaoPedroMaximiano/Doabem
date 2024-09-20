<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DestinoFinal extends Model
{
    use HasFactory;

    protected $table = 'destinos_finais';

    protected $fillable = [
        'nome',
    ];

    public function getFormattedName()
    {
        return strtoupper($this->nome);
    }
}
