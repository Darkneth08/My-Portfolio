<?php

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', function () {
    return view('welcome');
});

Route::post('/messages', function (Request $request) {
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:120'],
        'email' => ['nullable', 'email', 'max:160'],
        'phone' => ['nullable', 'string', 'max:60'],
        'message' => ['required', 'string', 'min:8', 'max:3000'],
    ]);

    $message = ContactMessage::create($validated);

    try {
        Mail::raw(
            "New portfolio message from {$message->name}\n\nEmail: {$message->email}\nPhone: {$message->phone}\n\n{$message->message}",
            fn ($mail) => $mail
                ->to('kbburgos23@gmail.com')
                ->subject("Portfolio message from {$message->name}")
        );
    } catch (\Throwable) {
        report('Portfolio message was saved, but mail delivery/logging failed.');
    }

    return response()->json([
        'message' => 'Message saved to the admin inbox.',
        'id' => $message->id,
    ], 201);
});

$adminPin = fn (): string => (string) env('PORTFOLIO_ADMIN_PIN', '2468');
$adminToken = fn (): string => hash_hmac('sha256', 'kristine-portfolio-admin', (string) config('app.key'));
$requireAdmin = function (Request $request) use ($adminToken): void {
    abort_unless(hash_equals($adminToken(), (string) $request->bearerToken()), 403);
};

Route::post('/admin/login', function (Request $request) use ($adminPin, $adminToken) {
    $validated = $request->validate([
        'pin' => ['required', 'string', 'max:40'],
    ]);

    abort_unless(hash_equals($adminPin(), $validated['pin']), 422, 'Invalid admin PIN.');

    return response()->json([
        'token' => $adminToken(),
        'message' => 'Admin unlocked.',
    ]);
});

Route::get('/admin/messages', function (Request $request) use ($requireAdmin) {
    $requireAdmin($request);

    return ContactMessage::query()
        ->latest()
        ->get()
        ->map(fn (ContactMessage $message) => [
            'id' => $message->id,
            'name' => $message->name,
            'email' => $message->email,
            'phone' => $message->phone,
            'message' => $message->message,
            'status' => $message->status,
            'read_at' => $message->read_at?->toIso8601String(),
            'replied_at' => $message->replied_at?->toIso8601String(),
            'created_at' => $message->created_at?->toIso8601String(),
        ]);
});

Route::patch('/admin/messages/{contactMessage}', function (
    Request $request,
    ContactMessage $contactMessage
) use ($requireAdmin) {
    $requireAdmin($request);

    $validated = $request->validate([
        'status' => ['required', Rule::in(['unread', 'read', 'replied', 'archived'])],
    ]);

    $contactMessage->status = $validated['status'];

    if ($validated['status'] !== 'unread' && $contactMessage->read_at === null) {
        $contactMessage->read_at = now();
    }

    if ($validated['status'] === 'replied' && $contactMessage->replied_at === null) {
        $contactMessage->replied_at = now();
    }

    $contactMessage->save();

    return response()->json(['message' => 'Message updated.']);
});

Route::delete('/admin/messages/{contactMessage}', function (
    Request $request,
    ContactMessage $contactMessage
) use ($requireAdmin) {
    $requireAdmin($request);

    $contactMessage->delete();

    return response()->json(['message' => 'Message deleted.']);
});
