import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// For __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin:
      "https://cloudcomputing3333-bsg7fye5hne0erhu.francecentral-01.azurewebsites.net/", // Adjust as needed for your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("combined"));
app.use(helmet());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome to My Node.js App",
    message: "Hello from Express + EJS 👋",
  });
});

// Server setup
export const PORT = process.env.PORT || 3000;
export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}
