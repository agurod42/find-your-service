<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        if ($distance = $request->input('distance')) {
            return $this->indexByDistance($request);
        }
        else {
            return response()->json(Service::all());
        }
    }

    private function indexByDistance(Request $request) 
    {
        $distance = $request->input('distance');
        $distance_to = explode(',', $request->input('distance_to'));
        $haversine = Service::haversine($distance_to[0], $distance_to[1]);

        return response()->json(DB::select(
            "SELECT *, $haversine AS distance 
            FROM services 
            WHERE $haversine < $distance"
        ));
    }

    public function show($id)
    {
        return response()->json(Service::find($id));
    }

    public function create(Request $request)
    {
        $service = Service::create($request->all());

        return response()->json(Service::all(), 200);
    }

    public function update($id, Request $request)
    {
        $service = Service::findOrFail($id);
        $service->update($request->all());

        return response()->json(Service::all(), 200);
    }

    public function delete($id)
    {
        Service::findOrFail($id)->delete();

        return response()->json(Service::all(), 200);
    }
}