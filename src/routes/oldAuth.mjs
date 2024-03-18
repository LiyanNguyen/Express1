import { mockUsers } from "./utils/constants.mjs";

// assuming payload is correct for now
app.post("/api/auth", (req, res) => {
  const {
    body: { username, password }, //assumming this exists
  } = req;

  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password)
    return res.status(401).send({ msg: "BAD CREDENTIALS" });

  //modify session object - add a user object
  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, sessionData) =>
    console.log(sessionData)
  );
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "NOT AUTHENTICATED" });
});

app.post("/api/cart", (req, res) => {
  // enable add items to cart if athenticated\
  if (!req.session.user) return res.sendStatus(401);

  const item = req.body;
  const cart = req.session.cart;

  // cart exists
  if (cart) cart.push(item);
  else req.session.cart = [item];

  return res.status(201).send(item);
});

app.get("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);

  return res.send(req.session.cart ?? []);
});
