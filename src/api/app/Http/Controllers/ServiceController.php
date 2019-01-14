<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class ServiceController extends Controller
{
    /**
     * List all services. If parameters are provided then the services are filtered.
     * Available filters:
     *      `$title`        string    Substring of service's title
     *      `$distance`     number    Distance to service from `distance_to`
     *      `$distance_to`  string    String representing a coordinate in the format $latitude,$longitude from which
     *                                the distance is calculated
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
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

    /**
     * Show the service with id `$id`.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return response()->json(Service::find($id));
    }

    /**
     * Create a new service and return the full list of services.
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:services',
            'description' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip_code' => 'required',
            'location_lat' => 'required|numeric',
            'location_lon' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $service = Service::create($request->all());

        return response()->json(Service::all(), 200);
    }

    /**
     * Update the service with id `$id` and return the full list of services.
     *
     * @param int $id
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function update($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|unique:services',
            'location_lat' => 'nullable|numeric',
            'location_lon' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $service = Service::findOrFail($id);
        $service->update($request->all());

        return response()->json(Service::all(), 200);
    }

    /**
     * Delete the service with id `$id` and return the full list of services.
     *
     * @param int $id
     * @return mixed
     */
    public function delete($id)
    {
        Service::findOrFail($id)->delete();

        return response()->json(Service::all(), 200);
    }
}
