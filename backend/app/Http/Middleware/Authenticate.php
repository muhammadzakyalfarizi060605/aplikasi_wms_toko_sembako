<?php

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    public function handle(Request $request, Closure $next)
    {
        // Cek apakah pengguna sudah login
        if (!Auth::check()) {
            return redirect('/login');  // Alihkan ke halaman login jika belum login
        }

        return $next($request);
    }
}
