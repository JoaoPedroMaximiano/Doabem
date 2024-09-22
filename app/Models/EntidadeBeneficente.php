<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntidadeBeneficente extends Model
{
    use HasFactory;

    protected $table = 'entidade_beneficentes';

    protected $fillable = [
        'id_usuario',
        'cnpj',
        'razao_social',
        'nome_fantasia',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    public function hasCnpj()
    {
        return !empty($this->cnpj);
    }
}
