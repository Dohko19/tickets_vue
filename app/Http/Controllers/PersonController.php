<?php

namespace App\Http\Controllers;

use App\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function store(Request $request)
    {

        $person = (new Person)->fill($request->all());
        $person->avatar = $request->avatar->store('public/avatar');
        $person->save();

        return response(['status' => 'success'], 202);
    }

    public function list()
    {
        $people = Person::all();

        if( request()->wantsJson() )
        {
            return $people;
        }
    }
}
