<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TransaksiBarang;
use App\Models\TransaksiBarangModel;
use Carbon\Carbon;

class TransaksiBarangTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Contoh data dummy
        $data = [
            [
                'id_user' => 1, // Sesuaikan dengan ID user yang ada
                'id_supplier' => 18, // Sesuaikan dengan ID supplier yang ada
                'tanggal_transaksi' => Carbon::now()->subDays(5)->toDateString(),
            ],
            [
                'id_user' => 2, // Sesuaikan dengan ID user yang ada
                'id_supplier' => 19, // Sesuaikan dengan ID supplier yang ada
                'tanggal_transaksi' => Carbon::now()->subDays(3)->toDateString(),
            ],
            [
                'id_user' => 3, // Sesuaikan dengan ID user yang ada
                'id_supplier' => 18, // Sesuaikan dengan ID supplier yang ada
                'tanggal_transaksi' => Carbon::now()->subDays(1)->toDateString(),
            ],
        ];

        // Masukkan data ke dalam tabel transaksi_barang
        foreach ($data as $item) {
            TransaksiBarangModel::create($item);
        }
    }
}
