<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'description', 'image'];

    protected $appends = ['image_category'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function getImageCategoryAttribute()
    {
        return \Storage::url($this->image);
    }
}
