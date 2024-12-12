<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Barang;
use App\Models\BarangModel;
use App\Models\KategoriBarang;
use App\Models\KategoriBarangModel;

class BarangTableSeeder extends Seeder
{
    public function run()
    {
        // Menambahkan kategori barang
        $kategori_makanan_ringan = KategoriBarangModel::create([
            'nama_kategori' => 'Makanan & Minuman',
        ]);

        $kategori_minuman = KategoriBarangModel::create([
            'nama_kategori' => 'Makanan & Minuman',
        ]);

        // Menambahkan barang ke tabel barang
        BarangModel::create([
            'id_kategori' => $kategori_makanan_ringan->id_kategori,
            'nama_barang' => 'Beng Beng',
            'gambar_barang' => 'bengbeng.jpg',
            'jumlah_stok' => 100,
            'satuan' => 'Pcs',
            'harga_jual_persatuan' => 5000.00,
        ]);

        BarangModel::create([
            'id_kategori' => $kategori_makanan_ringan->id_kategori,
            'nama_barang' => 'Chitato',
            'gambar_barang' => 'chitato.jpg',
            'jumlah_stok' => 150,
            'satuan' => 'Pcs',
            'harga_jual_persatuan' => 8000.00,
        ]);

        BarangModel::create([
            'id_kategori' => $kategori_minuman->id_kategori,
            'nama_barang' => 'Teh Botol Sosro',
            'gambar_barang' => 'tehbotol.jpg',
            'jumlah_stok' => 200,
            'satuan' => 'Botol',
            'harga_jual_persatuan' => 7000.00,
        ]);

        BarangModel::create([
            'id_kategori' => $kategori_minuman->id_kategori,
            'nama_barang' => 'Aqua',
            'gambar_barang' => 'aqua.jpg',
            'jumlah_stok' => 300,
            'satuan' => 'Botol',
            'harga_jual_persatuan' => 4000.00,
        ]);
    }
}
