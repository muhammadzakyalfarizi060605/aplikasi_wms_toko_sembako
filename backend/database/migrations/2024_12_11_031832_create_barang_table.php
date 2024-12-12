<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_barangs_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBarangTable extends Migration
{
    public function up()
    {
        Schema::create('barang', function (Blueprint $table) {
            $table->id('id_barang'); // Menggunakan bigIncrements untuk auto-increment id_barang
            $table->bigInteger('id_kategori')->unsigned(); // Kolom id_kategori, big integer
            $table->string('nama_barang');
            $table->string('gambar_barang');
            $table->integer('jumlah_stok');
            $table->string('satuan');
            $table->decimal('harga_jual_persatuan', 10, 2); // Sesuaikan tipe data harga
            $table->timestamps();

            // Membuat foreign key yang menghubungkan id_kategori di tabel barang dengan id_kategori di tabel kategori_barang
            $table->foreign('id_kategori')->references('id_kategori')->on('kategori_barang')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('barang');
    }
}
