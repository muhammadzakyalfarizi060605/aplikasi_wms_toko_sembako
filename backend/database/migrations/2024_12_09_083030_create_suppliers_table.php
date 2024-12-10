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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id('id_supplier'); // Kolom ID dengan nama id_supplier
            $table->string('nama_supplier'); // Kolom nama_supplier
            $table->string('email')->unique(); // Kolom email yang unik
            $table->string('no_telp'); // Kolom no_telp
            $table->text('alamat'); // Kolom alamat
            $table->timestamps(); // Kolom created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
