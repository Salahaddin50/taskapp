-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create enum types
create type priority_level as enum ('low', 'medium', 'high');

-- Create tables
create table public.users (
    id uuid primary key default uuid_generate_v4(),
    email text unique not null,
    name text not null,
    password_hash text not null,
    profile jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.targets (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text not null,
    category_id text not null,
    subcategory_id text not null,
    progress integer default 0 not null,
    user_id uuid references public.users(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.actions (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    urgency priority_level not null,
    impact priority_level not null,
    progress integer default 0 not null,
    target_id uuid references public.targets(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.steps (
    id uuid primary key default uuid_generate_v4(),
    description text not null,
    completed boolean default false not null,
    progress integer default 0 not null,
    action_id uuid references public.actions(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.tasks (
    id uuid primary key default uuid_generate_v4(),
    description text not null,
    completed boolean default false not null,
    deadline timestamp with time zone,
    step_id uuid references public.steps(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.obstacles (
    id uuid primary key default uuid_generate_v4(),
    description text not null,
    resolved boolean default false not null,
    resolution text,
    resolution_date timestamp with time zone,
    suggested_resolutions text[],
    action_id uuid references public.actions(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.favorites (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    target_id uuid references public.targets(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, target_id)
);

create table public.conversations (
    id uuid primary key default uuid_generate_v4(),
    user1_id uuid references public.users(id) on delete cascade not null,
    user2_id uuid references public.users(id) on delete cascade not null,
    target_id uuid references public.targets(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_message_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.messages (
    id uuid primary key default uuid_generate_v4(),
    conversation_id uuid references public.conversations(id) on delete cascade not null,
    sender_id uuid references public.users(id) on delete cascade not null,
    content text not null,
    read_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index targets_user_id_idx on public.targets(user_id);
create index actions_target_id_idx on public.actions(target_id);
create index steps_action_id_idx on public.steps(action_id);
create index tasks_step_id_idx on public.tasks(step_id);
create index obstacles_action_id_idx on public.obstacles(action_id);
create index favorites_user_id_idx on public.favorites(user_id);
create index favorites_target_id_idx on public.favorites(target_id);
create index conversations_user1_id_idx on public.conversations(user1_id);
create index conversations_user2_id_idx on public.conversations(user2_id);
create index messages_conversation_id_idx on public.messages(conversation_id);
create index messages_sender_id_idx on public.messages(sender_id);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.targets enable row level security;
alter table public.actions enable row level security;
alter table public.steps enable row level security;
alter table public.tasks enable row level security;
alter table public.obstacles enable row level security;
alter table public.favorites enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Create RLS policies
create policy "Users can read their own data"
    on public.users for select
    using (auth.uid() = id);

create policy "Users can read all targets"
    on public.targets for select
    using (true);

create policy "Users can create and modify their own targets"
    on public.targets for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Similar policies for other tables...