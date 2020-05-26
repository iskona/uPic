const router = require("express").Router();
const contestsController = require("../../controllers/contestController");

// Matches with "/api/contests"
router.route("/openContests")
  .get(contestsController.findAllOpenContests);

router.route("/closedContests")
  .get(contestsController.findAllClosedContests);

router.route("/hostevents")
  .post(contestsController.create)

router.route("/personalAccount")
.get(contestsController.findContestEmail);

router.route("/personalAccount/:id")
.patch(contestsController.patch)

router.route("/personalAccount/:id")
.get(contestsController.getContsetByID)

router.route("/searchforAcategory/:category")
.get(contestsController.searchforAcategory);

module.exports = router;

