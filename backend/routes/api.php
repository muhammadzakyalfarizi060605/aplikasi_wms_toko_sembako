<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\GudangController;
use App\Http\Controllers\KasirController;
use App\Http\Controllers\KategoriBarangController;
use App\Http\Controllers\RakController;
use App\Http\Controllers\SupplierController;
use App\Models\KategoriBarangModel;
use Illuminate\Support\Facades\Route;

// Login route
Route::post('/login', [AuthController::class, 'login']);

// Middleware auth untuk semua rute di bawah ini

Route::middleware(['auth'])->group(function () {
    // Rute untuk admin (hanya bisa diakses oleh admin)
    Route::get('/dashboard/admin', [AdminController::class, 'index'])->middleware('role:admin');

    // Rute untuk kasir (hanya bisa diakses oleh kasir)
    Route::get('/dashboard/kasir', [KasirController::class, 'index'])->middleware('role:kasir');

    // Rute untuk gudang (hanya bisa diakses oleh gudang)
    Route::get('/dashboard/gudang', [GudangController::class, 'index'])->middleware('role:gudang');
});


// Supplier dan Rak hanya bisa diakses oleh gudang dan kasir
Route::apiResource('suppliers', SupplierController::class);
Route::apiResource('rak', RakController::class);
Route::apiResource('kategori-barang', KategoriBarangController::class);
Route::apiResource('barang', BarangController::class);
