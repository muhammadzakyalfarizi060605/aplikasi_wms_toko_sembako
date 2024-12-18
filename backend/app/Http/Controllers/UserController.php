<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Method untuk menampilkan semua data user
    public function index(Request $request)
    {
        // Ambil data dengan filter berdasarkan query parameter role
        $role = $request->query('role');

        // Cek apakah role ada dan jika iya, filter berdasarkan role tersebut
        if ($role) {
            $users = UserModel::where('role', $role)->get();
        } else {
            $users = UserModel::all(); // Ambil semua data jika tidak ada filter
        }

        // Mengembalikan response dengan data users
        return response()->json($users, 200);
    }
}
