<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Necessidade extends Model
{
    use HasFactory;
    protected $table = 'necessidades';
    
    protected $fillable = [
        'identidade_beneficente',
        'id_local',
        'nome',
        'descricao',
        'data_cadastro',
        'qtd_necessaria',
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

    public function isAtiva()
    {
        return $this->status === 'ativo';
    }
}
