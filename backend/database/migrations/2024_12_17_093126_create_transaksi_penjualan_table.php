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
        Schema::create('transaksi_penjualan', function (Blueprint $table) {
            $table->id('id_penjualan'); // Primary key
            $table->unsignedBigInteger('id_user'); // Foreign key ke tabel users
            $table->string('nama_pembeli');
            $table->decimal('total_harga', 15, 2); // Format harga (15 digit, 2 desimal)
            $table->date('tanggal_penjualan');
            $table->decimal('diskon', 8, 2)->default(0); // Diskon dengan nilai default 0
            $table->decimal('harga_setelah_diskon', 15, 2); // Harga setelah diskon
            $table->timestamps(); // Kolom created_at dan updated_at

            // Relasi ke tabel users
            $table->foreign('id_user')->references('id')->on(table: 'users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_penjualan');
    }
};
