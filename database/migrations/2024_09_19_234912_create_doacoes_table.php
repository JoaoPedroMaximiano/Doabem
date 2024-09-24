<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doacoes', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('id_doador')->constrained('doadores');
            $table->foreignId('id_entidade_beneficente')->constrained('entidade_beneficentes');
            $table->foreignId('id_destino_final')->nullable()->constrained('destinos_finais');
            $table->foreignId('id_necessidade')->nullable()->constrained('necessidades'); 
            $table->foreignId('id_evento_beneficente')->nullable()->constrained('eventos_beneficentes');
            $table->foreignId('id_local_doacao')->nullable()->constrained('locais_doacoes');
            $table->string('descricao');
            $table->integer('qtd');
            $table->dateTime('data_recebimento')->default(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doacoes');
    }
};
