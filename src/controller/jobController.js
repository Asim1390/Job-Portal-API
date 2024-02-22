import { addApplicantToJob } from "../models/applicant.model.js"; // Import the in-memory data and functions
import Jobs from "../models/Job.js";
import multerMiddleware from "../middlewares/multerMiddleware.js";

export const getAllJobs = (req, res) => {
  try {
    // Use the in-memory jobs array instead of querying the database
    res.render("jobListings", { Jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getJobById = (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10); // Convert the id to an integer
    const job = Jobs.jobList.find((j) => j.id === jobId);

    if (!job) {
      return res.status(404).render("404");
    }

    res.render("jobDetails", { job }); // Pass the specific job object
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const renderapplyToJob = (req, res) => {
  res.render("apply", { Jobs });
};

export const applyToJob = (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10); // Convert the id to an integer
    const job = Jobs.jobList.find((j) => j.id === jobId); // Access the jobList property

    if (!job) {
      return res.status(404).render("404");
    }

    // Use multer middleware to handle file upload
    multerMiddleware(req, res, async (err) => {
      if (err) {
        console.log("multerMiddleware error", err);
        return res.status(400).json({ error: err });
      }

      const { name, email, contact } = req.body;

      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: "Resume file is required" });
      }

      const resumeFileName = req.file.filename;
      const resumePath = path.join("uploads/", resumeFileName);

      // Your logic to add the applicant to the job with the resume path
      const newApplicant = addApplicantToJob(jobId, {
        name,
        email,
        contact,
        resumePath,
      });

      if (!newApplicant) {
        console.log("failed to add applicant job");
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Dynamically construct the correct form action URL
      const formActionUrl = `/jobDetails/${jobId}/apply`;

      res.render("apply", { job, applicant: newApplicant, formActionUrl });
    });
  } catch (error) {
    console.log("unexpected error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const createJob = (jobData) => {
  const newJob = {
    id: Jobs.length + 1,
    ...jobData,
    applicants: [],
  };

  Jobs.push(newJob);
  return newJob;
};



// Function to update a job
const updateJob = (jobId, updatedJobData) => {
  const jobIndex = Jobs.jobList.findIndex((j) => j.id === jobId);

  if (jobIndex !== -1) {
    const updatedJob = { ...Jobs.jobList[jobIndex], ...updatedJobData };

    Jobs.jobList[jobIndex] = updatedJob;

    return updatedJob;
  }

  return null; // Job not found
};


// Function to delete a job
const deleteJob = (jobId) => {
  const jobIndex = Jobs.findIndex((job) => job.id === jobId);

  if (jobIndex !== -1) {
    const deletedJob = Jobs.splice(jobIndex, 1);
    return deletedJob[0];
  }

  return null; // Job not found
};

// Function to get all applicants for a specific job
const getAllApplicants = (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10);
    const job = Jobs.jobList.find((j) => j.id === jobId);

    if (!job) {
      return res.status(404).render("404");
    }

    const applicants = job.applicants;
    return res.render("applicantList", { applicants });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// Function to update an applicant for a specific job
const updateApplicant = (req, res) => {
  try {
    const jobId = parseInt(req.params.jobId, 10);
    const applicantId = parseInt(req.params.applicantId, 10);
    const updatedApplicantData = req.body;

    const updatedApplicant = updateApplicant(
      jobId,
      applicantId,
      updatedApplicantData
    );

    if (!updatedApplicant) {
      return res.status(404).render("404");
    }

    return res.render("applicantDetails", { applicant: updatedApplicant });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteApplicant = (req, res) => {
  try {
    const jobId = parseInt(req.params.jobId, 10);
    const applicantId = parseInt(req.params.applicantId, 10);

    const deletedApplicant = deleteApplicant(jobId, applicantId);

    if (!deletedApplicant) {
      return res.status(404).render("404");
    }

    return res.render("applicantDeleted", { applicant: deletedApplicant });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// Render the update form for a specific job
const renderUpdateForm = (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10);
    const job = Jobs.jobList.find((j) => j.id === jobId);

    if (!job) {
      return res.status(404).render("404");
    }

    res.render("updateJob", { job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateJobHandler = (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10);
    const job = Jobs.jobList.find((j) => j.id === jobId);

    if (!job) {
      return res.status(404).render("404");
    }

    const {
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
    } = req.body;

    const updatedSkillsRequired = skillsrequired && typeof skillsrequired === 'string'
      ? skillsrequired.split(",").map((skill) => skill.trim())
      : skillsrequired;

    const updatedJob = updateJob(jobId, {
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired: updatedSkillsRequired,
      numberofopenings,
    });

    if (!updatedJob) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    
    res.redirect(`/jobListings`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteJobHandler = (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10);
    const deletedJob = deleteJob(jobId);

    if (!deletedJob) {
      return res.status(404).render("404");
    }

    res.render("jobDetails", { job: deletedJob }); // You can create a separate view for job deletion success
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addApplicant = (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10);
    const job = Jobs.find((j) => j.id === jobId);

    if (!job) {
      return res.status(404).render("404");
    }

    const { name, email, contact, resumePath } = req.body;

    const newApplicant = addApplicantToJob(jobId, {
      name,
      email,
      contact,
      resumePath,
    });

    if (!newApplicant) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.render("applicationSuccess", { job, applicant: newApplicant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Export all the functions
export {
  createJob,
  updateJob,
  deleteJob,
  getAllApplicants,
  updateApplicant,
  deleteApplicant,
  renderUpdateForm,
  updateJobHandler,
  deleteJobHandler,
  addApplicant,
};
