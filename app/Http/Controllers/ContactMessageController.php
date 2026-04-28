<?php

namespace App\Http\Controllers;

use App\Mail\NewPortfolioMessageMail;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'subject' => ['required', 'string', 'max:180'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ]);

        $message = ContactMessage::create(array_merge($validated, [
            'status' => 'unread',
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 1000),
        ]));

        try {
            Mail::to(config('portfolio.owner_email'))->send(new NewPortfolioMessageMail($message));
        } catch (\Throwable $exception) {
            Log::warning('Portfolio contact email was not sent.', ['error' => $exception->getMessage()]);
        }

        return back()->with('success', 'Thank you! Your message was sent and saved successfully.');
    }
}
