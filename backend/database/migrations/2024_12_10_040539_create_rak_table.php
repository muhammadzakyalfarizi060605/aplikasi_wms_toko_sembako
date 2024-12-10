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
        Schema::create('rak', function (Blueprint $table) {
            $table->id('id_rak'); // Kolom id_rak sebagai primary key
            $table->string('kode_rak')->unique(); // Kolom kode_rak dengan tipe string dan unik
            $table->string('nama_rak'); // Kolom nama_rak
            $table->string('lokasi_rak'); // Kolom lokasi_rak
            $table->timestamps(); // Kolom created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rak');
    }
};
