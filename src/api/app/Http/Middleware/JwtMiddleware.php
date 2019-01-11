<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use App\User;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->headers->get('X-Auth-Token');
        
        if (!$token) {
            return response()->json([
                'error' => 'Token not provided.'
            ], 401);
        }

        try {
            $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
        } 
        catch(ExpiredException $e) {
            return response()->json([
                'error' => 'Provided token is expired.'
            ], 403);
        } 
        catch(Exception $e) {
            return response()->json([
                'error' => 'An error while decoding token.'
            ], 403);
        }

        $request->auth = User::find($credentials->sub);

        return $next($request);
    }
}
