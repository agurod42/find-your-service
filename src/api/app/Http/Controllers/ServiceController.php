<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $table = DB::table('services')->select('*');

        if ($request->has('title')) {
            $table->where('title', 'like', '%'.$request->input('title').'%');
        }

        if ($request->has('distance') && $request->has('distance_to')) {
            $distance = $request->input('distance');
            $distance_to = explode(',', $request->input('distance_to'));
            $haversine = Service::haversine($distance_to[0], $distance_to[1]);
            $table->addSelect(DB::raw("$haversine AS distance"));
            $table->where(DB::raw($haversine), '<', $distance);
        }
        
        return response()->json($table->get());
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