<?php

use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->post('auth', ['uses' => 'AuthController@authenticate']);

$router->group(
    ['middleware' => 'jwt.auth'], 
    function() use ($router) {
        $router->get   ('services',      ['uses' => 'ServiceController@index']);
        $router->get   ('services/{id}', ['uses' => 'ServiceController@show']);
        $router->post  ('services',      ['uses' => 'ServiceController@create']);
        $router->put   ('services/{id}', ['uses' => 'ServiceController@update']);
        $router->delete('services/{id}', ['uses' => 'ServiceController@delete']);
    }
);

$router->group(['prefix' => 'webapp'], function () use ($router) {

    $router->get('/', function () {
        return File::get(__DIR__.'/../../webapp/dist/index.html');
    });

    $router->get('/{any:.*}', function ($any = null) {
        $filePath = __DIR__.'/../../webapp/dist/'.$any;
        if (file_exists($filePath)) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            header('Content-Type: '.finfo_file($finfo, $filePath));
            finfo_close($finfo);
            return File::get($filePath);
        }
        else {
            return File::get(__DIR__.'/../../webapp/dist/index.html');
        }
    });
    
});