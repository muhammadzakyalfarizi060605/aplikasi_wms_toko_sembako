<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('detail_transaksi_penjualan', function (Blueprint $table) {
            $table->id('id_detail_penjualan'); // Primary key
            $table->unsignedBigInteger('id_penjualan'); // Foreign key to transaksi_penjualan
            $table->unsignedBigInteger('id_barang'); // Foreign key to barang
            $table->decimal('harga_jual_persatuan', 10, 2); // Price per unit
            $table->integer('jumlah_barang'); // Quantity of items
            $table->decimal('subtotal', 10, 2); // Subtotal (calculated: harga_jual_persatuan * jumlah_barang)
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('id_penjualan')
                ->references('id_penjualan')
                ->on('transaksi_penjualan')
                ->onDelete('cascade');

            $table->foreign('id_barang')
                ->references('id_barang')
                ->on('barang')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_transaksi_penjualan');
    }
};
