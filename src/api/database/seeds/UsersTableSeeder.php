<?php // phpcs:disable PSR1.Classes.ClassDeclaration

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (!DB::table('users')->select()->where(['email' => 'admin@findyourservice.io'])->exists()) {
            DB::table('users')->insert([
                'email' => 'admin@findyourservice.io',
                'password' => app('hash')->make('password')
            ]);
        }
    }
}
