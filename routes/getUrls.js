const express = require("express");
const store = require("store");

const router = express.Router();

router.get("/:shortid", (req, res) => {
  const urlObject = store.get(req.params.shortid);
  if (urlObject === undefined)
    return res.status(500).json("URL cant be found!");
  if (
    urlObject.validFrom <= urlObject.validUntil &&
    urlObject.validUntil >= Date.now()
  )
    return res.redirect(urlObject.baseUrl);
  return res.status(500).json("URL has expired");
});

module.exports = router;
