<?php

namespace Database\Seeders;

use App\Models\DetailTransaksiPenjualanModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetailTransaksiPenjualanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DetailTransaksiPenjualanModel::create([
            'id_penjualan' => 5, // Adjust this ID based on your database data
            'id_barang' => 5, // Adjust this ID based on your database data
            'harga_jual_persatuan' => 0,
            'jumlah_barang' => 0,
            'subtotal' => 0, // Calculated as 15000 * 3
        ]);

        DetailTransaksiPenjualanModel::create([
            'id_penjualan' => 4,
            'id_barang' => 4,
            'harga_jual_persatuan' => 0,
            'jumlah_barang' => 0,
            'subtotal' => 0, // Calculated as 20000 * 2
        ]);

        DetailTransaksiPenjualanModel::create([
            'id_penjualan' => 3,
            'id_barang' => 3,
            'harga_jual_persatuan' => 0,
            'jumlah_barang' => 0,
            'subtotal' => 0, // Calculated as 10000 * 5
        ]);
    }
}
