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
        Schema::table('destinos_finais', function (Blueprint $table) {
            $table->foreignId('id_entidade_beneficente')
                ->constrained('entidade_beneficentes')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('destinos_finais', function (Blueprint $table) {
            $table->dropForeign(['id_entidade_beneficente']);
            $table->dropColumn('id_entidade_beneficente');
        });
    }
};
