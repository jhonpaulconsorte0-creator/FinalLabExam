import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';

export default function Show({ ticket }) {
    const [deleting, setDeleting] = useState(false);

    const destroy = () => {
        if (!window.confirm('Delete this ticket? This cannot be undone.')) return;
        router.delete(route('tickets.destroy', ticket.id), {
            onStart: () => setDeleting(true),
            onFinish: () => setDeleting(false),
        });
    };

    const when = (v) => new Date(v).toLocaleString();

    return (
        <AuthenticatedLayout
            header={
                <Link href={route('tickets.index')} className="text-sm font-medium text-indigo-600 hover:underline">← Back to tickets</Link>
            }
        >
            <Head title={ticket.title} />

            <article className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
                <h1 className="break-words text-xl font-semibold text-gray-900">{ticket.title}</h1>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <PriorityBadge value={ticket.priority} />
                    <StatusBadge value={ticket.status} />
                    <span className="text-sm text-gray-500">{ticket.category}</span>
                </div>

                {/* React escapes this text by default; no dangerouslySetInnerHTML. */}
                <p className="mt-6 whitespace-pre-wrap break-words text-gray-700">{ticket.description}</p>

                <dl className="mt-6 grid grid-cols-1 gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500 sm:grid-cols-2">
                    <div><dt className="inline font-medium">Created: </dt><dd className="inline">{when(ticket.created_at)}</dd></div>
                    <div><dt className="inline font-medium">Updated: </dt><dd className="inline">{when(ticket.updated_at)}</dd></div>
                </dl>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Link href={route('tickets.edit', ticket.id)} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50">Edit</Link>
                    <button type="button" onClick={destroy} disabled={deleting} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
                        {deleting ? 'Deleting…' : 'Delete'}
                    </button>
                </div>
            </article>
        </AuthenticatedLayout>
    );
}
