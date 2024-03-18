export const resolveByUserID = (req, res, next) => {
  const parsedID = parseInt(req.params.id);
  if (isNaN(parsedID)) return res.sendStatus(400);

  const userIndex = mockUsers.findIndex((user) => user.id === parsedID);
  if (userIndex === -1) return res.sendStatus(404);

  req.userIndex = userIndex;
  next();
};