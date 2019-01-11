<?php

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

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get   ('/services',      ['uses' => 'ServiceController@index']);
$router->get   ('/services/{id}', ['uses' => 'ServiceController@show']);
$router->post  ('/services',      ['uses' => 'ServiceController@create']);
$router->put   ('/services/{id}', ['uses' => 'ServiceController@update']);
$router->delete('/services/{id}', ['uses' => 'ServiceController@delete']);
