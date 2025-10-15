<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';
    protected $primaryKey = 'id';
    protected $fillable = [
        'description',
        'amount',
        'type',
        'category_id',
        'transaction_date',
        'notes'
    ];
}
