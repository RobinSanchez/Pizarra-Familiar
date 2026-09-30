-- ==============================================================
-- 🏡 PIZARRA FAMILIAR - ESQUEMA DE BASE DE DATOS PARA SUPABASE
-- ==============================================================
-- Pega y ejecuta este script en el "SQL Editor" de tu proyecto en https://supabase.com

-- 1. Crear tabla de actividades y compromisos familiares
create table if not exists public.activities (
  id text primary key,
  title text not null,
  description text,
  assignee text not null,      -- 'papa', 'mama', 'ambos', 'hijos'
  category text not null,      -- 'escuela', 'salud', 'compras', 'traslados', 'hogar', 'ocio'
  date text not null,          -- YYYY-MM-DD
  time text,                   -- HH:mm (opcional)
  duration_minutes integer default 30,
  priority text default 'media', -- 'baja', 'media', 'alta'
  completed boolean default false,
  completed_at text,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Índices para acelerar consultas por fecha y por integrante
create index if not exists idx_activities_date on public.activities(date);
create index if not exists idx_activities_assignee on public.activities(assignee);

-- 3. Habilitar Seguridad a Nivel de Fila (RLS)
alter table public.activities enable row level security;

-- 4. Política para permitir lectura y escritura a los miembros del hogar con la clave pública (anon key)
drop policy if exists "Acceso total para pizarra familiar" on public.activities;
create policy "Acceso total para pizarra familiar"
  on public.activities
  for all
  using (true)
  with check (true);

-- 5. Activar Sincronización en Tiempo Real (Supabase Realtime)
-- Permite que los cambios en un teléfono se reflejen al instante en el otro sin recargar
alter publication supabase_realtime add table public.activities;

-- Listo! Tu base de datos está preparada y sincronizada en tiempo real.
