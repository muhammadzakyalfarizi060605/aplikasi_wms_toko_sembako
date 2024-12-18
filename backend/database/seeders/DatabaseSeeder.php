<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserTableSeeder::class);
        $this->call(SupplierTableSeeder::class);
        $this->call(RakTableSeeder::class);
        $this->call(KategoriBarangTableSeeder::class);
        $this->call(TransaksiPenjualanTableSeeder::class);
        $this->call(TransaksiBarangTableSeeder::class);
        $this->call(DetailTransaksiBarangTableSeeder::class);
    }
}
