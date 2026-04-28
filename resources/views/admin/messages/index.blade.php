@extends('admin.layout')

@section('title', 'Messages')
@section('page_title', 'Message Inbox')

@section('content')
    <section class="panel">
        <form method="GET" class="filter-bar">
            <input type="search" name="search" placeholder="Search name, email, subject..." value="{{ $search }}">
            <select name="status">
                <option value="">All status</option>
                @foreach(['unread' => 'Unread', 'read' => 'Read', 'replied' => 'Replied', 'archived' => 'Archived'] as $value => $label)
                    <option value="{{ $value }}" @selected($status === $value)>{{ $label }}</option>
                @endforeach
            </select>
            <button type="submit">Filter</button>
            <a href="{{ route('admin.messages.index') }}" class="ghost-btn">Reset</a>
        </form>

        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($messages as $message)
                        <tr>
                            <td><span class="status {{ $message->status }}">{{ $message->status_badge }}</span></td>
                            <td>{{ $message->name }}</td>
                            <td>{{ $message->email }}</td>
                            <td>{{ $message->subject }}</td>
                            <td>{{ $message->created_at->format('M d, Y h:i A') }}</td>
                            <td><a href="{{ route('admin.messages.show', $message) }}" class="small-link">Open</a></td>
                        </tr>
                    @empty
                        <tr><td colspan="6" class="empty">No messages found.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{ $messages->links() }}
    </section>
@endsection
