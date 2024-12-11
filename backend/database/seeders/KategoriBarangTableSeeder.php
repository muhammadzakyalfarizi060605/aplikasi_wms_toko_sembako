<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\KategoriBarangModel; // Import model KategoriBarang

class KategoriBarangTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        KategoriBarangModel::create([
            'nama_kategori' => 'Elektronik',
            'deskripsi' => 'Barang elektronik seperti TV, kulkas, dan lainnya.',
        ]);

        KategoriBarangModel::create([
            'nama_kategori' => 'Perabotan Rumah Tangga',
            'deskripsi' => 'Barang untuk kebutuhan rumah tangga seperti kursi, meja, dan lainnya.',
        ]);

        KategoriBarangModel::create([
            'nama_kategori' => 'Makanan & Minuman',
            'deskripsi' => 'Produk makanan dan minuman kemasan.',
        ]);
    }
}
