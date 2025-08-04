<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\BugReportController;

    Route::get('/', [BugReportController::class, 'index'])->name('bug_reports.index');
    Route::get('/bug-reporter', [BugReportController::class, 'create'])->name('bug_reports.create');


Route::prefix('api')->middleware('api')->group(function () {
    Route::post('/bug-reports', [BugReportController::class, 'store']);
});

