import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';

export default function Edit({ ticket, options }) {
    const form = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('tickets.update', ticket.id));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-900">Edit Ticket</h1>}>
            <Head title="Edit Ticket" />
            <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
                <TicketForm form={form} options={options} onSubmit={submit} submitLabel="Save changes" cancelHref={route('tickets.show', ticket.id)} />
            </div>
        </AuthenticatedLayout>
    );
}
