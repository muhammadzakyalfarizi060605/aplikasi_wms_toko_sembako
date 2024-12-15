<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailTransaksiBarangTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_transaksi_barang', function (Blueprint $table) {
            $table->id('id_detail'); // Primary key

            // Foreign key to transaksi_barang table
            $table->unsignedBigInteger('id_transaksi');
            $table->foreign('id_transaksi')->references('id_transaksi')->on('transaksi_barang')->onDelete('cascade');

            // Foreign key to barang table
            $table->unsignedBigInteger('id_barang');
            $table->foreign('id_barang')->references('id_barang')->on('barang')->onDelete('cascade');

            // Foreign key to rak table
            $table->unsignedBigInteger('id_rak');
            $table->foreign('id_rak')->references('id_rak')->on('rak');

            // Foreign key to rak tujuan table
            $table->unsignedBigInteger('id_rak_tujuan')->nullable();
            $table->foreign('id_rak_tujuan')->references('id_rak')->on('rak')->onDelete('set null');

            $table->integer('jumlah_barang'); // Quantity of items
            $table->string('satuan'); // Unit of items
            $table->decimal('harga_beli_satuan', 10, 2); // Purchase price per unit
            $table->date('tanggal_kadaluwarsa');

            // Enum for status
            $table->enum('status', ['disimpan', 'dipindahkan'])->default('disimpan');

            $table->timestamps(); // Created at and updated at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_transaksi_barang');
    }
}
