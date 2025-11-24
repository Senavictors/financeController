<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class GoalController extends Controller
{
    public function index(): JsonResponse
    {
        $goals = Auth::user()->goals()
            ->orderBy('deadline', 'asc')
            ->orderBy('priority', 'desc')
            ->get();

        return response()->json($goals);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'target_amount' => 'required|numeric|min:0',
            'current_amount' => 'nullable|numeric|min:0',
            'deadline' => 'required|date|after:today',
            'category' => 'nullable|string|max:100',
            'priority' => 'in:low,medium,high',
            'is_achieved' => 'boolean'
        ]);

        $goal = Auth::user()->goals()->create($validated);

        return response()->json($goal, 201);
    }

    public function show(Goal $goal): JsonResponse
    {
        $this->authorize('view', $goal);
        
        return response()->json($goal);
    }

    public function update(Request $request, Goal $goal): JsonResponse
    {
        $this->authorize('update', $goal);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'target_amount' => 'sometimes|numeric|min:0',
            'current_amount' => 'sometimes|numeric|min:0',
            'deadline' => 'sometimes|date|after:today',
            'category' => 'nullable|string|max:100',
            'priority' => 'sometimes|in:low,medium,high',
            'is_achieved' => 'boolean'
        ]);

        $goal->update($validated);

        return response()->json($goal);
    }

    public function destroy(Goal $goal): JsonResponse
    {
        $this->authorize('delete', $goal);
        
        $goal->delete();

        return response()->json(null, 204);
    }

    public function progress(): JsonResponse
    {
        $goals = Auth::user()->goals()
            ->select('id', 'name', 'target_amount', 'current_amount', 'deadline', 'is_achieved')
            ->get()
            ->map(function ($goal) {
                $goal->progress_percentage = $goal->target_amount > 0 
                    ? round(($goal->current_amount / $goal->target_amount) * 100, 2) 
                    : 0;
                return $goal;
            });

        return response()->json($goals);
    }
}