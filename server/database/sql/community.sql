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

-- 系统公告表 (announcements)
CREATE TABLE announcements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,    -- 公告标题
    content TEXT NOT NULL,          -- 公告内容
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 初始化数据
INSERT INTO repair_type (name) VALUES 
('家用电器'),
('水电设施'),
('门窗设备'),
('网络设备');
