const router = require("express").Router();
const contestsController = require("../../controllers/contestController");

// Matches with "/api/contests"
router.route("/")
  .get(contestsController.findAll);

module.exports = router;
