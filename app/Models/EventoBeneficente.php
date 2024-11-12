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
        $query = self::where('eventos_beneficentes.status', 'ativo')
            ->whereDate('data_inicio', '<=', now())
            ->whereDate('data_fim', '>=', now())
            ->where('locais.status', 'ativo')
            ->join('locais', 'locais.id', '=', 'eventos_beneficentes.id_local');
            if ($idEntidade) {
                $query->where('eventos_beneficentes.id_entidade_beneficente', $idEntidade);
            }
        return $query->get(['eventos_beneficentes.id', 'eventos_beneficentes.nome', 'eventos_beneficentes.imagem', 'locais.latitude', 'locais.longitude'])->toArray();
    }

    public static function getEventosBeneficentesForListagemEntidade()
    {
        return self::where('eventos_beneficentes.status', 'ativo')
            ->whereDate('data_inicio', '<=', now())
            ->whereDate('data_fim', '>=', now())
            ->where('locais.status', 'ativo')
            ->where('eventos_beneficentes.id_entidade_beneficente', Auth::id())
            ->join('locais', 'locais.id', '=', 'eventos_beneficentes.id_local')
            ->get(['eventos_beneficentes.id', 'eventos_beneficentes.nome', 'eventos_beneficentes.imagem', 'locais.latitude', 'locais.longitude'])->toArray();
    }

    public static function getEventosBeneficentesForCadastroDoacao()
    {
        $array = self::where('eventos_beneficentes.status', 'ativo')
            ->whereDate('data_inicio', '<=', now())
            ->whereDate('data_fim', '>=', now())
            ->get(['eventos_beneficentes.id', 'eventos_beneficentes.nome'])->toArray();

        $res = [];
        foreach ($array as $item) {
            $res[] = ['value' => $item['id'], 'label' => $item['nome']];
        }
        return $res;
    }
}
