<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'address', 'city', 'state', 'zip_code', 'location_lat', 'location_lon'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}