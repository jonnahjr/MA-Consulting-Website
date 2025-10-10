import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: './.env' })

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testDatabase() {
  console.log('🔍 Testing Supabase Database Connection...\n')

  try {
    // Test connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('Job')
      .select('count', { count: 'exact', head: true })

    if (connectionError) {
      console.error('❌ Job table does not exist or connection failed:')
      console.error('Error:', connectionError.message)
      console.log('\n📋 SOLUTION: Run this SQL in your Supabase SQL Editor:')
      console.log('https://supabase.com/dashboard/project/kgokqftntqszjnwsaegj/sql')
      console.log('\nCopy and paste the contents of supabase-migration.sql')
      return
    }

    console.log('✅ Job table exists!')
    console.log(`📊 Current job count: ${connectionTest}`)

    // Test inserting a sample job
    console.log('\n🧪 Testing job creation...')
    const testJob = {
      title: 'Test Job Position',
      department: 'Information Technology',
      location: 'Addis Ababa, Ethiopia',
      type: 'full-time',
      description: 'This is a test job posting.',
      requirements: 'Test requirements',
      responsibilities: 'Test responsibilities',
      isActive: false // Don't show on website
    }

    const { data: insertedJob, error: insertError } = await supabase
      .from('Job')
      .insert(testJob)
      .select()
      .single()

    if (insertError) {
      console.error('❌ Failed to insert test job:', insertError.message)
      return
    }

    console.log('✅ Test job created successfully!')
    console.log('📝 Job ID:', insertedJob.id)
    console.log('🏷️ Title:', insertedJob.title)

    // Clean up test job
    const { error: deleteError } = await supabase
      .from('Job')
      .delete()
      .eq('id', insertedJob.id)

    if (deleteError) {
      console.log('⚠️ Could not delete test job, but creation worked')
    } else {
      console.log('🧹 Test job cleaned up')
    }

    console.log('\n🎉 SUCCESS: Job posting system is ready!')
    console.log('You can now create jobs in the admin panel.')

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

testDatabase()