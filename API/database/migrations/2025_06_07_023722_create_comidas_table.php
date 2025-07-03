<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comidas', function (Blueprint $table) {
            $table->id();
            $table->string('marca', 50);
            $table->decimal('preco', 4,2);
            $table->string('validade');
            $table->string('tipo', 50);
            $table->string('sabor', 50);
            $table->string('dt_entrada');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comidas');
    }
};
