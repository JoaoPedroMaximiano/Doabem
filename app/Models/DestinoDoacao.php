<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DestinoDoacao extends Model
{
    use HasFactory;

    protected $table = 'destinos_doacoes'; 

    protected $fillable = [
        'id_doacao',
        'status',
        'data_atualizacao',
    ];

    public function doacao()
    {
        return $this->belongsTo(Doacao::class, 'id_doacao');
    }

    public function isRecebida()
    {
        return $this->status === 'Recebida';
    }
}
