<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiBarangModel extends Model
{
    use HasFactory;

    /**
     * Tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'transaksi_barang';

    protected $primaryKey = 'id_transaksi';

    protected $fillable = [
        'id_user',
        'id_supplier',
        'tanggal_transaksi',
    ];
    public function user()
    {
        return $this->belongsTo(UserModel::class, 'id_user', 'id');
    }

    /**
     * Relasi ke tabel `suppliers`.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function supplier()
    {
        return $this->belongsTo(SupplierModel::class, 'id_supplier', 'id_supplier');
    }
}
