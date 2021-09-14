import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class JobsService {
  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId).populate('creator', 'name picture')
    if (!job) {
      throw new BadRequest('Invalid Job Id')
    }
    return job
  }

  async editJob(jobId, userId, jobData) {
    const job = await this.getJobById(jobId)
    if (userId !== job.creatorId.toString()) {
      throw new Forbidden('You shall not passssss!!!!!')
    }
    job.bedroom = jobData.bedroom || job.bedroom
    job.bathroom = jobData.bathroom || job.bathroom
    job.levels = jobData.levels || job.levels
    job.rate = jobData.rate || job.rate
    job.year = jobData.year || job.year
    job.description = jobData.description || job.description
    job.img = jobData.img || job.img
    await job.save()
    return job
  }

  async removeJob(jobId, userId) {
    const job = await this.getJobById(jobId)
    if (userId !== job.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    await job.remove()
    return job
  }

  async createJob(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }

  async getJobs(query) {
    const jobs = await dbContext.Jobs.find(query).populate('creator', 'name picture')
    return jobs
  }
}

export const jobsService = new JobsService()
