<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalDoacao extends Model
{
    use HasFactory;

    protected $table = 'locais_doacoes';

    protected $fillable = [
        'id_entidade_beneficente',
        'id_local',
        'nome',
        'descricao',
        'data_cadastro',
        'imagem',
        'status',
    ];

    public function entidadeBeneficente()
    {
        return $this->belongsTo(EntidadeBeneficente::class, 'id_entidade_beneficente');
    }

    public function local()
    {
        return $this->belongsTo(Local::class, 'id_local');
    }

    public function isAtivo()
    {
        return $this->status === 'ativo';
    }

    public static function getLocalDoacaoForListagem()
    {
        return self::where('status', 'ativo')->get()->toArray();
    }
}
