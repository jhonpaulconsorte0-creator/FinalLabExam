import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessages() {
    const { flash } = usePage().props;
    const [message, setMessage] = useState(null);

    // flash is a new object on every Inertia response, so this re-runs per action.
    useEffect(() => {
        if (flash?.success) setMessage({ type: 'success', text: flash.success });
        else if (flash?.error) setMessage({ type: 'error', text: flash.error });
        else setMessage(null);
    }, [flash]);

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => setMessage(null), 4000);
        return () => clearTimeout(timer);
    }, [message]);

    if (!message) return null;

    const styles =
        message.type === 'success'
            ? 'border-green-300 bg-green-50 text-green-800'
            : 'border-red-300 bg-red-50 text-red-800';

    return (
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
            <div role="status" className={`flex items-start justify-between gap-4 rounded-md border px-4 py-3 text-sm ${styles}`}>
                <span>{message.text}</span>
                <button type="button" onClick={() => setMessage(null)} className="font-medium underline" aria-label="Dismiss message">
                    Dismiss
                </button>
            </div>
        </div>
    );
}
