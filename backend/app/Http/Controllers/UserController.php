<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function show(): JsonResponse
    {
        $user = Auth::user()->load(['preference', 'accounts', 'goals']);
        return response()->json($user);
    }

    public function update(Request $request): JsonResponse
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8|confirmed',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json($user);
    }

    public function updatePreferences(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'currency' => 'sometimes|string|size:3',
            'timezone' => 'sometimes|string',
            'language' => 'sometimes|string|size:2',
            'date_format' => 'sometimes|string',
            'week_starts_on' => 'sometimes|in:sunday,monday',
            'theme' => 'sometimes|in:light,dark',
            'notifications_enabled' => 'sometimes|boolean',
            'email_notifications' => 'sometimes|boolean',
            'push_notifications' => 'sometimes|boolean',
        ]);

        $preference = $user->preference ?: new Preference();
        $preference->fill($validated);
        $preference->user_id = $user->id;
        $preference->save();

        return response()->json($preference);
    }

    public function delete(): JsonResponse
    {
        $user = Auth::user();
        $user->delete();

        return response()->json([
            'message' => 'Usuário deletado com sucesso'
        ], 204);
    }
}