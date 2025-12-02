import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// --- Integración de Supabase ---
// NOTA: Para fines de demostración, las credenciales de Supabase se proporcionan aquí.
// En un entorno de producción, estas deben almacenarse de forma segura en variables de entorno
// y acceder a ellas a través de `process.env.VITE_SUPABASE_URL` y `process.env.VITE_SUPABASE_ANON_KEY`.
const supabaseUrl = 'https://cspnkekodmaqexznksjs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcG5rZWtvZG1hcWV4em5rc2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MzQ1ODUsImV4cCI6MjA4MDIxMDU4NX0.Kvi9XN8M7iSIK4jKOPeZVvVPu5PyaLbf6vM2OTdj17s';

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
    try {
        supabase = createClient(supabaseUrl, supabaseAnonKey);
    } catch (error) {
        console.error("Error initializing Supabase client:", error);
    }
} else {
    // Es poco probable que este bloque else se active ahora, pero se mantiene por robustez.
    console.error("La URL de Supabase y la clave anónima son necesarias pero no se encontraron.");
}

export { supabase };