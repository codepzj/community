const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const cors = require("cors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const repairsRouter = require("./routes/repairs");
const goodsRouter = require("./routes/goods");
const repairTypeRouter = require("./routes/repair_type");
const cartsRouter = require("./routes/carts");
const ordersRouter = require("./routes/orders");
const announcementsRouter = require("./routes/announcements");
// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 使用中间件
app.use(logger);
app.use(cors());
// 静态文件
app.use(express.static("public"));

// 路由分组
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/repair", repairsRouter);
app.use("/goods", goodsRouter);
app.use("/repair_type", repairTypeRouter);
app.use("/cart", cartsRouter);
app.use("/order", ordersRouter);
app.use("/announcement", announcementsRouter);

// 路由未匹配
app.use("*", (req, res) => {
  res.status(404).json({ code: 404, msg: "路由未匹配" });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ code: 500, msg: "服务器错误" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
