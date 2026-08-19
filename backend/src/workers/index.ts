import { Worker, Job as BullJob } from 'bullmq';
import { redisConnection } from '../utils/queue';
import { prisma } from '../utils/prisma';
import { parseResume, analyzeJobDescription, generateEmbedding } from '../utils/ai';

console.log('👷 BullMQ Workers started');

// ---------------------------------------------------------------------------
// Resume Worker
// ---------------------------------------------------------------------------
export const resumeWorker = new Worker(
  'ResumeQueue',
  async (job: BullJob) => {
    console.log(`Processing Resume Job: ${job.id}`);
    const { rawText, userId, originalName } = job.data;

    // 1. Parse with AI
    const parsedData = await parseResume(rawText);

    // 2. Find candidate profile
    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: { userId }
    });

    if (!candidateProfile) {
      throw new Error('Candidate profile not found');
    }

    // 3. Save to Database
    const resume = await prisma.resume.create({
      data: {
        candidateId: candidateProfile.id,
        fileName: originalName || 'Uploaded_Resume.txt',
        fileUrl: 'local',
        extractedText: rawText,
        parsedData: parsedData as any,
        processingStatus: 'COMPLETED'
      }
    });

    const embedding = await generateEmbedding(rawText);
    await prisma.$executeRaw`UPDATE "Resume" SET embedding = ${JSON.stringify(embedding)}::vector WHERE id = ${resume.id}`;


    // 4. Update candidate profile with extracted skills if needed
    await prisma.candidateProfile.update({
      where: { id: candidateProfile.id },
      data: {
        skills: parsedData.skills || [],
        experience: parsedData.experience as any,
        education: parsedData.education as any
      }
    });

    console.log(`Resume Job ${job.id} completed successfully`);
    return { resume, parsedData };
  },
  { connection: redisConnection, concurrency: 5 }
);

// ---------------------------------------------------------------------------
// Job Description Worker
// ---------------------------------------------------------------------------
export const jobDescriptionWorker = new Worker(
  'JobQueue',
  async (job: BullJob) => {
    console.log(`Processing JobDescription Job: ${job.id}`);
    const { text, title, userId } = job.data;

    // Find recruiter profile
    const recruiterProfile = await prisma.recruiterProfile.findUnique({
      where: { userId }
    });

    if (!recruiterProfile) {
      throw new Error('Recruiter profile not found');
    }

    // Parse with AI
    const analyzedData = await analyzeJobDescription(text);

    // Save to Database
    const createdJob = await prisma.job.create({
      data: {
        recruiterId: recruiterProfile.id,
        title: title || "Untitled Job",
        company: recruiterProfile.companyName,
        description: text,
        requirements: analyzedData.coreRequirements || [],
        preferredSkills: analyzedData.niceToHaves || [],
        status: "OPEN"
      }
    });

    const embedding = await generateEmbedding(text);
    await prisma.$executeRaw`UPDATE "Job" SET embedding = ${JSON.stringify(embedding)}::vector WHERE id = ${createdJob.id}`;


    console.log(`JobDescription Job ${job.id} completed successfully`);
    return { job: createdJob, analyzedData };
  },
  { connection: redisConnection, concurrency: 5 }
);

resumeWorker.on('failed', (job, err) => {
  console.error(`Resume Job ${job?.id} failed:`, err.message);
});

jobDescriptionWorker.on('failed', (job, err) => {
  console.error(`JobDescription Job ${job?.id} failed:`, err.message);
});
