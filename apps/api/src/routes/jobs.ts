import express from 'express'
import { supabase } from '../lib/supabase'
import fs from 'fs'
import path from 'path'

const router = express.Router()
const jobsFilePath = path.join(process.cwd(), 'jobs-data.json')

// Helper function to read jobs from file
const readJobsFromFile = () => {
  try {
    if (fs.existsSync(jobsFilePath)) {
      const data = fs.readFileSync(jobsFilePath, 'utf8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading jobs file:', error)
    return []
  }
}

// Helper function to write jobs to file
const writeJobsToFile = (jobs: any[]) => {
  try {
    fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2))
  } catch (error) {
    console.error('Error writing jobs file:', error)
  }
}

// GET all jobs
router.get('/', async (req, res) => {
  try {
    // Try Supabase first
    const { data: jobs, error } = await supabase
      .from('Job')
      .select('*')
      .order('createdAt', { ascending: false })

    if (!error && jobs) {
      return res.json(jobs)
    }

    // Fallback to file storage
    console.log('Using file storage for jobs')
    const fileJobs = readJobsFromFile()
    res.json(fileJobs)
  } catch (error) {
    console.error('Jobs fetch error:', error)
    // Fallback to file storage
    const fileJobs = readJobsFromFile()
    res.json(fileJobs)
  }
})

// GET active jobs only
router.get('/active', async (req, res) => {
  try {
    // Try Supabase first
    const { data: jobs, error } = await supabase
      .from('Job')
      .select('*')
      .eq('isActive', true)
      .order('createdAt', { ascending: false })

    if (!error && jobs) {
      // Add application counts for each job
      const jobsWithCounts = await Promise.all(jobs.map(async (job: any) => {
        try {
          // Count applications for this job from Supabase
          const { count: dbCount, error: countError } = await supabase
            .from('Application')
            .select('*', { count: 'exact', head: true })
            .eq('jobId', job.id)

          if (!countError) {
            return { ...job, applications: dbCount || 0 }
          }
        } catch (countError) {
          console.error('Error counting applications for job:', job.id, countError)
        }

        // Fallback: count from file storage
        try {
          const applicationsFile = path.resolve(process.cwd(), 'applications.json')
          if (fs.existsSync(applicationsFile)) {
            const data = fs.readFileSync(applicationsFile, 'utf8')
            const applications = JSON.parse(data)
            const jobApplications = applications.filter((app: any) =>
              app.position === job.title && app.department === job.department
            )
            return { ...job, applications: jobApplications.length }
          }
        } catch (fileError) {
          console.error('Error reading applications file:', fileError)
        }

        return { ...job, applications: 0 }
      }))

      return res.json(jobsWithCounts)
    }

    // Fallback to file storage
    const fileJobs = readJobsFromFile()
    const activeJobs = fileJobs.filter((job: any) => job.isActive !== false)

    // Add application counts for file-based jobs
    const jobsWithCounts = activeJobs.map((job: any) => {
      try {
        const applicationsFile = path.resolve(process.cwd(), 'applications.json')
        if (fs.existsSync(applicationsFile)) {
          const data = fs.readFileSync(applicationsFile, 'utf8')
          const applications = JSON.parse(data)
          const jobApplications = applications.filter((app: any) =>
            app.position === job.title && app.department === job.department
          )
          return { ...job, applications: jobApplications.length }
        }
      } catch (fileError) {
        console.error('Error reading applications file:', fileError)
      }
      return { ...job, applications: 0 }
    })

    res.json(jobsWithCounts)
  } catch (error) {
    console.error('Active jobs fetch error:', error)
    // Fallback to file storage
    const fileJobs = readJobsFromFile()
    const activeJobs = fileJobs.filter((job: any) => job.isActive !== false)

    // Add application counts for file-based jobs
    const jobsWithCounts = activeJobs.map((job: any) => {
      try {
        const applicationsFile = path.resolve(process.cwd(), 'applications.json')
        if (fs.existsSync(applicationsFile)) {
          const data = fs.readFileSync(applicationsFile, 'utf8')
          const applications = JSON.parse(data)
          const jobApplications = applications.filter((app: any) =>
            app.position === job.title && app.department === job.department
          )
          return { ...job, applications: jobApplications.length }
        }
      } catch (fileError) {
        console.error('Error reading applications file:', fileError)
      }
      return { ...job, applications: 0 }
    })

    res.json(jobsWithCounts)
  }
})

// GET job by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { data: job, error } = await supabase
      .from('Job')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Job fetch error:', error)
      return res.status(500).json({ error: 'Failed to fetch job' })
    }

    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }

    res.json(job)
  } catch (error) {
    console.error('Job fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch job' })
  }
})

// POST create new job
router.post('/', async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      description,
      requirements,
      responsibilities,
      salary,
      benefits,
      applicationDeadline,
      isActive
    } = req.body

    // Try Supabase first
    const { data: job, error } = await supabase
      .from('Job')
      .insert({
        title,
        department,
        location,
        type,
        description,
        requirements,
        responsibilities,
        salary,
        benefits,
        applicationDeadline,
        isActive: isActive !== undefined ? isActive : true
      })
      .select()
      .single()

    if (!error && job) {
      return res.json(job)
    }

    // Fallback to file storage
    console.log('Using file storage for job creation')
    const newJob = {
      id: Date.now().toString(),
      title,
      department,
      location,
      type: type || 'full-time',
      description,
      requirements,
      responsibilities,
      salary,
      benefits,
      applicationDeadline,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const jobs = readJobsFromFile()
    jobs.unshift(newJob) // Add to beginning
    writeJobsToFile(jobs)

    res.json(newJob)
  } catch (error) {
    console.error('Job creation error:', error)
    res.status(500).json({ error: 'Failed to create job' })
  }
})

// PUT update job
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      department,
      location,
      type,
      description,
      requirements,
      responsibilities,
      salary,
      benefits,
      applicationDeadline,
      isActive
    } = req.body

    // Try Supabase first
    const { data: job, error } = await supabase
      .from('Job')
      .update({
        title,
        department,
        location,
        type,
        description,
        requirements,
        responsibilities,
        salary,
        benefits,
        applicationDeadline,
        isActive
      })
      .eq('id', id)
      .select()
      .single()

    if (!error && job) {
      return res.json(job)
    }

    // Fallback to file storage
    console.log('Using file storage for job update')
    const jobs = readJobsFromFile()
    const jobIndex = jobs.findIndex((j: any) => j.id === id)

    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' })
    }

    const updatedJob = {
      ...jobs[jobIndex],
      title,
      department,
      location,
      type,
      description,
      requirements,
      responsibilities,
      salary,
      benefits,
      applicationDeadline,
      isActive,
      updatedAt: new Date().toISOString()
    }

    jobs[jobIndex] = updatedJob
    writeJobsToFile(jobs)

    res.json(updatedJob)
  } catch (error) {
    console.error('Job update error:', error)
    res.status(500).json({ error: 'Failed to update job' })
  }
})

// DELETE job
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Try Supabase first
    const { error } = await supabase
      .from('Job')
      .delete()
      .eq('id', id)

    if (!error) {
      return res.json({ message: 'Job deleted successfully' })
    }

    // Fallback to file storage
    console.log('Using file storage for job deletion')
    const jobs = readJobsFromFile()
    const filteredJobs = jobs.filter((j: any) => j.id !== id)

    if (filteredJobs.length === jobs.length) {
      return res.status(404).json({ error: 'Job not found' })
    }

    writeJobsToFile(filteredJobs)
    res.json({ message: 'Job deleted successfully' })
  } catch (error) {
    console.error('Job deletion error:', error)
    res.status(500).json({ error: 'Failed to delete job' })
  }
})

// POST increment job view count
router.post('/:id/view', async (req, res) => {
  try {
    const { id } = req.params

    // Try Supabase first
    const { data: currentJob, error: fetchError } = await supabase
      .from('Job')
      .select('views')
      .eq('id', id)
      .single()

    if (!fetchError && currentJob) {
      const newViews = (currentJob.views || 0) + 1
      const { data: job, error } = await supabase
        .from('Job')
        .update({ views: newViews })
        .eq('id', id)
        .select()
        .single()

      if (!error && job) {
        return res.json({ views: newViews })
      }
    }

    // Fallback to file storage
    console.log('Using file storage for job view tracking')
    const jobs = readJobsFromFile()
    const jobIndex = jobs.findIndex((j: any) => j.id === id)

    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' })
    }

    const currentViews = jobs[jobIndex].views || 0
    jobs[jobIndex].views = currentViews + 1
    jobs[jobIndex].updatedAt = new Date().toISOString()

    writeJobsToFile(jobs)
    res.json({ views: jobs[jobIndex].views })
  } catch (error) {
    console.error('Job view tracking error:', error)
    res.status(500).json({ error: 'Failed to track job view' })
  }
})

// PUT toggle job active status
router.put('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params

    // Try Supabase first
    const { data: currentJob, error: fetchError } = await supabase
      .from('Job')
      .select('isActive')
      .eq('id', id)
      .single()

    if (!fetchError && currentJob) {
      const newStatus = !currentJob.isActive
      const { data: job, error } = await supabase
        .from('Job')
        .update({ isActive: newStatus })
        .eq('id', id)
        .select()
        .single()

      if (!error && job) {
        return res.json(job)
      }
    }

    // Fallback to file storage
    console.log('Using file storage for job status toggle')
    const jobs = readJobsFromFile()
    const jobIndex = jobs.findIndex((j: any) => j.id === id)

    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' })
    }

    const currentStatus = jobs[jobIndex].isActive
    jobs[jobIndex].isActive = !currentStatus
    jobs[jobIndex].updatedAt = new Date().toISOString()

    writeJobsToFile(jobs)
    res.json(jobs[jobIndex])
  } catch (error) {
    console.error('Job status toggle error:', error)
    res.status(500).json({ error: 'Failed to toggle job status' })
  }
})

export { router as jobsRouter }