import { createClient } from '@supabase/supabase-js'

const URL = 'https://lenltelfqznigwhfxacu.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxlbmx0ZWxmcXpuaWd3aGZ4YWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwNzc4ODUsImV4cCI6MjAyODY1Mzg4NX0.nfOC_bLhDEI4GueZ_nYHZ1xJIGoodixeUeVMwdTM_cI';

export const supabase = createClient(URL, API_KEY);