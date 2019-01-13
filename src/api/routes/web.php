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

// public routes

$router->post('auth', ['uses' => 'AuthController@authenticate']);
$router->get('services', ['uses' => 'ServiceController@index']);

// private routes

$router->group(
    ['middleware' => 'jwt.auth'], 
    function() use ($router) {
        $router->get   ('services/{id}', ['uses' => 'ServiceController@show']);
        $router->post  ('services',      ['uses' => 'ServiceController@create']);
        $router->put   ('services/{id}', ['uses' => 'ServiceController@update']);
        $router->delete('services/{id}', ['uses' => 'ServiceController@delete']);
    }
);

// react app's routes

function routeReactApp($router, $route, $reactAppPath) {
    $router->group(['prefix' => $route], function () use ($router, $reactAppPath) {

        $router->get('/', function () use ($reactAppPath) {
            return File::get($reactAppPath.'/index.html');
        });

        $router->get('/{any:.*}', function ($any = null) use ($reactAppPath) {
            $filePath = $reactAppPath.'/./'.$any;
            if (file_exists($filePath)) {
                $fileNameParts = explode('.', $any);
                $fileExt = strtolower($fileNameParts[count($fileNameParts) - 1]);
                if ($fileExt === 'css') header('Content-Type: text/css');
                else if ($fileExt === 'js') header('Content-Type: text/javascript');
                echo file_get_contents($filePath);
            }
            else {
                return File::get($reactAppPath.'/index.html');
            }
        });
        
    });
}

routeReactApp($router, 'admin', __DIR__.'/../../webapp-admin/dist');
routeReactApp($router, 'public', __DIR__.'/../../webapp-public/dist');
