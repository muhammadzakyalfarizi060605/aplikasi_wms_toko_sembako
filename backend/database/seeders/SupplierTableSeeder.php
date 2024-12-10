<?php

namespace Database\Seeders;

use App\Models\SupplierModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SupplierModel::create([
            'nama_supplier' => 'Supplier 2',
            'email' => 'supplier2@example.com',
            'no_telp' => '081234567891',
            'alamat' => 'Jl. Contoh Alamat 2',
        ]);

        SupplierModel::create([
            'nama_supplier' => 'Supplier 3',
            'email' => 'supplier3@example.com',
            'no_telp' => '081234567892',
            'alamat' => 'Jl. Contoh Alamat 3',
        ]);

        SupplierModel::create([
            'nama_supplier' => 'Supplier 4',
            'email' => 'supplier4@example.com',
            'no_telp' => '081234567893',
            'alamat' => 'Jl. Contoh Alamat 4',
        ]);

        SupplierModel::create([
            'nama_supplier' => 'Supplier 5',
            'email' => 'supplier5@example.com',
            'no_telp' => '081234567894',
            'alamat' => 'Jl. Contoh Alamat 5',
        ]);

        SupplierModel::create([
            'nama_supplier' => 'Supplier 6',
            'email' => 'supplier6@example.com',
            'no_telp' => '081234567895',
            'alamat' => 'Jl. Contoh Alamat 6',
        ]);

        SupplierModel::create([
            'nama_supplier' => 'Supplier 7',
            'email' => 'supplier7@example.com',
            'no_telp' => '081234567896',
            'alamat' => 'Jl. Contoh Alamat 7',
        ]);

        SupplierModel::create([
            'nama_supplier' => 'Supplier 8',
            'email' => 'supplier8@example.com',
            'no_telp' => '081234567897',
            'alamat' => 'Jl. Contoh Alamat 8',
        ]);

        SupplierModel::create([
            'nama_supplier' => 'Supplier 9',
            'email' => 'supplier9@example.com',
            'no_telp' => '081234567898',
            'alamat' => 'Jl. Contoh Alamat 9',
        ]);

        SupplierModel::create([
            'nama_supplier' => 'Supplier 10',
            'email' => 'supplier10@example.com',
            'no_telp' => '081234567899',
            'alamat' => 'Jl. Contoh Alamat 10',
        ]);

        SupplierModel::create([
            'nama_supplier' => 'Supplier 11',
            'email' => 'supplier11@example.com',
            'no_telp' => '081234567900',
            'alamat' => 'Jl. Contoh Alamat 11',
        ]);
    }
}
