const express = require("express");
const cors = require("cors");
const urls = require("./routes/urls");
const getUrls = require("./routes/getUrls");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/urls", urls);
app.use("/", getUrls);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
