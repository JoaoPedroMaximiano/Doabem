<?php

namespace App\Models;

use Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalDoacao extends Model
{
    use HasFactory;

    protected $table = 'locais_doacoes';
    public $timestamps = false;

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

    public static function getLocalDoacaoForListagem($idEntidade)
    {
        $query = self::where('locais_doacoes.status', 'ativo')
            ->where('locais.status', 'ativo')
            ->join('locais', 'locais.id', '=', 'locais_doacoes.id_local');
            if ($idEntidade) {
                $query->where('locais_doacoes.id_entidade_beneficente', $idEntidade);
            }            
            return $query->get(['locais_doacoes.id', 'locais_doacoes.nome', 'locais_doacoes.imagem', 'locais.latitude', 'locais.longitude'])->toArray();
    }

    public static function getLocalDoacaoForCadastroDoacao()
    {
        $array = self::where('locais_doacoes.status', 'ativo')
            ->where('locais.status', 'ativo')
            ->join('locais', 'locais.id', '=', 'locais_doacoes.id_local')
            ->get(['locais_doacoes.id', 'locais_doacoes.nome'])->toArray();

        $res = [];
        foreach ($array as $item) {
            $res[] = ['value' => $item['id'], 'label' => $item['nome']];
        }
        return $res;
    }
}
