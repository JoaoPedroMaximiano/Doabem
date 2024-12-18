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

    public static function getNecessidadesForListagem($idEntidade)
    {
        $query = self::where('qtd_necessaria', '>', function ($query) {
                $query->selectRaw('COUNT(doacoes.id)')
                    ->from('doacoes')
                    ->where('doacoes.id_necessidade', 'necessidades.id');
            })
            ->join('locais', 'locais.id', '=', 'necessidades.id_local');
        if ($idEntidade) {
            $query->where('necessidades.id_entidade_beneficente', $idEntidade);
        } else {
            $query->where('necessidades.status', 'ativo');
        }
        return $query->get(['necessidades.id', 'necessidades.nome', 'necessidades.status', 'necessidades.imagem', 'locais.latitude', 'locais.longitude'])->toArray();
    }

    public static function getNecessidadesForCadastroDoacao($idEntidade)
    {
        $array = self::where('necessidades.status', 'ativo')
            ->where('qtd_necessaria', '>', function ($query) {
                $query->selectRaw('COUNT(doacoes.id)')
                    ->from('doacoes')
                    ->where('doacoes.id_necessidade', 'necessidades.id');
            })
            ->where('necessidades.id_entidade_beneficente', $idEntidade)
            ->where('necessidades.status', 'ativo')
            ->get(['necessidades.id', 'necessidades.nome'])->toArray();

        $res = [];
        foreach ($array as $item) {
            $res[] = ['value' => $item['id'], 'label' => $item['nome']];
        }
        return $res;
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
