---
title: api服务器的连接
published: 2026-01-21
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
# 连接服务器

###### 测试服务器网络连接

```
ping -n 4 47.238.126.26
```

###### 测试端口连接

```
Test-NetConnection -ComputerName 47.238.126.26 -Port 80
```

###### 登录服务器

```
ssh root@47.238.126.26
```

###### 启动MySQL服务

```
systemctl start mysqld
systemctl status mysqld
```

###### 修改配置

```
vim /etc/my.cnf
[mysqld]
bind-address = 0.0.0.0
```

###### 配置远程访问

```
mysql -u root -p
CREATE USER 'root'@'%' IDENTIFIED BY 'Xiyu20050506@';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;
EXIT;
```

###### 重启MySQL

```
systemctl restart mysqld
```

###### 开启防火墙

```
firewall-cmd --permanent --add-port=3306/tcp
firewall-cmd --reload
```

###### 查看所有监听端口

```
netstat -tulnp

ss -tulnp
```

## sqlite3

###### 进入sqlite3

```
sqlite3 
```

###### 退出

```
.exit
```

###### 创建表

```
create table student(id integer,name text,age integer);
```

###### 查看表

```
.tables
```

###### 查看表结构

```
.schema
```

###### 插入数据

```
insert into student (id,name,age) values(1,"aa",11);
```

###### 查表

```
select*from student;
```

###### 改表

```
update student set age = 25 where id = 1;
```

## 发送数据格式

![image-20260119134327659](C:\Users\86183\AppData\Roaming\Typora\typora-user-images\image-20260119134327659.png)

![image-20260119141245471](C:\Users\86183\AppData\Roaming\Typora\typora-user-images\image-20260119141245471.png)
