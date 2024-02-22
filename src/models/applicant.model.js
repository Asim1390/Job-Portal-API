// Function to add an applicant to a job
import Jobs  from "./Job.js";
// Function to add an applicant to a job
export const addApplicantToJob = (jobId, applicantData) => {
  const job = Jobs.jobList.find((j) => j.id === jobId);

  if (job) {
    const newApplicant = job.applyToJob(applicantData);
    return newApplicant;
  }

  return null; // Job not found
};
