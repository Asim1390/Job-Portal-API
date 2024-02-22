export const validateJobForm = (req, res, next) => {
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

  // Check if required fields are present
  if (
    !jobcategory ||
    !jobdesignation ||
    !joblocation ||
    !companyname ||
    !salary ||
    !applyby ||
    !skillsrequired ||
    !numberofopenings
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Add additional validation checks as needed

  // Pass control to the next middleware or route handler if validation passes
  next();
};

export const validateApplicantForm = (req, res, next) => {
  const { name, email, contact, resume } = req.body;

  // Check if required fields are present
  if (!name || !email || !contact || !resume) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Add additional validation checks as needed

  // Pass control to the next middleware or route handler if validation passes
  next();
};
