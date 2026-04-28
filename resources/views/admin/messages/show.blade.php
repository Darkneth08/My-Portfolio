@extends('admin.layout')

@section('title', 'View Message')
@section('page_title', 'Message Details')

@section('content')
    <section class="panel message-detail">
        <div class="panel-head">
            <div>
                <span class="status {{ $message->status }}">{{ $message->status_badge }}</span>
                <h2>{{ $message->subject }}</h2>
                <p class="muted">From {{ $message->name }} &lt;{{ $message->email }}&gt; • {{ $message->created_at->format('M d, Y h:i A') }}</p>
            </div>
            <a href="mailto:{{ $message->email }}?subject=Re:%20{{ rawurlencode($message->subject) }}" class="primary-btn">Reply by Email</a>
        </div>

        <div class="message-box">{{ $message->message }}</div>

        <div class="actions-row">
            <form action="{{ route('admin.messages.status', $message) }}" method="POST">
                @csrf
                @method('PATCH')
                <input type="hidden" name="status" value="unread">
                <button type="submit" class="ghost-btn">Mark Unread</button>
            </form>
            <form action="{{ route('admin.messages.status', $message) }}" method="POST">
                @csrf
                @method('PATCH')
                <input type="hidden" name="status" value="replied">
                <button type="submit" class="ghost-btn">Mark Replied</button>
            </form>
            <form action="{{ route('admin.messages.status', $message) }}" method="POST">
                @csrf
                @method('PATCH')
                <input type="hidden" name="status" value="archived">
                <button type="submit" class="ghost-btn">Archive</button>
            </form>
            <form action="{{ route('admin.messages.destroy', $message) }}" method="POST" onsubmit="return confirm('Delete this message?')">
                @csrf
                @method('DELETE')
                <button type="submit" class="danger-btn">Delete</button>
            </form>
        </div>
    </section>
@endsection
