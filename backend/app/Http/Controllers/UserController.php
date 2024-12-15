<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Method untuk menampilkan semua data user
    public function index()
    {
        // Ambil semua data user, bisa juga menggunakan paginate() untuk paginasi
        $users = UserModel::all();

        // Mengembalikan response dengan data users
        return response()->json($users, 200);
    }
}
