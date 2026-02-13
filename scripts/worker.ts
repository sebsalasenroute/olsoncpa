import { Worker } from "bullmq";
import { redisConnection } from "../app/lib/jobs/queue";
import { processClassificationJob, processExtractionJob } from "../app/lib/jobs/processors";
import type { ClassificationJobPayload, ExtractionJobPayload } from "../app/lib/jobs/types";

const extractionWorker = new Worker<ExtractionJobPayload>(
  "extraction",
  async (job) => {
    return processExtractionJob(job.data);
  },
  { connection: redisConnection }
);

const classificationWorker = new Worker<ClassificationJobPayload>(
  "classification",
  async (job) => {
    return processClassificationJob(job.data);
  },
  { connection: redisConnection }
);

extractionWorker.on("completed", (job) => {
  // eslint-disable-next-line no-console
  console.log(`Extraction job completed: ${job.id}`);
});

classificationWorker.on("completed", (job) => {
  // eslint-disable-next-line no-console
  console.log(`Classification job completed: ${job.id}`);
});

for (const w of [extractionWorker, classificationWorker]) {
  w.on("failed", (job, err) => {
    // eslint-disable-next-line no-console
    console.error(`Worker failure for job ${job?.id}`, err);
  });
}

process.on("SIGTERM", async () => {
  await extractionWorker.close();
  await classificationWorker.close();
  process.exit(0);
});
