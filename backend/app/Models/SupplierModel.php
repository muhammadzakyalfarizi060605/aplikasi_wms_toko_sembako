<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierModel extends Model
{
    use HasFactory;

    // Nama tabel yang digunakan (opsional, jika berbeda dari default)
    protected $table = 'suppliers';

    // Primary key tabel
    protected $primaryKey = 'id_supplier';

    // Kolom yang dapat diisi (fillable)
    protected $fillable = [
        'nama_supplier',
        'email',
        'no_telp',
        'alamat',
    ];

    public $timestamps = true;
}
