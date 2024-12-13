<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarangModel extends Model
{
    use HasFactory;

    // Nama tabel yang digunakan oleh model ini (opsional jika nama tabel mengikuti konvensi)
    protected $table = 'barang';

    protected $primaryKey = 'id_barang';


    // Kolom-kolom yang dapat diisi mass-assignment
    protected $fillable = [
        'id_kategori',
        'nama_barang',
        'alamat_gambar',
        'jumlah_stok',
        'satuan',
        'harga_jual_persatuan',
    ];

    // Relasi ke model KategoriBarang
    public function kategori()
    {
        return $this->belongsTo(KategoriBarangModel::class, 'id_kategori', 'id_kategori');
    }
    public $timestamps = true;
}
