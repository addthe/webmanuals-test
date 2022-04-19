const express = require("express");
const shortid = require("shortid");
const isValidURL = require("../utils/url");
const store = require("store");

const router = express.Router();

router.post("/", (req, res) => {
  let baseUrl = req.body.baseUrl;
  const validTime = req.body.validTime;
  const shortUrlBase = "http://localhost:8000";
  const urlId = shortid.generate();

  const shortUrl = `${shortUrlBase}/${urlId}`;

  baseUrl.substring(0, 3) !== "http"
    ? (baseUrl = `http://${baseUrl}`)
    : baseUrl;

  const validTimeInSeconds = validTime * 1000;
  const validFrom = Date.now();
  const validUntil = Date.now() + validTimeInSeconds;

  const response = {
    shortUrl,
    baseUrl,
    validTime,
    validFrom,
    validUntil,
  };

  store.set(urlId, response);

  if (!isValidURL(req.body.baseUrl))
    return res.status(500).json("Url is not valid");

  return res.status(200).json(response);
});

module.exports = router;
