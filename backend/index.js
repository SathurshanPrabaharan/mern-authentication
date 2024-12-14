import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
/*const __dirname = path.resolve();*/

// app.use(cors({ origin: `${process.env.CLIENT_URL}`||'http://localhost:5173', credentials: true }));
const corsOptions ={
	origin: process.env.CLIENT_URL||'http://localhost:5173',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true
}
app.use(cors(corsOptions));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

/*
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
*/
app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});
