<?php

namespace Database\Seeders;

use App\Models\UserModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserModel::create([
            'nama_lengkap' => 'Admin User 1',
            'email' => 'admin1@example.com',
            'password' => Hash::make('password123'), // Enkripsi password
            'role' => 'admin',
        ]);

        UserModel::create([
            'nama_lengkap' => 'Kasir User 1',
            'email' => 'kasir1@example.com',
            'password' => Hash::make('password123'),
            'role' => 'kasir',
        ]);

        UserModel::create([
            'nama_lengkap' => 'Gudang User 1',
            'email' => 'gudang1@example.com',
            'password' => Hash::make('password123'),
            'role' => 'gudang',
        ]);

        UserModel::create([
            'nama_lengkap' => 'Admin User 2',
            'email' => 'admin2@example.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        UserModel::create([
            'nama_lengkap' => 'Kasir User 2',
            'email' => 'kasir2@example.com',
            'password' => Hash::make('password123'),
            'role' => 'kasir',
        ]);

        UserModel::create([
            'nama_lengkap' => 'Gudang User 2',
            'email' => 'gudang2@example.com',
            'password' => Hash::make('password123'),
            'role' => 'gudang',
        ]);

        UserModel::create([
            'nama_lengkap' => 'Admin User 3',
            'email' => 'admin3@example.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        UserModel::create([
            'nama_lengkap' => 'Kasir User 3',
            'email' => 'kasir3@example.com',
            'password' => Hash::make('password123'),
            'role' => 'kasir',
        ]);

        UserModel::create([
            'nama_lengkap' => 'Gudang User 3',
            'email' => 'gudang3@example.com',
            'password' => Hash::make('password123'),
            'role' => 'gudang',
        ]);

        UserModel::create([
            'nama_lengkap' => 'Admin User 4',
            'email' => 'admin4@example.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);
    }
}
