class Transactions {
  transactions = [];

  constructor() {
    this.transactions = [
      {
        type: "income",
        category: "salary",
        amount: 10000,
      },
      {
        type: "expense",
        category: "shopping",
        amount: -500,
      },
    ];
  }

  getTransactions() {
    return this.transactions;
  }

  getTransaction(index) {
    return this.transactions[index];
  }

  createTransaction(type, category, amount) {
    const newTransaction = {
      type,
      category,
      amount,
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  updateTransaction(index, transaction) {
    this.transactions[index] = transaction;
    return this.transactions[index];
  }

  deleteTransaction(deleteIndex) {
    this.transactions = this.transactions.filter(
      (data, index) => index !== Number(deleteIndex)
    );
    return true;
  }
}

const TransactionsData = new Transactions();

module.exports = {
  TransactionsData,
};
