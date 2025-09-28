---
title: git的基本用法
published: 2025-09-27
description: '基本的git使用语句(basic git using)'
image: './git.jpg'
tags: ["git"]
category: '开发工具(development tools)'
draft: false 
---

## 核心概念

理解 Git 的三个主要区域至关重要：

1.  **工作区 (Working Directory)**：你正在编辑的本地项目目录。
2.  **暂存区 (Staging Area / Index)**：一个文件，保存了下次将要提交的文件列表信息。
3.  **本地仓库 (Local Repository)**：保存了项目所有版本历史记录的数据库，位于你的 `.git` 目录中。

基本的 Git 工作流程是：在工作区修改文件 -> 将修改的文件添加到暂存区 -> 将暂存区的文件提交到本地仓库。

## 初始配置

在开始使用 Git 之前，你需要配置你的用户名和邮箱，这些信息会出现在你的每一次提交中。

```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

## 基础命令

### 1. 创建仓库

- **初始化新仓库**: 在现有项目目录中创建一个新的 Git 仓库。

  ```bash
  git init
  ```

- **克隆远程仓库**: 从一个远程 URL 复制一个完整的 Git 仓库。

  ```bash
  git clone <repository_url>
  ```

### 2. 日常工作流程

- **查看状态**: 检查工作区和暂存区的状态。

  ```bash
  git status
  ```

- **暂存文件**: 将文件的更改添加到暂存区。

  ```bash
  # 暂存指定文件
  git add <file_name>
  
  # 暂存所有已修改和新添加的文件
  git add .
  ```

- **提交更改**: 将暂存区的内容提交到本地仓库，并附上描述性消息。

  ```bash
  git commit -m "Your descriptive commit message"
  ```

- **查看历史**: 查看提交日志。

  ```bash
  # 显示完整的提交历史
  git log
  
  # 以更简洁的单行格式显示
  git log --oneline
  
  # 显示分支图
  git log --graph --oneline --all
  ```

## 分支管理 (Branching)

分支是 Git 的核心特性之一，它允许你在一个独立的环境中开发新功能，而不会影响主线（通常是 `main` 或 `master` 分支）。

### 1. 查看与创建分支

- **列出所有分支**:

  ```bash
  git branch
  ```

- **创建一个新分支**:

  ```bash
  git branch <branch_name>
  ```

- **创建并切换到新分支**:

  ```bash
  git checkout -b <branch_name>
  # 或者使用新命令 (Git 2.23+)
  git switch -c <branch_name>
  ```

### 2. 切换分支

- **切换到已存在的分支**:

  ```bash
  git checkout <branch_name>
  # 或者使用新命令
  git switch <branch_name>
  ```

### 3. 合并分支

- **合并分支**: 将指定分支的历史记录合并到当前分支。

  ```bash
  # 首先，切换到你想要合并入的目标分支，例如 main
  git switch main
  
  # 然后，执行合并命令
  git merge <feature_branch_name>
  ```

  如果出现冲突 (conflicts)，Git 会提示你手动解决它们，然后再次提交。

### 4. 删除分支

- **删除已合并的分支**:

  ```bash
  git branch -d <branch_name>
  ```

- **强制删除未合并的分支**:

  ```bash
  git branch -D <branch_name>
  ```

## 远程协作

为了与他人协作，你需要与远程仓库进行交互。

### 1. 管理远程仓库

- **查看远程仓库**: 列出你配置的每个远程仓库的简写。

  ```bash
  git remote -v
  ```

- **添加远程仓库**:

  ```bash
  git remote add <short_name> <url>
  # 例如: git remote add origin https://github.com/user/repo.git
  ```

### 2. 同步数据

- **推送 (Push)**: 将你的本地分支提交推送到远程仓库。

  ```bash
  git push <remote_name> <branch_name>
  # 例如: git push origin main
  ```

- **拉取 (Pull)**: 从远程仓库获取最新版本并自动合并到当前分支。这相当于 `git fetch` + `git merge`。

  ```bash
  git pull <remote_name> <branch_name>
  # 例如: git pull origin main
  ```

- **获取 (Fetch)**: 从远程仓库下载所有分支和数据，但不会自动合并。这允许你在合并前先查看更改。

  ```bash
  git fetch <remote_name>
  ```

## 撤销操作

- **撤销工作区的修改**: 丢弃某个文件的本地修改，恢复到最近一次提交的状态。

  ```bash
  git checkout -- <file_name>
  ```

- **取消暂存**: 将文件从暂存区移回工作区。

  ```bash
  git reset HEAD <file_name>
  ```

- **重置提交 (Reset)**: 撤销最近的提交。`--soft`, `--mixed`, `--hard` 三种模式有不同效果，请谨慎使用。

  ```bash
  # 仅撤销提交，保留更改在暂存区
  git reset --soft HEAD~1
  
  # 撤销提交和暂存，保留更改在工作区 (默认)
  git reset --mixed HEAD~1
  
  # 彻底丢弃提交和所有更改 (危险操作)
  git reset --hard HEAD~1
  ```

- **反转提交 (Revert)**: 创建一个新的提交来撤销某个历史提交的更改，这是一种更安全的方式，因为它不会改变项目历史。

  ```bash
  git revert <commit_hash>
  ```

