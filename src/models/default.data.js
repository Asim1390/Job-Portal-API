// Importing Job and jobs
import Job, { jobs } from './Job';

import {addApplicantToJob} from './applicant.model.js';
const addApplicantHandler = new addApplicantToJob();
// Creating instances of jobs
const job1 = Job.create({
  jobcategory: 'Software Development',
  jobdesignation: 'Software Engineer',
  joblocation: 'Remote',
  companyname: 'TechCo',
  salary: '10-12lpa',
  applyby: '10-August',
  skillsrequired: 'Web Development',
  numberofopenings: '2',
});

const job2 = Job.create({
  jobcategory: 'Marketing',
  jobdesignation: 'Marketing Specialist',
  joblocation: 'New York',
  companyname: 'MarketingHub',
  salary: '8-10lpa',
  applyby: '18-Feb',
  skillsrequired: 'Communication Skills',
  numberofopenings: '5',
});


addApplicantToJob(job1.id, {
  name: 'John Doe',
  email: 'john@example.com',
  contact: '123456789',
  resumePath: '/path/to/john_resume.pdf',
});

addApplicantToJob(job2.id, {
  name: 'Jane Doe',
  email: 'jane@example.com',
  contact: '987654321',
  resumePath: '/path/to/jane_resume.pdf',
});




