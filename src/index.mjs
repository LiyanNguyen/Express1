import express from "express";
import userRouter from "./routes/users.mjs";
import productRouter from "./routes/products.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import "./strategies/local-strategy.mjs";

const app = express();

mongoose.connect();

// global middleware
app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "totally secret key",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 }, //1 hour cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(userRouter);
app.use(productRouter);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  req.session.visited = true; //makes the session id the same, even if refreshing
  res.cookie("hello", "world", { maxAge: 60000, signed: true });
  res.status(201).send({ msg: "hello" });
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200)
});

app.get("/api/auth/status", (req, res) => {
  // check if user is authenticated or not
  return req.user ? res.send(req.user) : res.sendStatus(401);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
