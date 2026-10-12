<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /** Idempotent: safe to run on every deploy. */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'jp@gmail.com'],
            ['name' => 'jp', 'password' => Hash::make('123456789')]
        );

        if ($user->tickets()->doesntExist()) {
            $user->tickets()->createMany([
                ['title' => 'Printer on 2nd floor is offline', 'description' => 'The shared printer shows offline for everyone since this morning.', 'priority' => 'High', 'status' => 'Open', 'category' => 'Hardware'],
                ['title' => 'Cannot reset my email password', 'description' => 'The reset link expires immediately when I open it.', 'priority' => 'Urgent', 'status' => 'In Progress', 'category' => 'Account'],
                ['title' => 'Install design software license', 'description' => 'New hire needs the design suite installed and licensed.', 'priority' => 'Low', 'status' => 'Resolved', 'category' => 'Software'],
                ['title' => 'Office Wi-Fi drops every hour', 'description' => 'Connection drops for about a minute at the top of each hour.', 'priority' => 'Medium', 'status' => 'Open', 'category' => 'Network'],
            ]);
        }
    }
}
