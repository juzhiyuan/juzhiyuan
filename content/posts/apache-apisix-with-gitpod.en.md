---
categories: ["Guide"]
date: 2022-05-19T08:00:00Z
draft: false
url: "how-to-use-apache-apisix-with-gitpod"
title: "How to use Gitpod to develop Apache APISIX?"
---

## Background

Use Gitpod as the Apache APISIX development and startup environment, which is convenient for new users to use, develop, and contribute.

## Terminology

### [Apache APISIX](http://apisix.apache.org/)

A new generation of API gateways under the Apache Software Foundation, watch the video [What's API Gateway](https://www.youtube.com/watch?v=hWRRdICvMNs) to learn more.

### [ETCD](https://etcd.io/)

The configuration storage center of Apache APISIX, which can be understood as a database (but not completely equivalent).

### [Gitpod](https://www.gitpod.io/)

Developer tools running in the browser (with VS Code embedded). No need to configure the environment, deploy code in our own machines, which is easier to unify the development environment.

## Steps

### Register and Login GitHub.com

Please follow GitHub's Docs [here](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account).

### Fork `apache/apisix` Repository

1. Visit https://github.com/apache/apisix to enter the homepage of the `apache/apisix` project.
2. Click the `Fork` button in the upper right corner to enter the following page
   ![image](https://user-images.githubusercontent.com/2106987/169227139-d730ba89-0191-4b43-9ceb-0eca5f0ac52a.png)
3. Click the `Create fork` button and wait a moment
   ![image](https://user-images.githubusercontent.com/2106987/169227257-f93dcbc1-793e-43a8-9907-184746639a27.png)
   ![image](https://user-images.githubusercontent.com/2106987/169227307-3af310cc-b195-42cf-af51-bc40658f9a58.png)
4. The fork is successful when your GitHub account name is displayed in the `upper left corner`
5. Click `Code -> HTTPS -> Copy` (this link will be used below)
   ![image](https://user-images.githubusercontent.com/2106987/169227389-9732c04b-e389-414c-8569-590f733d9240.png)

### Import project to Gitpod

1. Visit https://www.gitpod.io/ , click `Try now`, and log in with `GitHub`
2. Select the default option `VS Code Browser` and click `Continue`
   ![image](https://user-images.githubusercontent.com/2106987/169227561-4ed6d4a5-41dc-47a8-b907-654daf1f349d.png)
   ![image](https://user-images.githubusercontent.com/2106987/169227576-4c274bea-cb55-4821-b931-33d773d83baa.png)
3. Click on `New Workspace` and paste the Repository link copied above
   ![image](https://user-images.githubusercontent.com/2106987/169227625-fc1c9a6f-a6f1-4229-bd8f-ca3aec1db8a9.png)
4. Click this link and go to the following page
   ![image](https://user-images.githubusercontent.com/2106987/169227696-9db4a768-cc88-4398-b7ad-765d07b74bf0.png)
5. When the following interface is displayed, it means ready (directory on the left, code editing box on the upper right, command line area on the lower right)
   ![image](https://user-images.githubusercontent.com/2106987/169227780-6f06bd40-7e75-476e-a49e-9a4015dbe6a2.png)

### Install ETCD

```sh
# Go to the parent directory of the apisix folder to install ETCD

cd ..

ETCD_VERSION='3.4.13'

wget https://github.com/etcd-io/etcd/releases/download/v${ETCD_VERSION}/etcd-v${ETCD_VERSION}-linux-amd64.tar.gz

tar -xvf etcd-v${ETCD_VERSION}-linux-amd64.tar.gz && cd etcd-v${ETCD_VERSION}-linux-amd64 && sudo cp -a etcd etcdctl /usr/bin/

nohup etcd >/tmp/etcd.log 2>&1 &

cd ../apisix
```

### Install Dependencies

1. See the `Gitpod command line`, the current default is the `master` branch, in this tutorial we use the `release/2.13` branch;
2. Enter the following command in the command line and press `Enter`, the command line will display `gitpod /workspace/apisix (release/2.13)` indicating that the switch is successful;

```sh
git checkout --track origin/release/2.13
```

3. If you have fork the `apache/apisix` repository before, please execute the following command to synchronize the latest code. Otherwise, please go directly to the next step.

```sh
git pull upstream release/2.13
```

4. Install dependencies and build the project: Enter the following command on the command line and press `Enter`

```sh
curl https://raw.githubusercontent.com/apache/apisix/master/utils/install-dependencies.sh -sL | bash -

make deps
```

### Run apisix

Execute the following command to start apisix.

```sh
make run
```

Execute the following command to verify that apisix is installed and started successfully.

```sh
curl localhost:9080

# After executing the above command, the following content will be displayed, indicating that the startup is successful
# {"error_msg":"404 Route Not Found"}
```

### Stop apisix

```sh
make stop
```

### Rebuild the project after editing codes

```sh
make stop
make run
```

### Submit code changes

Using the file directory panel on the left side of Gitpod, select the code you want to commit.

## Advanced

> If you want to operate the Apache APISIX instance through the `Admin API`, and create `Routes`, `Upstreams`, etc., you can continue reading below.

The Apache APISIX instance exposes the Admin API for operators to call. To avoid malicious access, you need to carry the key when calling the API. You can find the `Apache APISIX default key` by viewing the `/conf/config.yaml` file. The following is an example of calling: If you need to query the list of routes that have been created, you can access:

```sh
curl -i -X GET http://127.0.0.1:9080/apisix/admin/routes -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1"
```

If the key is correct, it will return something like this:

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

# The above is the HTTP Response Header of the HTTP request, but please focus on the following: If nodes is empty, it means that no Route is currently created.
{"action":"get","count":0,"node":{"nodes":[],"key":"\/apisix\/routes","dir":true}}
```

## Other

If you encounter any questions, please join the [Slack](https://apisix.apache.org/docs/general/join/) community and ask for help.
