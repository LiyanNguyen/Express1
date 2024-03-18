import { Router } from "express";
import {
  query,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { resolveByUserID } from "../utils/middlewares.mjs";

const userRouter = Router();

userRouter.get("/api/users", (req, res) => {
  console.log(req.sessionID)
  req.sessionStore.get(req.sessionID, (err, sessData) => {
    if (err) console.log(err)
    console.log(sessData)
  });
  return res.status(200).send(mockUsers);
});

userRouter.get(
  "/api/users/search",
  query("username").isString().notEmpty().isLength({ min: 3, max: 25 }),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ errors: result.array() });

    const data = matchedData(req);
    return res.send(
      mockUsers.filter((user) => user.username.includes(data.username))
    );
  }
);

userRouter.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const data = matchedData(req);

  mockUsers.push({ id: mockUsers.length + 1, ...data });
  return res.status(201).send(mockUsers);
});

userRouter.get("/api/users/:id", (req, res) => {
  const parsedID = parseInt(req.params.id);
  if (isNaN(parsedID)) return res.sendStatus(400);

  const findUser = mockUsers.find((user) => user.id === parsedID);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

userRouter.put("/api/users/:id", resolveByUserID, (req, res) => {
  mockUsers[req.userIndex] = { id: req.userIndex, ...req.body };
  return res.status(200).send(mockUsers);
});

userRouter.patch("/api/users/:id", resolveByUserID, (req, res) => {
  mockUsers[req.userIndex] = { ...mockUsers[req.userIndex], ...req.body };
  return res.status(200).send(mockUsers);
});

userRouter.delete("/api/users/:id", resolveByUserID, (req, res) => {
  mockUsers.splice(req.userIndex, 1);
  return res.status(200).send(mockUsers);
});

export default userRouter