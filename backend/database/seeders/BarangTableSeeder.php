<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\BarangModel;
use Illuminate\Support\Facades\DB;

class BarangTableSeeder extends Seeder
{
    public function run()
    {
        // Data barang contoh
        BarangModel::create([
            'id_kategori' => 1, // Pastikan id_kategori sesuai dengan kategori yang ada
            'nama_barang' => 'Sabun Mandi',
            'alamat_gambar' => 'images/sabun_mandi.jpg', // Gambar disesuaikan dengan folder penyimpanan
            'jumlah_stok' => 100,
            'satuan' => 'batang',
            'harga_jual_persatuan' => 25000.00,
        ]);

        BarangModel::create([
            'id_kategori' => 2, // Misal kategori lain
            'nama_barang' => 'Shampo',
            'alamat_gambar' => 'images/shampo.jpg',
            'jumlah_stok' => 50,
            'satuan' => 'botol',
            'harga_jual_persatuan' => 30000.00,
        ]);

        BarangModel::create([
            'id_kategori' => 3, // Misal kategori lain
            'nama_barang' => 'Pasta Gigi',
            'alamat_gambar' => 'images/pasta_gigi.jpg',
            'jumlah_stok' => 75,
            'satuan' => 'tube',
            'harga_jual_persatuan' => 15000.00,
        ]);

        // Anda bisa menambahkan lebih banyak data sesuai kebutuhan
    }
}
