import express, { Express } from "express";
import cookieParser from "cookie-parser";
import connectToMongoDb from "./utility/mongo-db/connect-to-mongo-db";
import authRouter from "./routes/auth-routes";
import blogRouter from "./routes/blog-routes";
import commentsRouter from "./routes/comments-routes";
import serve404 from "./controllers/404";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const app: Express = express();

// Middleware to parse POST/PUT requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware for CORS
app.use(
  cors({
    origin: [process.env.UI_URL, process.env.CMS_URL] as string[],
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Set up the routes
app.use(authRouter);
app.use(blogRouter);
app.use(commentsRouter);

// Catch unsupported routes
app.use("*", serve404);

// Establish connection to database
connectToMongoDb();

// Begin listening
app.listen(PORT);
