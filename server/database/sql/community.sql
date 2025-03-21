-- 删除已存在的数据库
DROP DATABASE IF EXISTS community;

-- 创建新的数据库
CREATE DATABASE community;

-- 使用该数据库
USE community;

-- 用户表 (users)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,  -- 用户名
    password VARCHAR(255) NOT NULL,        -- 密码（加密存储）
    email VARCHAR(100),             -- 邮箱
    avatar VARCHAR(255),                  -- 头像
    phone VARCHAR(20),                     -- 电话
    address VARCHAR(255),                  -- 地址
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 报修类型表
CREATE TABLE repair_type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 商品表 (goods)
CREATE TABLE goods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NULL,
    image VARCHAR(255) NULL,
    type_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES repair_type(id) ON DELETE CASCADE
);

-- 报修表 (repairs)
CREATE TABLE repairs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,                   -- 关联用户
    name VARCHAR(50) NOT NULL,              -- 姓名
    phone VARCHAR(20) NOT NULL,             -- 电话
    region VARCHAR(50) NOT NULL,            -- 地址
    address VARCHAR(255) NOT NULL,          -- 详细地址
    report_date DATE NOT NULL,              -- 申报时间
    type_id INT NOT NULL,                   -- 报修类型
    description TEXT NULL,          -- 报修内容
    status ENUM("pending", "in_progress", "completed") DEFAULT "pending", -- 报修状态
    assigned_worker INT NULL,               -- 维修人员（工作人员 ID）
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES repair_type(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_worker) REFERENCES users(id) ON DELETE SET NULL
);

-- 购物车表 (carts)
CREATE TABLE carts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id VARCHAR(255) NULL,  -- 购物车ID
    user_id INT NOT NULL,
    goods_id INT NOT NULL,
    goods_num INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (goods_id) REFERENCES goods(id) ON DELETE CASCADE
);

-- 缴费记录表 (payments)
CREATE TABLE payments (
    id           INT AUTO_INCREMENT PRIMARY KEY, -- 缴费记录ID
    resident_id  INT NOT NULL,                  -- 居民ID（外键，可关联居民表）
    water_fee    DECIMAL(10,2) NULL,        -- 水费
    electricity_fee DECIMAL(10,2) NULL,     -- 电费
    property_fee DECIMAL(10,2) NULL,        -- 物业费
    total_amount DECIMAL(10,2) AS (water_fee + electricity_fee + property_fee) STORED, -- 总费用
    payment_status ENUM('pending', 'paid') DEFAULT 'pending', -- 支付状态
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (resident_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 订单表 (orders)
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(255) NOT NULL,  -- 订单ID
    user_id INT NOT NULL,           -- 用户ID
    cart_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    order_status ENUM("pending", "paid") DEFAULT "pending",
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 系统公告表 (announcements)
CREATE TABLE announcements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,    -- 公告标题
    content TEXT NOT NULL,          -- 公告内容
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 超级管理员表 (super_admin)
CREATE TABLE super_admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 论坛帖子表 (posts)
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    reply_id INT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reply_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- 插入用户数据（普通用户）
INSERT INTO users (username, password, email, avatar, phone, address)
VALUES 
('test', '123456', 'zhangsan@example.com', NULL, '1357924680', '某某小区2号楼301'),
('lisi', 'hashed_password2', 'lisi@example.com', NULL, '1472583690', '某某小区3号楼102'),
('wangwu', 'hashed_password3', 'wangwu@example.com', NULL, '1593572468', '某某小区1号楼505'),
('zhaoliu', 'hashed_password4', 'zhaoliu@example.com', NULL, '18623456789', '某某小区4号楼201'),
('sunqi', 'hashed_password5', 'sunqi@example.com', NULL, '13356789012', '某某小区5号楼1203');

-- 插入报修类型
INSERT INTO repair_type (name, price) 
VALUES 
('水管维修', 50.00),
('电路维修', 80.00),
('家电维修', 100.00),
('门窗维修', 70.00),
('地板维修', 120.00);

-- 插入商品数据
INSERT INTO goods (name, price, description, image, type_id)
VALUES 
('LED节能灯泡', 15.00, '高亮节能灯泡', NULL, 2),
('不锈钢水龙头', 35.00, '耐用防锈', NULL, 1),
('电风扇', 180.00, '静音立式风扇', NULL, 3),
('电饭煲', 250.00, '多功能智能电饭煲', NULL, 3),
('木质门锁', 60.00, '防盗耐用', NULL, 4),
('瓷砖修复剂', 45.00, '适用于地板裂缝修复', NULL, 5);

-- 插入报修记录
INSERT INTO repairs (user_id, name, phone, region, address, report_date, type_id, description, status, assigned_worker)
VALUES 
(1, '张三', '1357924680', '某某小区', '2号楼301', '2025-03-08', 1, '厨房水管漏水严重', 'completed', 2),
(2, '李四', '1472583690', '某某小区', '3号楼102', '2025-03-09', 2, '客厅电路跳闸', 'in_progress', 3),
(3, '王五', '1593572468', '某某小区', '1号楼505', '2025-03-10', 3, '洗衣机不启动', 'pending', NULL),
(4, '赵六', '18623456789', '某某小区', '4号楼201', '2025-03-11', 4, '窗户合不上', 'pending', NULL),
(5, '孙七', '13356789012', '某某小区', '5号楼1203', '2025-03-12', 5, '地板出现裂缝', 'in_progress', 1);

-- 插入购物车数据
INSERT INTO carts (cart_id, user_id, goods_id, goods_num)
VALUES 
('cart1001', 1, 1, 3),
('cart1002', 2, 3, 1),
('cart1003', 3, 4, 1),
('cart1004', 4, 2, 2),
('cart1005', 5, 6, 4);

-- 插入订单数据
INSERT INTO orders (order_id, user_id, cart_id, amount, order_status)
VALUES 
('order001', 1, 'cart1001', 45.00, 'paid'),
('order002', 2, 'cart1002', 180.00, 'pending'),
('order003', 3, 'cart1003', 250.00, 'paid'),
('order004', 4, 'cart1004', 70.00, 'pending'),
('order005', 5, 'cart1005', 180.00, 'paid');

-- 插入系统公告
INSERT INTO announcements (title, content)
VALUES 
('小区停水通知', '由于市政管道维修，3月15日全天停水，请大家提前储水。'),
('电梯检修通知', '3月18日上午，小区所有电梯将进行年度维护，预计下午恢复使用。'),
('垃圾分类新规', '从4月1日起，小区将实行新的垃圾分类标准，请大家遵守相关规定。');

-- 插入超级管理员
INSERT INTO super_admin (username, password, role_id)
VALUES 
('superadmin', '123456', 1),
('sam', '123456', 2);

-- 插入论坛帖子
INSERT INTO posts (user_id, title, content)
VALUES 
(1, '小区电梯又坏了，什么时候修？', '最近电梯坏得很频繁，希望物业能彻底维修一下。'),
(2, '有没有合租的朋友？', '最近打算找个合租伙伴，有没有同小区的朋友？'),
(3, '小区周边有什么好吃的？', '新搬来这里，求推荐好吃的餐馆。'),
(4, '楼下的宠物太吵了怎么办？', '楼下邻居养的狗每天早上6点叫，真的受不了了。'),
(5, '物业费要涨价了？', '听说物业费又要涨价了，是真的吗？');
