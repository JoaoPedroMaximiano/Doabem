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
        Schema::create('necessidades', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('identidade_beneficente')->constrained('entidade_beneficentes');
            $table->foreignId('id_local')->constrained('locais');
            $table->string('nome');
            $table->text('descricao');
            $table->dateTime('data_cadastro');
            $table->integer('qtd_necessaria')->nullable();
            $table->string('imagem')->nullable();
            $table->enum('status', ['ativo', 'inativo']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('necessidades');
    }
};
