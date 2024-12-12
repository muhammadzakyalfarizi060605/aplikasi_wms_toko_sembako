<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriBarangModel extends Model
{
    use HasFactory;

    // Nama tabel yang terkait dengan model ini
    protected $table = 'kategori_barang';

    // Primary key dari tabel
    protected $primaryKey = 'id_kategori';

    // Kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'nama_kategori',
        'deskripsi',
    ];

    // Relasi ke model Barang
    public function barang()
    {
        return $this->hasMany(BarangModel::class, 'id_kategori', 'id_kategori');
    }
    public $timestamps = true;
}
