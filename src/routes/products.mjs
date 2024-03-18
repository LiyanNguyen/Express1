import { Router } from "express";

const productRouter = Router();

productRouter.get("/api/products", (req, res) => {
  if (req.signedCookies.hello && req.signedCookies.hello === "world")
    return res.send([
      { id: 11, name: "abc" },
      { id: 22, name: "def" },
      { id: 33, name: "ghi" },
      { id: 44, name: "jkl" },
    ]);

  return res.status(403).send({ msg: "you need cookies" });
});

export default productRouter;
