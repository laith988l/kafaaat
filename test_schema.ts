import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function run() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  // Test 1: Fetch 1 row to see what columns exist
  console.log('--- Test 1: Fetching 1 row to check columns ---')
  const { data: rows, error: fetchErr } = await supabase.from('inquiries').select('*').limit(1)
  if (fetchErr) {
    console.error('Fetch error:', fetchErr)
  } else {
    if (rows && rows.length > 0) {
      console.log('Columns found:', Object.keys(rows[0]))
    } else {
      console.log('No rows found in table. Cannot infer columns from data.')
    }
  }

  // Test 2: Actually try to add the column if missing
  console.log('--- Test 2: SQL RPC to add status column ---')
  const { data: rpcData, error: rpcErr } = await supabase.rpc('exec_sql', {
    sql_string: "ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';"
  })
  if (rpcErr) {
    console.error('Failed to add column using exec_sql (maybe RPC not created):', rpcErr.message)
    console.log('We will need the user to run the SQL in their Supabase dashboard.')
  } else {
    console.log('Added column successfully:', rpcData)
  }

}

run()
