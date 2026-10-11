import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';

export default function Create({ options }) {
    const form = useForm({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        category: options.categories[0],
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-900">New Ticket</h1>}>
            <Head title="New Ticket" />
            <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
                <TicketForm form={form} options={options} onSubmit={submit} submitLabel="Create ticket" cancelHref={route('tickets.index')} />
            </div>
        </AuthenticatedLayout>
    );
}
