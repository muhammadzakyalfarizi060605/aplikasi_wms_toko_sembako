<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|min:5',
            'password' => 'required|min:5',
        ]);

        // Cek user berdasarkan email dan password
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();  // Mendapatkan pengguna yang sedang login
            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'nama_lengkap' => $user->nama_lengkap,
                    'role' => $user->role, // Misalnya: admin, kasir, gudang
                ],
            ]);
        }

        return response()->json(['message' => 'Ada yang salah dengan inputan anda !!'], 401);
    }
}
