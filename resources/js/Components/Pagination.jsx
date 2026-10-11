import { Link } from '@inertiajs/react';

export default function Pagination({ paginator }) {
    if (!paginator.total) return null;

    const btn = 'rounded-md border px-3 py-2 text-sm font-medium';
    const on = `${btn} border-gray-300 bg-white text-gray-700 hover:bg-gray-50`;
    const off = `${btn} border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed`;

    return (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-gray-600">
                Showing {paginator.from}–{paginator.to} of {paginator.total} tickets
            </p>
            <div className="flex items-center gap-2">
                {paginator.prev_page_url ? (
                    <Link href={paginator.prev_page_url} preserveScroll className={on}>Previous</Link>
                ) : (
                    <span className={off}>Previous</span>
                )}
                <span className="text-sm text-gray-600">
                    Page {paginator.current_page} of {paginator.last_page}
                </span>
                {paginator.next_page_url ? (
                    <Link href={paginator.next_page_url} preserveScroll className={on}>Next</Link>
                ) : (
                    <span className={off}>Next</span>
                )}
            </div>
        </div>
    );
}
