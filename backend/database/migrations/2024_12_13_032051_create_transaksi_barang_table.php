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
        Schema::create('transaksi_barang', function (Blueprint $table) {
            $table->id('id_transaksi'); // Primary Key
            $table->unsignedBigInteger('id_user'); // Foreign Key ke tabel users
            $table->unsignedBigInteger('id_supplier'); // Foreign Key ke tabel suppliers
            $table->date('tanggal_transaksi'); // Kolom tanggal transaksi
            $table->timestamps(); // Tambahkan timestamps jika diperlukan

            // Definisi relasi foreign key
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_supplier')->references('id_supplier')->on('suppliers')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_barang');
    }
};
