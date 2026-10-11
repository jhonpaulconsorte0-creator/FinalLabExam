import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import Pagination from '@/Components/Pagination';
import { formatDate } from '@/utils';

const control = 'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500';

export default function Index({ tickets, filters, options }) {
    const [search, setSearch] = useState(filters.search ?? '');

    const current = {
        search,
        status: filters.status ?? '',
        priority: filters.priority ?? '',
        category: filters.category ?? '',
    };

    const apply = (next) => {
        const params = Object.fromEntries(Object.entries(next).filter(([, v]) => v));
        router.get(route('tickets.index'), params, { preserveState: true, preserveScroll: true, replace: true });
    };

    const clear = () => {
        setSearch('');
        router.get(route('tickets.index'), {}, { preserveState: true, replace: true });
    };

    const hasFilters = Object.values(current).some(Boolean);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">My Tickets</h1>
                    <Link href={route('tickets.create')} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">New Ticket</Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <form
                onSubmit={(e) => { e.preventDefault(); apply(current); }}
                className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search titles" className={`${control} lg:col-span-2`} />
                <select value={current.status} onChange={(e) => apply({ ...current, status: e.target.value })} className={control} aria-label="Filter by status">
                    <option value="">All statuses</option>
                    {options.statuses.map((o) => <option key={o}>{o}</option>)}
                </select>
                <select value={current.priority} onChange={(e) => apply({ ...current, priority: e.target.value })} className={control} aria-label="Filter by priority">
                    <option value="">All priorities</option>
                    {options.priorities.map((o) => <option key={o}>{o}</option>)}
                </select>
                <select value={current.category} onChange={(e) => apply({ ...current, category: e.target.value })} className={control} aria-label="Filter by category">
                    <option value="">All categories</option>
                    {options.categories.map((o) => <option key={o}>{o}</option>)}
                </select>
                <div className="flex gap-2 sm:col-span-2 lg:col-span-5">
                    <button type="submit" className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-900">Search</button>
                    {hasFilters && (
                        <button type="button" onClick={clear} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Clear filters</button>
                    )}
                </div>
            </form>

            {tickets.data.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                    {hasFilters ? (
                        <p className="text-gray-600">No tickets match your filters.</p>
                    ) : (
                        <>
                            <p className="font-medium text-gray-900">No tickets yet</p>
                            <p className="mt-1 text-sm text-gray-500">File your first support request to get started.</p>
                            <Link href={route('tickets.create')} className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Create a ticket</Link>
                        </>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white md:block">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-left text-gray-600">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Title</th>
                                    <th className="px-4 py-3 font-medium">Category</th>
                                    <th className="px-4 py-3 font-medium">Priority</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <Link href={route('tickets.show', t.id)} className="font-medium text-indigo-600 hover:underline">{t.title}</Link>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{t.category}</td>
                                        <td className="px-4 py-3"><PriorityBadge value={t.priority} /></td>
                                        <td className="px-4 py-3"><StatusBadge value={t.status} /></td>
                                        <td className="px-4 py-3 text-gray-600">{formatDate(t.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile stacked cards */}
                    <ul className="space-y-3 md:hidden">
                        {tickets.data.map((t) => (
                            <li key={t.id}>
                                <Link href={route('tickets.show', t.id)} className="block rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50">
                                    <p className="font-medium text-gray-900">{t.title}</p>
                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <PriorityBadge value={t.priority} />
                                        <StatusBadge value={t.status} />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">{t.category} · {formatDate(t.created_at)}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Pagination paginator={tickets} />
                </>
            )}
        </AuthenticatedLayout>
    );
}
