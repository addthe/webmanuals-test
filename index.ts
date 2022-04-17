import express from "express";
import cors from "cors";
import urls from "routes/urls";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/urls", urls);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
