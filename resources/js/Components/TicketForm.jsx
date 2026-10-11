import { Link } from '@inertiajs/react';

const input = 'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500';

function Field({ label, id, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            {children}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

export default function TicketForm({ form, options, onSubmit, submitLabel, cancelHref }) {
    const { data, setData, errors, processing } = form;
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            {hasErrors && (
                <div role="alert" className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Please fix the highlighted fields and try again.
                </div>
            )}

            <Field label="Title" id="title" error={errors.title}>
                <input id="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className={input} maxLength={255} />
            </Field>

            <Field label="Description" id="description" error={errors.description}>
                <textarea id="description" rows={5} value={data.description} onChange={(e) => setData('description', e.target.value)} className={input} />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <Field label="Priority" id="priority" error={errors.priority}>
                    <select id="priority" value={data.priority} onChange={(e) => setData('priority', e.target.value)} className={input}>
                        {options.priorities.map((o) => <option key={o}>{o}</option>)}
                    </select>
                </Field>
                <Field label="Status" id="status" error={errors.status}>
                    <select id="status" value={data.status} onChange={(e) => setData('status', e.target.value)} className={input}>
                        {options.statuses.map((o) => <option key={o}>{o}</option>)}
                    </select>
                </Field>
                <Field label="Category" id="category" error={errors.category}>
                    <select id="category" value={data.category} onChange={(e) => setData('category', e.target.value)} className={input}>
                        {options.categories.map((o) => <option key={o}>{o}</option>)}
                    </select>
                </Field>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Link href={cancelHref} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Cancel
                </Link>
                <button type="submit" disabled={processing} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">
                    {processing ? 'Saving…' : submitLabel}
                </button>
            </div>
        </form>
    );
}
