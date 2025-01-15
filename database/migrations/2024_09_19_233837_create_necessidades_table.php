<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
            $table->foreignId('id_entidade_beneficente')->constrained('entidade_beneficentes');
            $table->foreignId('id_local')->constrained('locais');
            $table->string('nome');
            $table->text('descricao');
            $table->dateTime('data_cadastro')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->integer('qtd_necessaria')->nullable();
            $table->string('imagem')->nullable();
            $table->enum('status', ['ativo', 'inativo']);
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
