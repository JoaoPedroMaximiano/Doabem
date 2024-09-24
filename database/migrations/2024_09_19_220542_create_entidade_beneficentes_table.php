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
        Schema::create('entidade_beneficentes', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('id_usuario')->nullable()->constrained('usuarios');
            $table->string('cnpj')->nullable();
            $table->string('razao_social')->nullable();
            $table->string('nome_fantasia')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entidade_beneficentes');
    }
};
