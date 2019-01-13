<?php // phpcs:disable PSR1.Classes.ClassDeclaration

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (!DB::table('services')->select()->where(['title' => 'New York Service'])->exists()) {
            DB::table('services')->insert([
                'title' => 'New York Service',
                'description' => 'Service 0.27km away from New York',
                'address' => '120 Church St, New York, NY 10007, EE. UU.',
                'city' => 'New York',
                'state' => 'New York',
                'zip_code' => '10007',
                'location_lat' => '40.71372',
                'location_lon' => '-74.00923599999999'
            ]);

            DB::table('services')->insert([
                'title' => 'Brooklyn Service',
                'description' => 'Service 1.51km away from New York',
                'address' => '11 Old Fulton St, Brooklyn, NY 11201, EE. UU.',
                'city' => 'New York',
                'state' => 'New York',
                'zip_code' => '11201',
                'location_lat' => '40.7028778',
                'location_lon' => '-73.99363149999999'
            ]);
            
            DB::table('services')->insert([
                'title' => '26th Service',
                'description' => 'Service 4.19km away from New York',
                'address' => '525 W 26th St, New York, NY 10001, EE. UU.',
                'city' => 'New York',
                'state' => 'New York',
                'zip_code' => '10001',
                'location_lat' => '40.7502999',
                'location_lon' => '-74.00389369999999'
            ]);

            DB::table('services')->insert([
                'title' => 'Riverwalk Service',
                'description' => 'Service 7.86km away from New York',
                'address' => '55-1 Riverwalk Pl, West New York, NJ 07093, EE. UU.',
                'city' => 'West New York',
                'state' => 'New York',
                'zip_code' => '07093',
                'location_lat' => '40.782952',
                'location_lon' => '-74.00715689999998'
            ]);

            DB::table('services')->insert([
                'title' => 'Newark Service',
                'description' => 'Service 14.24km away from New York',
                'address' => 'Broad St, Newark, NJ 07102, EE. UU.',
                'city' => 'Newark',
                'state' => 'New Jersey',
                'zip_code' => '07102',
                'location_lat' => '40.7356017',
                'location_lon' => '-74.17219319999998'
            ]);

            DB::table('services')->insert([
                'title' => 'Westfield Service',
                'description' => 'Service 29.55km away from New York',
                'address' => '117 Central Ave, Westfield, NJ 07090, EE. UU.',
                'city' => 'Westfield',
                'state' => 'New Jersey',
                'zip_code' => '07090',
                'location_lat' => '40.6520818',
                'location_lon' => '-74.34693679999998'
            ]);

            DB::table('services')->insert([
                'title' => 'Trenton Service',
                'description' => 'Service 84.60km away from New York',
                'address' => '102 S Warren St, Trenton, NJ 08611, EE. UU.',
                'city' => 'Trenton',
                'state' => 'New Jersey',
                'zip_code' => '08608',
                'location_lat' => '40.2191519',
                'location_lon' => '-74.7658439'
            ]);

            DB::table('services')->insert([
                'title' => 'Vancouver Service',
                'description' => 'Service 3911.47km away from New York',
                'address' => '2270 W 4th Ave, Vancouver, BC V6K 1N8',
                'city' => 'Ridgway',
                'state' => 'Pennsylvania',
                'zip_code' => '15853',
                'location_lat' => '41.421535',
                'location_lon' => '-78.731404'
            ]);
        }
    }
}
