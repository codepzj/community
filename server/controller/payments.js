const paymentsService = require("../service/payments");
const { success, failOnClient, failOnServer } = require("../utils/wrap");

class PaymentsController {
  // 创建缴费记录
    async createPayment(req, res) {
      try {
        const paymentData = req.body;
        const payment = await paymentsService.createPayment(paymentData);
        res.json(success("缴费记录创建成功", payment));
      } catch (error) {
        res.json(failOnServer(error.message));
      }
    }

  // 获取所有缴费记录
  async getAllPayments(req, res) {
    try {
      const payments = await paymentsService.getAllPayments();
      res.json(success("缴费记录获取成功", payments));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
  
  // 获取单个缴费记录
  async getPaymentById(req, res) {
    try {
      const { id } = req.params;
      const payment = await paymentsService.getPaymentById(id);
      res.json(success("缴费记录获取成功", payment));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  // 更新缴费记录
  async updatePaymentStatusById(req, res) {
    try {
      const { id } = req.params;
      const payment = await paymentsService.updatePaymentStatusById(id);
      res.json(success("缴费记录更新成功", payment));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}

module.exports = new PaymentsController();