export const landings = (req, res) => {
    try {
      res.render("landing");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };