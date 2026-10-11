import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import FlashMessages from '@/Components/FlashMessages';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const logout = () => router.post(route('logout'));

    const linkClass = (active) =>
        `rounded-md px-3 py-2 text-sm font-medium ${active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`;

    const links = (
        <>
            <Link href={route('dashboard')} className={linkClass(route().current('dashboard'))}>Dashboard</Link>
            <Link href={route('tickets.index')} className={linkClass(route().current('tickets.index'))}>Tickets</Link>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Link href={route('dashboard')} className="text-lg font-semibold text-gray-900">HelpDesk</Link>
                        <div className="hidden items-center gap-1 md:flex">{links}</div>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link href={route('profile.edit')} className="text-sm text-gray-700 hover:underline">{auth.user.name}</Link>
                        <Link href={route('tickets.create')} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">New Ticket</Link>
                        <button type="button" onClick={logout} className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Logout</button>
                    </div>

                    <button type="button" onClick={() => setOpen(!open)} className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden" aria-label="Toggle menu" aria-expanded={open}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            {open ? <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>

                {open && (
                    <div className="space-y-2 border-t border-gray-200 px-4 py-3 md:hidden">
                        <div className="flex flex-col gap-1">{links}</div>
                        <Link href={route('tickets.create')} className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white">New Ticket</Link>
                        <div className="flex items-center justify-between pt-2">
                            <Link href={route('profile.edit')} className="text-sm text-gray-700">{auth.user.name}</Link>
                            <button type="button" onClick={logout} className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700">Logout</button>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <FlashMessages />

            <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
}
