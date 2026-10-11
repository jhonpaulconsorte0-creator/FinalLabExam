import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import { formatDate } from '@/utils';

export default function Dashboard({ stats, recent }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Object.entries(stats).map(([status, total]) => (
                    <div key={status} className="rounded-lg border border-gray-200 bg-white p-4">
                        <p className="text-sm text-gray-500">{status}</p>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">{total}</p>
                    </div>
                ))}
            </div>

            <section className="mt-8 rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                    <h2 className="font-medium text-gray-900">Recent tickets</h2>
                    <Link href={route('tickets.index')} className="text-sm font-medium text-indigo-600 hover:underline">View all</Link>
                </div>

                {recent.length === 0 ? (
                    <p className="px-4 py-8 text-center text-sm text-gray-500">You haven't filed any tickets yet.</p>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {recent.map((t) => (
                            <li key={t.id}>
                                <Link href={route('tickets.show', t.id)} className="flex flex-col gap-2 px-4 py-3 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="font-medium text-gray-900">{t.title}</span>
                                    <span className="flex flex-wrap items-center gap-2">
                                        <PriorityBadge value={t.priority} />
                                        <StatusBadge value={t.status} />
                                        <span className="text-xs text-gray-500">{formatDate(t.created_at)}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </AuthenticatedLayout>
    );
}
