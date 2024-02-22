import User from "../models/User.js";
import Jobs from "../models/Job.js";
export const renderregister = (req, res) => {
  res.render("register");
};

// Implement user registration logic
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });
  req.session.userName = name;
  res.render("jobListings" , { Jobs });
};

// Render login page
export const renderLogin = (req, res) => {
  res.render("login");
};

// Implement user login logic
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Set user session
    req.session.user = user;

    res.redirect("jobListings"); // Redirect to job listings after login
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Implement user logout logic
export const logout = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.redirect("/"); // Redirect to home or login page after logout
    }
  });
};
export const notAllowed = (req, res) => {
  res.render("404");
};
