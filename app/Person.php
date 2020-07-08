<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [ 'name', 'email', 'avatar' ];

    protected $appends = ['avatar_image'];

    public function getAvatarImageAttribute()
    {
        return \Storage::url($this->avatar);
    }
}
