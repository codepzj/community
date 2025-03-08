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

-- 费用缴纳表 (payments)
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,                  -- 关联用户
    amount DECIMAL(10,2) NOT NULL,         -- 缴费金额
    status ENUM('pending', 'paid') DEFAULT 'pending', -- 状态
    due_date DATE NOT NULL,                -- 缴费截止日期
    paidAt TIMESTAMP NULL,                 -- 实际缴费时间
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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
    type VARCHAR(255) NOT NULL,             -- 报修类型
    description TEXT NULL,          -- 报修内容
    status ENUM("in_pay", "pending", "in_progress", "completed") DEFAULT "in_pay", -- 报修状态
    assigned_worker INT NULL,               -- 维修人员（工作人员 ID）
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_worker) REFERENCES users(id) ON DELETE SET NULL
);

-- 订单表 (orders)
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    repair_id INT NOT NULL,                  -- 关联报修工单
    amount DECIMAL(10,2) NULL,               -- 订单金额
    payment_method ENUM('cash', 'wechat', 'alipay', 'card') NULL, -- 支付方式
    status ENUM('pending', 'paid', 'completed', 'cancelled') DEFAULT 'pending', -- 订单状态
    paid_at TIMESTAMP NULL,                  -- 支付时间
    completed_at TIMESTAMP NULL,             -- 订单完成时间
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (repair_id) REFERENCES repairs(id) ON DELETE CASCADE
);

-- 论坛帖子表 (posts)
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,           -- 发表人
    title VARCHAR(255) NOT NULL,    -- 帖子标题
    content TEXT NOT NULL,          -- 帖子内容
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 论坛评论表 (comments)
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,           -- 关联帖子
    user_id INT NOT NULL,           -- 评论人
    content TEXT NOT NULL,          -- 评论内容
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 系统设置表 (settings)
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(100) UNIQUE NOT NULL, -- 设置项名称
    value TEXT NOT NULL                    -- 设置值
);
