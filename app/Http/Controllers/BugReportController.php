<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BugReport;
use Inertia\Inertia;

class BugReportController extends Controller
{
    /**
     * Display a listing of the bug reports.
     */
    public function index()
    {
        $bugReports = BugReport::all();
         dd($bugReports);
        //return view('bug_reports.index', compact('bugReports'));
    }

    /**
     * Show the form for creating a new bug report.
     */
    public function create()
    {
       // return view('bug_reports.create');
        return Inertia::render('BugReportForm');
    }

    /**
     * Store a newly created bug report in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string',
            'severity' => 'in:low,medium,high'
        ]);

        $validated['severity'] = $validated['severity'] ?? 'medium';

        $bugReport = BugReport::create($validated);

        return response()->json(['message' => 'Bug reported!', 'data' => $bugReport], 201);
    }
}
//return redirect()->route('bug_reports.index')->with('success', 'Bug reported!');

