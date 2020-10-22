<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Yajra\Datatables\Datatables;
use Carbon\Carbon;
use GuzzleHttp\Client;
class BusinessController extends Controller
{
    public function index()
    {
        return view('business.index');
    }

    public function create()
    {
        return view('business.create');
    }
    public function show($id)
    {
        return view('business.show');
    }
    public function edit($id)
    {
        return view('business.edit');
    }
    //Se trae la peticion desde la API
    public function getArray(Request $r)
    {
        $client = new Client([
            'base_uri' => 'http://thewolfbattle.codemint.com.mx:9200',
            'timeout' => 2.0,
        ]);
        $response = $client->request('GET','/getBranch');
        return Datatables::of(json_decode($response->getBody()->getContents()))
        ->make(true);
    }
   
}
