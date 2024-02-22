class Applicant {
  constructor({ name, email, contact, resumePath }) {
    this.id = Applicant.incrementId();
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumePath = resumePath;
  }

  static incrementId() {
    if (!Applicant.latestId) {
      Applicant.latestId = 1;
    } else {
      Applicant.latestId++;
    }
    return Applicant.latestId;
  }
}
class Jobs {
  constructor({
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
  }) {
    this.id = Jobs.incrementId();
    this.jobcategory = jobcategory;
    this.jobdesignation = jobdesignation;
    this.joblocation = joblocation;
    this.companyname = companyname;
    this.salary = salary;
    this.applyby = applyby;
    this.skillsrequired = skillsrequired;
    this.numberofopenings = numberofopenings;
    this.jobposted = new Date();
    this.applicants = [];
  }

  static incrementId() {
    if (!Jobs.latestId) {
      Jobs.latestId = 1;
    } else {
      Jobs.latestId++;
    }
    return Jobs.latestId;
  }

  static create(jobData) {
    const newJob = new Jobs(jobData);
    Jobs.jobList.push(newJob);
    return newJob;
  }
  
  applyToJob(applicantData) {
    const newApplicant = new Applicant(applicantData);
    this.applicants.push(newApplicant);
    return newApplicant;
  }
}

// In-memory data structures
Jobs.jobList = [];

export default Jobs;

// Usage example
const job1 = Jobs.create({
  jobcategory: 'Software Development',
  jobdesignation: 'Software Engineer',
  joblocation: 'Remote',
  companyname: 'TechCo',
  salary: '10-12lpa',
  applyby: '10-August',
  skillsrequired: 'Web Development',
  numberofopenings: '2',
});

const job2 = Jobs.create({
  jobcategory: 'Marketing',
  jobdesignation: 'Marketing Specialist',
  joblocation: 'New York',
  companyname: 'MarketingHub',
  salary: '8-10lpa',
  applyby: '18-Feb',
  skillsrequired: 'Communication Skills',
  numberofopenings: '5',
});
