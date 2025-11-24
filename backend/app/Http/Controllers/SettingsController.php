<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\Preference;

class SettingsController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = [
            'user' => Auth::user()->load('preference'),
            'app_settings' => [
                'currency' => config('app.currency', 'USD'),
                'timezone' => config('app.timezone', 'UTC'),
                'language' => config('app.locale', 'en'),
                'date_format' => config('app.date_format', 'Y-m-d'),
            ]
        ];

        return response()->json($settings);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
        ]);

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

    public function notifications(): JsonResponse
    {
        $user = Auth::user();
        
        $settings = [
            'notifications_enabled' => $user->preference?->notifications_enabled ?? true,
            'email_notifications' => $user->preference?->email_notifications ?? true,
            'push_notifications' => $user->preference?->push_notifications ?? true,
            'categories' => [
                'budget_alerts' => true,
                'goal_reminders' => true,
                'transaction_alerts' => false,
                'monthly_reports' => true,
            ]
        ];

        return response()->json($settings);
    }

    public function updateNotifications(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'notifications_enabled' => 'boolean',
            'email_notifications' => 'boolean',
            'push_notifications' => 'boolean',
            'categories' => 'sometimes|array',
            'categories.budget_alerts' => 'boolean',
            'categories.goal_reminders' => 'boolean',
            'categories.transaction_alerts' => 'boolean',
            'categories.monthly_reports' => 'boolean',
        ]);

        $user = Auth::user();
        $preference = $user->preference ?: new Preference();
        
        if (isset($validated['notifications_enabled'])) {
            $preference->notifications_enabled = $validated['notifications_enabled'];
        }
        if (isset($validated['email_notifications'])) {
            $preference->email_notifications = $validated['email_notifications'];
        }
        if (isset($validated['push_notifications'])) {
            $preference->push_notifications = $validated['push_notifications'];
        }
        
        $preference->user_id = $user->id;
        $preference->save();

        return response()->json($preference);
    }
}