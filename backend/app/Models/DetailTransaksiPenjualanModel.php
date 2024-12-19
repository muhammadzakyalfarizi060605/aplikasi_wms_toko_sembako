<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksiPenjualanModel extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'detail_transaksi_penjualan';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id_detail_penjualan';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */

    /**
     * The data type of the auto-incrementing ID.
     *
     * @var string
     */

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_penjualan',
        'id_barang',
        'harga_jual_persatuan',
        'jumlah_barang',
        'subtotal',
    ];

    public $timestamps = true;


    /**
     * Get the related Penjualan (transaksi_penjualan).
     */
    public function penjualan()
    {
        return $this->belongsTo(TransaksiPenjualanModel::class, 'id_penjualan', 'id_penjualan');
    }

    /**
     * Get the related Barang.
     */
    public function barang()
    {
        return $this->belongsTo(BarangModel::class, 'id_barang', 'id_barang');
    }



    /**
     * Set the subtotal attribute automatically.
     */
}
