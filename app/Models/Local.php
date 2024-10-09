<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Local extends Model
{
    use HasFactory;

    protected $table = 'locais';
    public $timestamps = false;

    protected $fillable = [
        'id_cidade',
        'latitude',
        'longitude',
        'cep',
        'status',
    ];

    public function cidade()
    {
        return $this->belongsTo(Cidade::class, 'id_cidade');
    }

    public function isAtivo()
    {
        return $this->status === 'ativo';
    }
}
