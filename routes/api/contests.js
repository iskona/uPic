const router = require("express").Router();
const contestsController = require("../../controllers/contestController");

// Matches with "/api/contests"
router.route("/contests")
  .get(contestsController.findAll);

router.route("/hostevents")
  .post(contestsController.create)


module.exports = router;
