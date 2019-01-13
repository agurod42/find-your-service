<?php // phpcs:disable PSR1.Classes.ClassDeclaration

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ServicesTableSeeder::class,
            UsersTableSeeder::class
        ]);
    }
}
