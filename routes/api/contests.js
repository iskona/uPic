const router = require("express").Router();
const contestsController = require("../../controllers/contestController");

// Matches with "/api/contests"
router.route("/")
  .get(contestsController.findAll);

  router.route("/hostevents")
  .post(contestsController.create)



module.exports = router;
