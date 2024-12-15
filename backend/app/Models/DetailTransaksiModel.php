<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksiModel extends Model
{
    use HasFactory;

    /**
     * Tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'detail_transaksi_barang';

    /**
     * Primary key dari tabel.
     *
     * @var string
     */
    protected $primaryKey = 'id_detail';

    /**
     * Kolom yang dapat diisi secara mass-assignment.
     *
     * @var array
     */
    protected $fillable = [
        'id_transaksi',
        'id_barang',
        'id_rak',
        'id_rak_tujuan',
        'jumlah_barang',
        'satuan',
        'harga_beli_satuan',
        'tanggal_kadaluwarsa',
        'status',
    ];

    /**
     * Relasi ke model TransaksiBarang.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function transaksi_barang()
    {
        return $this->belongsTo(TransaksiBarangModel::class, 'id_transaksi', 'id_transaksi');
    }

    /**
     * Relasi ke model Barang.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function barang()
    {
        return $this->belongsTo(BarangModel::class, 'id_barang', 'id_barang');
    }

    /**
     * Relasi ke model Rak (lokasi asal).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function rak()
    {
        return $this->belongsTo(RakModel::class, 'id_rak', 'id_rak');
    }

    /**
     * Relasi ke model Rak (lokasi tujuan).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function rakTujuan()
    {
        return $this->belongsTo(RakModel::class, 'id_rak_tujuan', 'id_rak');
    }

    public $timestamps = true;
}
