<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // Pastikan pengguna sudah terautentikasi
        if (!Auth::check()) {
            return redirect('/login');  // Jika tidak terautentikasi, arahkan ke halaman login
        }

        // Cek apakah pengguna memiliki salah satu peran yang diizinkan
        if (!in_array(Auth::user()->role, $roles)) {
            return response()->json(['message' => 'Forbidden'], 403);  // Jika role tidak sesuai, beri respons forbidden
        }

        return $next($request);  // Lanjutkan jika role sesuai
    }
}
