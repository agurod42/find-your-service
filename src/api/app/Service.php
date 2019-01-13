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

    /**
     * Returns a SQL expression which calculates the distance between the
     * service geolocation and the provided point ($lat, $lng) using the
     * Haversine formula (See https://en.wikipedia.org/wiki/Haversine_formula)
     * The formula returns a SQL numeric value which express the distance in
     * meters.
     *
     * @param double $lat Latitude of destination's coordinate
     * @param double $lng Longitude of destination's coordinate
     *
     * @return string
     */
    public static function haversine($lat, $lng)
    {
        return "( 
                    6371000 * 
                    acos( 
                        cos( radians( $lat ) ) * 
                        cos( radians( location_lat ) ) * 
                        cos( radians( location_lon ) - radians( $lng ) ) 
                        + 
                        sin( radians( $lat ) ) * 
                        sin( radians( location_lat ) ) 
                    ) 
                )";
    }
}
