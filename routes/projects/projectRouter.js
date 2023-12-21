const express = require("express");
const router = express.Router();
const projectCtrl = require("../../controllers/projects.controller");
const auth = require("../../middleware/auth");

router.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

router.get("/", projectCtrl.getAllProjects);

router.post("/create", projectCtrl.createProject);

router.delete("/:id/delete", projectCtrl.deleteProject);

// updated project
router.put("/:id/update", projectCtrl.updateProject);

module.exports = router;
