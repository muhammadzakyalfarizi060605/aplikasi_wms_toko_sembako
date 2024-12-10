<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rak;
use App\Models\RakModel;

class RakTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RakModel::create([
            'kode_rak' => 'KR-001',
            'nama_rak' => 'Rak 1',
            'lokasi_rak' => 'Lokasi 1',
        ]);

        RakModel::create([
            'kode_rak' => 'KR-002',
            'nama_rak' => 'Rak 2',
            'lokasi_rak' => 'Lokasi 2',
        ]);

        RakModel::create([
            'kode_rak' => 'KR-003',
            'nama_rak' => 'Rak 3',
            'lokasi_rak' => 'Lokasi 3',
        ]);

        RakModel::create([
            'kode_rak' => 'KR-004',
            'nama_rak' => 'Rak 4',
            'lokasi_rak' => 'Lokasi 4',
        ]);

        RakModel::create([
            'kode_rak' => 'KR-005',
            'nama_rak' => 'Rak 5',
            'lokasi_rak' => 'Lokasi 5',
        ]);
    }
}
