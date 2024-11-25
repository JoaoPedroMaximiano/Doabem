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
        'id_entidade_beneficente',
    ];

    public function entidadeBeneficente()
    {
        return $this->belongsTo(EntidadeBeneficente::class, 'identidade_beneficente');
    }

    public function getFormattedName()
    {
        return strtoupper($this->nome);
    }
}
