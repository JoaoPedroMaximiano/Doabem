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
        Schema::create('destinos_doacoes', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('id_doacao')->constrained('doacoes');
            $table->enum('status', ['Recebida', 'Em preparação', 'Em trânsito', 'Entregue', 'Cancelada']);
            $table->dateTime('data_atualizacao');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('destinos_doacoes');
    }
};
