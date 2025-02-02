<?php

namespace App\Models;

use Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventoBeneficente extends Model
{
    use HasFactory;

    protected $table = 'eventos_beneficentes';
    public $timestamps = false;

    protected $fillable = [
        'id_entidade_beneficente',
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

    public static function getEventosBeneficentesForListagem($idEntidade)
    {
        $query = self::where('locais.status', 'ativo')
            ->join('locais', 'locais.id', '=', 'eventos_beneficentes.id_local');
            if ($idEntidade) {
                $query->where('eventos_beneficentes.id_entidade_beneficente', $idEntidade);
            } else {
                $query->where('eventos_beneficentes.status', 'ativo')
                    ->whereDate('data_inicio', '<=', now())
                    ->whereDate('data_fim', '>=', now());
            }
        return $query->get(['eventos_beneficentes.id', 'eventos_beneficentes.nome', 'eventos_beneficentes.status', 'eventos_beneficentes.descricao', 'eventos_beneficentes.data_inicio', 'eventos_beneficentes.data_fim', 'eventos_beneficentes.imagem', 'locais.latitude', 'locais.longitude'])->toArray();
    }
    public static function getEventosBeneficentesForCadastroDoacao($idEntidade)
    {
        $array = self::where('eventos_beneficentes.status', 'ativo')
            ->whereDate('data_inicio', '<=', now())
            ->whereDate('data_fim', '>=', now())
            ->where('eventos_beneficentes.id_entidade_beneficente', $idEntidade)
            ->get(['eventos_beneficentes.id', 'eventos_beneficentes.nome'])->toArray();

        $res = [];
        foreach ($array as $item) {
            $res[] = ['value' => $item['id'], 'label' => $item['nome']];
        }
        return $res;
    }
}
