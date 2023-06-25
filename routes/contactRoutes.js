const express = require("express");
const router = express.Router();
const { getContacts } = require("../controllers/contactController");
const { createContact } = require("../controllers/contactController");
const { getContact } = require("../controllers/contactController");
const { updateContact } = require("../controllers/contactController");
const { DeleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/ValidateTokenHandler");

// router.route("/").get((req, res) => {
//   // res.send("Working fine");
//   res.status(200).json({ message: "Working Fine" });
// });

router.use(validateToken); // to validate the private contacts routes only authenticated user can make the contact of their own and can update read and delete it

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(DeleteContact);

module.exports = router;
