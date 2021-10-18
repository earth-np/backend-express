const express = require("express");
const { TransactionsData } = require("./transaction");
const apiRouter = express.Router();
const { Transaction } = require("./model/transactionModel");

const loggingMiddleware = (req, res, next) => {
  console.log(req.method, req.url);
  console.log("Body : >>>", req.body);
  next();
};

const enhanceReq = (req, res, next) => {
  if (req?.body?.amount) {
    req.userAmount = req?.body?.amount;
  }
  next();
};

apiRouter.use(loggingMiddleware);

apiRouter.get("/transactions", async (req, res) => {
  const filter = req.query;
  const transactions = await Transaction.find(filter).exec();
  res.json({
    transactions,
  });
});

apiRouter.get("/transaction/:id", async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findById(id).exec();
  res.json({
    transaction,
  });
});

apiRouter.post("/transaction", [enhanceReq], async (req, res) => {
  const data = req.body;
  const newTransaction = new Transaction(data);
  await newTransaction.save();
  res.json({
    newTransaction,
  });
});

apiRouter.put("/transaction/:id", async (req, res) => {
  const newTransaction = req.body;
  const updated = await Transaction.updateOne(
    { _id: req.params.id },
    newTransaction
  ).exec();

  res.json({
    updated,
  });
});

apiRouter.delete("/transaction/:id", async (req, res) => {
  const deleteResponse = await Transaction.deleteOne({ _id: req.params.id });
  res.json({ deleteResponse });
});

apiRouter.get("/earth", (req, res) => {
  res.send("API ROUTER: Hi Earth");
});

apiRouter.use(enhanceReq);

module.exports = { apiRouter };
