<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiPenjualanModel extends Model
{
    // Nama tabel di database
    protected $table = 'transaksi_penjualan';

    // Primary key tabel
    protected $primaryKey = 'id_penjualan';

    // Kolom yang boleh diisi (mass assignable)
    protected $fillable = [
        'id_user',
        'nama_pembeli',
        'total_harga',
        'tanggal_penjualan',
        'diskon',
        'harga_setelah_diskon',
    ];


    // Relasi ke tabel users (Many-to-One)
    public function user()
    {
        return $this->belongsTo(UserModel::class, 'id_user');
    }
}
