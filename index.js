import express from "express";
import session from "express-session";
import ejsLayouts from "express-ejs-layouts";
import path from "path";

import { landings } from "./src/controller/landingController.js";
import * as jobController from "./src/controller/jobController.js";
import authenticationMiddleware from "./src/middlewares/authenticationMiddleware.js";
import * as authController from "./src/controller/authController.js";
const app = express();
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("src", "public")));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.get("/", landings);
app.get("/jobListings", jobController.getAllJobs);
app.get("/register", authController.renderregister);
app.post("/register", authController.register);
app.get("/login", authController.renderLogin);
app.post("/login", authController.login);
app.get("/404", authController.notAllowed);
app.get("/jobDetails/:id", jobController.getJobById);
app.get("/jobDetails/:id/apply", jobController.renderapplyToJob);
app.post("/jobDetails/:id/apply", jobController.applyToJob); // not done here not able to pass id in url
app.get(
  "/jobDetails/:id/applicantList",
  authenticationMiddleware,
  jobController.getAllApplicants
); // not done here applicants list
app.get(
  "/:id/updateJob",
  authenticationMiddleware,
  jobController.renderUpdateForm
);
app.post(
  "/:id/updateJob",
 
  jobController.updateJobHandler
);// rendering 404 insted of job details


app.delete(
  "/:id/deleteJob",
  authenticationMiddleware,
  jobController.deleteJobHandler
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
