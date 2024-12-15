<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DetailTransaksiBarang;
use App\Models\DetailTransaksiModel;

class DetailTransaksiBarangTableSeeder extends Seeder
{
    /**
     * Jalankan seeder.
     *
     * @return void
     */
    public function run()
    {
        // Data pertama
        DetailTransaksiModel::create([
            'id_transaksi' => 3,
            'id_barang' => 3,
            'id_rak' => 6,
            'id_rak_tujuan' => 7,
            'jumlah_barang' => 100,
            'satuan' => 'pcs',
            'harga_beli_satuan' => 15000.00,
            'tanggal_kadaluwarsa' => '2025-12-31',
            'status' => 'dipindahkan',
        ]);

        // Data kedua
        DetailTransaksiModel::create([
            'id_transaksi' => 4,
            'id_barang' => 4,
            'id_rak' => 6,
            'id_rak_tujuan' => null,
            'jumlah_barang' => 50,
            'satuan' => 'kg',
            'harga_beli_satuan' => 20000.00,
            'tanggal_kadaluwarsa' => '2024-06-30',
            'status' => 'disimpan',
        ]);

        // Data ketiga
        DetailTransaksiModel::create([
            'id_transaksi' => 3,
            'id_barang' => 5,
            'id_rak' => 7,
            'id_rak_tujuan' => 13,
            'jumlah_barang' => 200,
            'satuan' => 'liter',
            'harga_beli_satuan' => 10000.50,
            'tanggal_kadaluwarsa' => '2024-06-30',
            'status' => 'dipindahkan',
        ]);

        // Data keempat
        DetailTransaksiModel::create([
            'id_transaksi' => 4,
            'id_barang' => 4,
            'id_rak' => 6,
            'id_rak_tujuan' => 13,
            'jumlah_barang' => 75,
            'satuan' => 'unit',
            'harga_beli_satuan' => 50000.75,
            'tanggal_kadaluwarsa' => '2026-01-15',
            'status' => 'dipindahkan',
        ]);

        // Data kelima
        DetailTransaksiModel::create([
            'id_transaksi' => 3,
            'id_barang' => 5,
            'id_rak' => 6,
            'id_rak_tujuan' => null,
            'jumlah_barang' => 300,
            'satuan' => 'box',
            'harga_beli_satuan' => 25000.00,
            'tanggal_kadaluwarsa' => '2024-12-31',
            'status' => 'disimpan',
        ]);
    }
}
