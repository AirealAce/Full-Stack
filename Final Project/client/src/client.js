import { createClient } from '@supabase/supabase-js'

const URL = 'https://ydptdnkzhdienrnvlhqs.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcHRkbmt6aGRpZW5ybnZsaHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDE3NTAsImV4cCI6MjAyODUxNzc1MH0.8UnlxA1kMEM-6NGlYS0m0K7mtnQgcbeXl4yfc_-ZMv0'

export const supabase = createClient(URL, API_KEY);