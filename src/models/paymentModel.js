const db = require('../config/database');

class PaymentModel {
  static async createTransaction(transactionId, amount, status) {
    const query = `
      INSERT INTO transactions (transaction_id, amount, status, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const values = [transactionId, amount, status];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async getTransactionById(transactionId) {
    const query = 'SELECT * FROM transactions WHERE transaction_id = $1;';
    const result = await db.query(query, [transactionId]);
    return result.rows[0];
  }
}

module.exports = PaymentModel;
