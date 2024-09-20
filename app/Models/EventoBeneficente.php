<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventoBeneficente extends Model
{
    use HasFactory;

    protected $table = 'eventos_beneficentes';

    protected $fillable = [
        'identidade_beneficente',
        'id_local',
        'nome',
        'descricao',
        'data_inicio',
        'data_fim',
        'data_cadastro',
        'imagem',
        'status',
    ];

    public function entidadeBeneficente()
    {
        return $this->belongsTo(EntidadeBeneficente::class, 'identidade_beneficente');
    }

    public function local()
    {
        return $this->belongsTo(Local::class, 'id_local');
    }

    public function isAtivo()
    {
        return $this->status === 'ativo';
    }
}
