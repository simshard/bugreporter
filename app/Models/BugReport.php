<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugReport extends Model
{
    /** @use HasFactory<\Database\Factories\BugReportFactory> */
    use HasFactory;
    protected $fillable = ['title', 'description', 'severity'];
}
