<?php

namespace Database\Seeders;

use App\Models\TransaksiPenjualanModel;
use App\Models\UserModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransaksiPenjualanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mendapatkan id_user yang memiliki role 'kasir'
        $kasirUsers = UserModel::where('role', 'kasir')->get();

        // Membuat data transaksi penjualan untuk setiap kasir
        foreach ($kasirUsers as $kasir) {
            TransaksiPenjualanModel::create([
                'id_user' => $kasir->id,
                'nama_pembeli' => 'Customer ' . $kasir->id,
                'total_harga' => 0,
                'tanggal_penjualan' => now(),
                'diskon' => 0,
                'harga_setelah_diskon' => 0,
            ]);
        }
    }
}
