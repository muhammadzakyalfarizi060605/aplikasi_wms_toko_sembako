<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class UserModel extends Model
{
    use HasFactory;
    use Notifiable;

    protected $table = 'users'; // Sesuaikan nama tabel jika berbeda

    protected $primaryKey = 'id_supplier';
    protected $fillable = ['nama_lengkap', 'email', 'password', 'role'];
    public $timestamps = true;
}
