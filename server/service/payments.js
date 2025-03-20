const { PaymentsModel } = require("../database");

class PaymentsService {
  // 创建缴费记录
    async createPayment(paymentData) {
      try {
        return await PaymentsModel.create(paymentData);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    
    // 获取所有缴费记录
    async getAllPayments() {
      try {
        return await PaymentsModel.findAll({
          order: [['createdAt', 'DESC']],
        });
      } catch (error) {
          throw new Error(error.message);
      }
    }
    
    // 获取单个缴费记录
    async getPaymentById(id) {
        try {
          const payment = await PaymentsModel.findAll({
            where: {
              resident_id: id,
            },
          });
          if (!payment) {
            throw new Error("缴费记录不存在");
          }
          return payment;
        } catch (error) {
          throw new Error(error.message);
        }
    }
  
  // 更新缴费记录
  async updatePaymentStatusById(id) {
    try {
      return await PaymentsModel.update({ payment_status: 'paid' }, { where: { id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new PaymentsService();
