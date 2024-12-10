<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RakModel extends Model
{
    use HasFactory;

    // Menentukan nama tabel jika berbeda dengan nama model (secara default Laravel menggunakan bentuk jamak dari nama model, yaitu 'raks')
    protected $table = 'rak';

    // Kolom yang boleh diisi (Mass Assignment)
    protected $fillable = [
        'kode_rak',
        'nama_rak',
        'lokasi_rak',
    ];

    // Menyatakan bahwa model ini menggunakan timestamp
    public $timestamps = true;

    // Jika ingin menambahkan pengaturan lebih lanjut, seperti mengubah format timestamp, Anda bisa melakukannya di sini
}
