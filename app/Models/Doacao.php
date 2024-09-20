<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doacao extends Model
{
    use HasFactory;
    protected $table = 'doacoes';
    protected $fillable = [
        'id_doador',
        'identidade_beneficente',
        'id_destino_final',
        'id_necessidade',
        'id_evento_beneficente',
        'id_local_doacao',
        'descricao',
        'qtd',
        'data_recebimento',
    ]; 
    
    public function doador()
    {
        return $this->belongsTo(Doador::class, 'id_doador');
    }

    public function entidadeBeneficente()
    {
        return $this->belongsTo(EntidadeBeneficente::class, 'identidade_beneficente');
    }

    public function destinoFinal()
    {
        return $this->belongsTo(DestinoFinal::class, 'id_destino_final');
    }

    public function necessidade()
    {
        return $this->belongsTo(Necessidade::class, 'id_necessidade');
    }

    public function eventoBeneficente()
    {
        return $this->belongsTo(EventoBeneficente::class, 'id_evento_beneficente');
    }

    public function localDoacao()
    {
        return $this->belongsTo(LocalDoacao::class, 'id_local_doacao');
    }

    public function getFormattedDataRecebimentoAttribute()
    {
        return $this->data_recebimento->format('d/m/Y H:i');
    }   
}
