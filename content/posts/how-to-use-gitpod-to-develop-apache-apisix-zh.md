---
title: 如何使用 Gitpod 搭建 Apache APISIX 开发环境？
date: 2022-05-19T00:00:00+08:00
tags: ["Apache APISIX"]
image: "https://static.juzhiyuan.me/2022/12/11/85bd0e25722ce090a95f85465a5bba05.png"
---

## 背景

使用 Gitpod 作为 Apache APISIX 开发与启动环境，方便新手用户使用、研发、参与贡献。

## 名词简介

### Apache APISIX

Apache 软件基金会下的新一代 API 网关，可观看视频 https://www.youtube.com/watch?v=hWRRdICvMNs 了解更多内容。

### ETCD

Apache APISIX 的配置存储中心，可理解为数据库（但不完全等价）。

### Gitpod

运行在浏览器中的开发者工具（内嵌 VS Code），无需在自己的设备中配置环境、部署代码，统一开发环境。

## 步骤

### 注册并登陆 GitHub.com

### Fork 并克隆 apisix 项目

1. 访问 https://github.com/apache/apisix 进入 apache/apisix 项目首页
2. 点击右上角 Fork 按钮后进入如下页面
   ![image](https://user-images.githubusercontent.com/2106987/169227139-d730ba89-0191-4b43-9ceb-0eca5f0ac52a.png)
3. 点击 Create fork 按钮并稍等片刻
   ![image](https://user-images.githubusercontent.com/2106987/169227257-f93dcbc1-793e-43a8-9907-184746639a27.png)
   ![image](https://user-images.githubusercontent.com/2106987/169227307-3af310cc-b195-42cf-af51-bc40658f9a58.png)
4. 当左上角显示你的 GitHub 账户名称时，表示 Fork 成功
5. 点击 Code -> HTTPS -> 复制（该链接会在下方使用）
   ![image](https://user-images.githubusercontent.com/2106987/169227389-9732c04b-e389-414c-8569-590f733d9240.png)

### 导入 apisix 项目到 Gitpod 中

1. 访问 https://www.gitpod.io/ ，点击 Try now，然后使用 GitHub 登陆
2. 选择默认选项 VS Code Browser 并点击 Continue
   ![image](https://user-images.githubusercontent.com/2106987/169227561-4ed6d4a5-41dc-47a8-b907-654daf1f349d.png)
   ![image](https://user-images.githubusercontent.com/2106987/169227576-4c274bea-cb55-4821-b931-33d773d83baa.png)
3. 点击 New Workspace 并粘贴在第 2 步中复制的链接
   ![image](https://user-images.githubusercontent.com/2106987/169227625-fc1c9a6f-a6f1-4229-bd8f-ca3aec1db8a9.png)
4. 点击该链接并进入如下页面
   ![image](https://user-images.githubusercontent.com/2106987/169227696-9db4a768-cc88-4398-b7ad-765d07b74bf0.png)
5. 显示如下界面时表示准备就绪（左侧为目录、右上方为代码编辑框、右下方为命令行区域）
   ![image](https://user-images.githubusercontent.com/2106987/169227780-6f06bd40-7e75-476e-a49e-9a4015dbe6a2.png)

### 安装 ETCD

```sh
# 进入 apisix 文件夹的父目录以安装 ETCD

cd ..

ETCD_VERSION='3.4.13'

wget https://github.com/etcd-io/etcd/releases/download/v${ETCD_VERSION}/etcd-v${ETCD_VERSION}-linux-amd64.tar.gz

tar -xvf etcd-v${ETCD_VERSION}-linux-amd64.tar.gz && cd etcd-v${ETCD_VERSION}-linux-amd64 && sudo cp -a etcd etcdctl /usr/bin/

nohup etcd >/tmp/etcd.log 2>&1 &

cd ../apisix
```

### 构建、启动 apisix 项目

1. 见命令行所示，当前默认为 master 分支，在本教程中我们使用 release/2.13 分支；
2. 在命令行中输入如下命令并回车，命令行中将显示 gitpod /workspace/apisix (release/2.13) 表示切换成功；

```sh
git checkout --track origin/release/2.13
```

3. 如果之前已 fork 过 apache/apisix 仓库，请执行如下命令同步最新代码；否则请直接进入下一步骤。

```sh
git pull upstream release/2.13
```

4. 安装依赖、构建项目：在命令行中输入如下命令并回车

```sh
curl https://raw.githubusercontent.com/apache/apisix/master/utils/install-dependencies.sh -sL | bash -

make deps
```

5. 启动 apisix

```sh
make run
```

6. 执行如下命令以验证 apisix 安装并启动成功

```sh
curl localhost:9080

# 执行上述命令后，将显示如下内容，表示启动成功
# {"error_msg":"404 Route Not Found"}
```

### 关闭 apisix

```sh
make stop
```

### 编辑代码后需重新构建项目

```sh
make run
```

### 提交代码修改

使用 Gitpod 左侧文件目录面板，选择要提交的代码并提交。

## 进阶

> 如果希望通过 Admin API 操作 Apache APISIX 实例，并创建 Route、Upstream 等，可继续阅读下文。

Apache APISIX 实例暴露了 Admin API 供操作者调用，为了避免被恶意访问，在调用 API 时需要携带密钥，你可通过查看 /conf/config.yaml 文件找到 Apache APISIX 默认密钥。如下为调用示例：若需要查询已创建的 Route 列表，可访问：

```sh
curl -i -X GET http://127.0.0.1:9080/apisix/admin/routes -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1"
```

若密钥正确，它将返回如下内容：

```sh
HTTP/1.1 200 OK
Date: Thu, 19 May 2022 03:05:28 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.13.1
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: *
Access-Control-Max-Age: 3600

# 上方为 HTTP 请求的响应头（HTTP Response Header），但请重点关注如下内容：nodes 为空表示目前没有创建任何 Route
{"action":"get","count":0,"node":{"nodes":[],"key":"\/apisix\/routes","dir":true}}
```
