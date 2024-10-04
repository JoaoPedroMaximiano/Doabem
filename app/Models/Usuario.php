<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\user as Authenticatable;

class Usuario extends Authenticatable
{
    use HasFactory;

    protected $table = 'usuarios';
    public $timestamps = false;

    protected $fillable = [
        'login',
        'senha',
        'email',
        'celular',
        'nivel_acesso',
        'status',
    ];

    public function setSenhaAttribute($value)
    {
        $this->attributes['senha'] = bcrypt($value);
    }

    public function isAtivo()
    {
        return $this->status === 'ativo';
    }

    public function entidadeBeneficente()
    {
        return $this->hasOne(EntidadeBeneficente::class, 'id_usuario');
    }

    public function doador()
    {
        return $this->hasOne(Doador::class, 'id_usuario');
    }
}
