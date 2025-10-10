import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: './.env' })

// Use the service role key for admin operations
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Make sure you have SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createJobTable() {
  console.log('🔧 Creating Job table in Supabase...\n')

  try {
    // First, let's check if we can access the database
    console.log('📡 Testing database connection...')
    const { data: testData, error: testError } = await supabase
      .from('User')
      .select('count', { count: 'exact', head: true })

    if (testError) {
      console.error('❌ Database connection failed:', testError.message)
      console.log('\n🔑 SOLUTION: Make sure your SUPABASE_SERVICE_ROLE_KEY is correct')
      console.log('Get it from: Supabase Dashboard → Settings → API → service_role key')
      return
    }

    console.log('✅ Database connection successful')

    // Create the Job table using raw SQL
    console.log('🏗️ Creating Job table...')

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS "Job" (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        title TEXT NOT NULL,
        department TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT DEFAULT 'full-time',
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        responsibilities TEXT NOT NULL,
        salary TEXT,
        benefits TEXT,
        "applicationDeadline" DATE,
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Execute the SQL using Supabase's rpc function
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: createTableSQL
    })

    if (createError) {
      console.log('⚠️ RPC method not available, trying direct approach...')

      // Alternative: Try to create a test record to see if table exists
      const { error: insertError } = await supabase
        .from('Job')
        .insert({
          title: 'Test Job',
          department: 'Test Department',
          location: 'Test Location',
          description: 'Test Description',
          requirements: 'Test Requirements',
          responsibilities: 'Test Responsibilities',
          isActive: false
        })

      if (insertError && insertError.code === 'PGRST205') {
        console.error('❌ Job table does not exist and cannot be created with current permissions')
        console.log('\n🛠️ MANUAL SOLUTION:')
        console.log('1. Go to https://supabase.com/dashboard')
        console.log('2. Select your project')
        console.log('3. Click "SQL Editor"')
        console.log('4. Run this SQL:')
        console.log(`
CREATE TABLE IF NOT EXISTS "Job" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT DEFAULT 'full-time',
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  responsibilities TEXT NOT NULL,
  salary TEXT,
  benefits TEXT,
  "applicationDeadline" DATE,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on Job" ON "Job";
CREATE POLICY "Allow all operations on Job" ON "Job" FOR ALL USING (true);
        `)
        return
      } else if (insertError) {
        console.error('❌ Unexpected error:', insertError.message)
        return
      } else {
        console.log('✅ Job table exists! Cleaning up test record...')
        // Clean up the test record
        await supabase.from('Job').delete().eq('title', 'Test Job')
      }
    }

    // Enable RLS and create policy
    console.log('🔒 Setting up security policies...')

    const rlsSQL = `
      ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow all operations on Job" ON "Job";
      CREATE POLICY "Allow all operations on Job" ON "Job" FOR ALL USING (true);
    `

    const { error: rlsError } = await supabase.rpc('exec_sql', { sql: rlsSQL })

    if (rlsError) {
      console.log('⚠️ Could not set RLS via RPC, but table should work')
    }

    // Test the table
    console.log('🧪 Testing Job table...')
    const { data: testJob, error: testJobError } = await supabase
      .from('Job')
      .insert({
        title: 'Sample Job Posting',
        department: 'Information Technology',
        location: 'Addis Ababa, Ethiopia',
        type: 'full-time',
        description: 'This is a sample job posting to test the system.',
        requirements: 'Bachelor degree, 2+ years experience',
        responsibilities: 'Develop software solutions, collaborate with team',
        isActive: false // Don't show on website
      })
      .select()
      .single()

    if (testJobError) {
      console.error('❌ Failed to create test job:', testJobError.message)
      return
    }

    console.log('✅ Test job created successfully!')
    console.log('📝 Job ID:', testJob.id)

    // Clean up
    await supabase.from('Job').delete().eq('id', testJob.id)
    console.log('🧹 Test job cleaned up')

    console.log('\n🎉 SUCCESS: Job table is ready!')
    console.log('You can now create job postings in the admin panel.')

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

createJobTable()