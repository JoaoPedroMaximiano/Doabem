<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Necessidade extends Model
{
    use HasFactory;
    protected $table = 'necessidades';
    public $timestamps = false;

    protected $fillable = [
        'id_entidade_beneficente',
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
        return $this->belongsTo(EntidadeBeneficente::class, 'id_entidade_beneficente');
    }

    public function local()
    {
        return $this->belongsTo(Local::class, 'id_local');
    }

    public function isAtiva()
    {
        return $this->status === 'ativo';
    }

    public static function getNecessidadesForListagem()
    {
        return self::where('status', 'ativo')
            ->where('qtd_necessaria', '>', function ($query) {
                $query->selectRaw('COUNT(doacoes.id)')
                    ->from('doacoes')
                    ->where('doacoes.id_necessidade', 'necessidades.id');
            })
            ->get()
            ->toArray();
    }

    public function doacoes()
    {
        return $this->hasMany(Doacao::class, 'id_necessidade');
    }   
    
    public static function getQtdDoacoesPorNecessidade($idNecessidade)
    {
        return Doacao::where('id_necessidade', $idNecessidade)->sum('qtd');
    }
}
