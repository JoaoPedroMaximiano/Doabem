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

    public static function findOrCreateLocal($dados)
    {
        $local = self::where('cep', $dados['cep'])->first();
        
        if (empty($local)) {
            $cidade = Cidade::where('nome', $dados['cidade'])->first();
            
            if (empty($cidade)) {
                $uf = Uf::where('sigla', $dados['uf'])->first();
                
                if (empty($uf)) {
                    $uf = Uf::create([
                        'nome' => $dados['estado'],
                        'sigla' => $dados['uf'],
                        'status' => 'ativo',
                    ]);
                }

                $cidade = Cidade::create([
                    'id_uf' => $uf->id,
                    'nome' => $dados['cidade'],
                    'status' => 'ativo',
                ]);
            }

            $local = self::create([
                'cep' => $dados['cep'],
                'id_cidade' => $cidade->id,
                'latitude' => $dados['latitude'],
                'longitude' => $dados['longitude'],
                'status' => 'ativo',
            ]);
        }

        return $local;        
    }
}
