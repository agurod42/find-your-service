<?php

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
        if (!DB::table('users')->select()->where(['email' => 'me@agurodriguez.net'])->exists()) {
            DB::table('users')->insert([
                'email' => 'me@agurodriguez.net',
                'password' => app('hash')->make('password1')
            ]);
        }
    }
}