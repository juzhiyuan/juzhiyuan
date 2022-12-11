---
tags: ["Essay", "Apache APISIX"]
date: 2022-04-11T08:00:00Z
title: "我与 Apache 软件基金会的故事"
image: "https://static.juzhiyuan.me/2022/12/11/724ac6ef22526dea917ea58cbae6c40c.png?format=webp"
---

2015 年我在读大一，在部署 Web 项目时用到了 Apache Web Server，Apache 软件的羽毛标志只需看一眼就能牢牢记住。

![image](https://static.juzhiyuan.me/2022/12/11/724ac6ef22526dea917ea58cbae6c40c.png)

Apache 软件基金会成立于 1999 年（我出生于 1997 年），作为全球最大的开源软件基金会，我从未想过会现在与它有更深入地联系。

## 项目

2019 年大学毕业后不久，APISIX 项目发起人联系到我，希望我能为 APISIX 贡献一个 Dashboard 项目。首先，什么是 APISIX？那时我对 APISIX 项目的理解仅仅是一个开源的 API 网关，那什么是 API 网关呢？我没有使用过这类产品，更谈不上如何做一个与 APISIX 配套的 Dashboard 了。

在大学期间自己接了许多项目（来自学校、朋友介绍、政府部门），尽管我对“如何构建 API 网关控制台”没有思路，但我清楚一个 Web 项目包含了“需求确认、产品设计、代码开发、功能测试、服务上线”这几项基本流程。

![image](https://user-images.githubusercontent.com/2106987/162700735-18eb5687-98a5-4aa9-837f-5d96cdbe6383.png)

在多次与 温铭、院生 沟通产品需求后，我为 APISIX 项目制作了 APISIX Dashboard V1：它没有精致的 UI（如下图所示），但能够满足对 APISIX 核心概念地操作，此时自己对 API 网关以及 APISIX 相关概念更加清晰了。

![image](https://user-images.githubusercontent.com/2106987/162698156-b97c90fd-0f51-4b3a-a99f-54f27f0f3a6c.png)

值得一提的是：APISIX 内置了数十种插件对 API 请求、响应进行处理，这些插件通过 JSONSchema 进行插件配置参数地合法性检查。以 `limit-req` 插件为例，它的 JSONSchema 规则如下：

```lua
local schema = {
    type = "object",
    properties = {
        rate = {type = "number", exclusiveMinimum = 0},
        burst = {type = "number",  minimum = 0},
        key = {type = "string"},
        key_type = {type = "string",
            enum = {"var", "var_combination"},
            default = "var",
        },
        rejected_code = {
            type = "integer", minimum = 200, maximum = 599, default = 503
        },
        rejected_msg = {
            type = "string", minLength = 1
        },
        nodelay = {
            type = "boolean", default = false
        },
        allow_degradation = {type = "boolean", default = false}
    },
    required = {"rate", "burst", "key"}
}
```

当用户为某一条 Route 配置插件时，为了降低用户理解 JSONSchema 规则的难度，我们尝试在界面中根据规则直接渲染表单字段，如何在界面中动态地生成插件配置表单是我遇到的最大的挑战。通过一系列调研与测试，我自定义了一个 UI 组件，它可以通过接收 JSONSchema 规则渲染指定表单，这个组件得到了许多用户好评。

在 2020 年中，我们计划开发 Dashboard V2，主要原因有：

1. 随着插件越来越多，自己维护的表单组件不足以覆盖所有插件场景，无意中发现了 `react-jsonschema-form` 这个流行的 JSONSchema 表单生成器组件，希望使用它来解决表单生成的问题；
2. Dashboard V1 是自己独立使用 Vue.js 与 ElementUI 开发的，在适配基金会发版要求时我们修改了大量的源码文件，由于种种原因代码变得不易那么维护；
3. Dashboard V1 是直接对接了 Admin API（DP），我们希望采用 DP 与 CP 分离的架构，因此需要为 Dashboard 单独开发一个 API Server。

直到今天，Apache APISIX Dashboard 依然在缓缓维护着 V2 版本。

具体开发过程不再赘述，但值得分享的事情是自 2019 年到 2020 年末，Apache APISIX Dashboard 与 Website 两个项目的 Web 贡献者非常少，这是由于 Apache APISIX 这个 API 网关属于中间件分类，用户以服务端开发者居多。为了解决事情多、贡献者少的问题，我选择使用 Ant Design 作为 UI 组件库、使用 Ant Design Pro 作为项目脚手架，直接原因是那段时间社区以中国开发者居多，采用文档清晰、产品质量高的 Ant Design 作为项目基础组件，会降低中国开发者的贡献门槛，唯一缺点是 Ant Design 在中国太流行了，许多项目的 Dashboard 长得非常像。

![image](https://user-images.githubusercontent.com/2106987/162698228-e3f277f6-e488-423a-9cf1-9d510017b3ba.png)

从下图可见，自 2020 年中到年末，Dashboard 贡献者数量在明显地上升。来自中国、印度的贡献者们，从一些国际化内容修改到大块模块地开发，为 Dashboard 项目添砖加瓦。其中，有几位贡献者的故事令人瞩目，我会在另一篇文章进行记述。

![image](https://user-images.githubusercontent.com/2106987/162700882-28d78189-a52d-40c5-92d0-4c26ab2eae68.png)

## 社区

中学时我对 Web 渗透技术非常感兴趣，会在各种技术论坛中学习、交流，那时我便经常听到“社区”这个词。2016 年，我参与到了 freeCodeCamp 中文社区中，并与 Miya 等人参与到中国多个城市站建设当中，以成都、上海、杭州之活跃，并结交了众多志同道合的朋友们。

![image](https://user-images.githubusercontent.com/2106987/162705105-03336b85-6fda-4a1f-a99a-645dc276e344.png)

![WechatIMG783](https://user-images.githubusercontent.com/2106987/162713825-98f0e5e5-d125-43b6-adfb-7f042b81fce3.jpeg)

2019 年参与到开源项目 APISIX 后，我在不断为项目贡献代码之外，也在关注、回复 GitHub、邮件列表的用户问题，并与开源用户进行讨论。随着用户地逐渐增多、讨论越来越频繁，忽然我觉得有“社区”的味道了。

APISIX 项目被捐献给 Apache 软件基金会、2020 年从基金会毕业、拥有众多国内大 B 用户地生产使用案例等，每一个事件都吸引了众多行业用户关注、为社区带来了更多用户与贡献者、为项目带来了更多生产用户的内部反馈与实践。

![image](https://user-images.githubusercontent.com/2106987/162701670-07ef3d7b-ee98-4521-a8a4-9619b27f2078.png)

社区是由人构建的，Apache APISIX 社区是由来自全球各地、有着不同语言与文化的**贡献者、用户以及社区**共同参与维护的。在过去 3 年时间里，我们一直在做这样的事情：

1. 认可、宣传、普及 Apache 文化；
2. 举办线上或线下社区会议，持续关注用户反馈；
3. 帮助不同经验的贡献者参与社区之中；
4. 持续优化项目、丰富文档资料，帮助用户更好地使用产品。

经过不懈的努力与坚持，Apache APISIX 社区贡献者已超过 400 位！🎉

![image](https://user-images.githubusercontent.com/2106987/162698417-d98a744c-d9c3-4a06-a19f-25ba503f95e0.png)

成为 Apache APISIX 贡献者，我们会尝试联系大家并邮寄一份周边以表心意。每当收到来自不同国家的贡献者动态，作为社区建设的一份子，因 TA 们付出的卓越贡献而激动不已、也会为自己感到骄傲与自豪！

![image](https://user-images.githubusercontent.com/2106987/162701345-128c37f6-cf86-418d-b928-7d3381e97359.png)

![image](https://user-images.githubusercontent.com/2106987/162701541-4f1fc7ff-8391-44b1-a4a1-fc52858c4758.png)

## 用户

Apache APISIX 属于基础软件设施的中间件分类，其用户指全球使用 API 的企业。

2019 年末，贝壳找房是已知的首家超大流量生产用户，那时起便每天处理过亿生产流量，Apache APISIX 表现的非常稳定。

想象一下：每乘地铁、出差乘飞机、购买咖啡/奶茶、看哔哩哔哩、使用 WPS 时，这些数字服务的背后都有 Apache APISIX 的存在，这种感觉是多么的棒！

我们还有许多生产用户，请访问[https://apisix.apache.org/showcase](https://apisix.apache.org/showcase) 了解更多。

![image](https://user-images.githubusercontent.com/2106987/162713112-008cb59b-62d4-46e2-ac85-f86660ddd63c.png)

## 认可

2019 年刚参与 Apache APISIX 时，仅仅是因为它是一个开源项目、自己一直希望深度参与到一个开源项目当中，在 2019 年 10 月份，温铭 告诉我项目成功捐赠到了 Apache Software Foundation，在毕业之前叫做 `apache/incubator-apisix`，我被邀请进入 `initial committer`。我记得很清楚：那天在办公室，内心充满欣喜地打印 Apache CLA 文件，并签名、拍照、上传，然后拥有了自己的 Apache ID `juzhiyuan`！！！🎉

2020 年，项目从 Apache 软件基金会毕业后，自己成为了正式的 **Apache APISIX PMC 成员**，除了贡献代码外也在积极维护社区建设，帮助、观察新的贡献者并选举优秀的贡献者加入 Committer。到目前为止，我已成功推选 8 位优秀的 Committer，其中 2 现在是 Apache APISIX PMC 成员。

![image](https://user-images.githubusercontent.com/2106987/162702077-452b15eb-e19c-439a-9189-5c8314e8abdb.png)

2022 年 3 月某一天早上，自己收到了 Apache Member 邀请邮件，这是多么惊喜的事情呀！意味着自己除了关注 Apache APISIX 社区之外，也有了更多的责任与义务，与各位共同维护、发展 Apache 软件基金会。为此，社区专门采访了我，请阅读[琚致远：95 后 Apache Member 的成长之路](https://juzhiyuan.me/blog/apache-member/)。

![image](https://user-images.githubusercontent.com/2106987/162713644-d02c7703-e9fb-4da7-a2ef-e6b4f6fb3355.png)

## 时间线

![image](https://user-images.githubusercontent.com/2106987/162705307-9094bd79-0c83-443d-a92d-5f326ab714f5.png)

![image](https://user-images.githubusercontent.com/2106987/162712207-d56bf462-f95b-45ef-a736-1332d857d97a.png)

![image](https://user-images.githubusercontent.com/2106987/162712248-b57bb857-1421-442a-8e46-c68dceb1b262.png)

![image](https://user-images.githubusercontent.com/2106987/162712296-1dac65bd-5357-4c0d-a0ea-4586141dc52c.png)

![image](https://user-images.githubusercontent.com/2106987/162712345-8be5f13a-2275-4e58-9966-13e6df70c71c.png)

![image](https://user-images.githubusercontent.com/2106987/162712402-26653cd0-d7f1-4fa5-9a18-8ad174f3d785.png)

![Summer 2020](https://user-images.githubusercontent.com/2106987/162712487-794f706d-bbb0-4cf2-bafc-6a43b025df56.png)

![image](https://user-images.githubusercontent.com/2106987/162712551-4cb7c299-cf9b-4485-9cef-81aae66ac885.png)

![image](https://user-images.githubusercontent.com/2106987/162712598-493cac88-6c26-44be-9a73-69631c79a220.png)

![image](https://user-images.githubusercontent.com/2106987/162712654-eadcda90-193a-4f50-9243-05fd3b2222c4.png)

![image](https://user-images.githubusercontent.com/2106987/162712693-74313e1c-690e-4ebb-8949-3a5f628f4afb.png)

![image](https://user-images.githubusercontent.com/2106987/162712745-680c0e7c-06e9-440f-8c30-a359995be510.png)

![image](https://user-images.githubusercontent.com/2106987/162712781-d6d2454d-5601-40c9-9833-779755693cef.png)

![image](https://user-images.githubusercontent.com/2106987/162712845-2d2350eb-1e48-46e3-ba7e-58553bd53ee1.png)

![image](https://user-images.githubusercontent.com/2106987/162712981-da79b4ae-9dd7-43df-9263-a30f0117634e.png)

![image](https://user-images.githubusercontent.com/2106987/162713018-e792f9c7-b92d-49a5-9d4b-9a143b5f43d5.png)

![image](https://user-images.githubusercontent.com/2106987/162713057-c72c011d-ac21-4db9-9781-595ead428d59.png)

![image](https://user-images.githubusercontent.com/2106987/162713171-317e06c1-3b5a-4a79-86e8-05fcf16dee5b.png)

![image](https://user-images.githubusercontent.com/2106987/162713233-94a26b18-92ad-47f8-9364-074e9b8b8c2c.png)

![image](https://user-images.githubusercontent.com/2106987/162713286-9edc4a7a-624b-4410-960a-0551c4cb99ef.png)

![image](https://user-images.githubusercontent.com/2106987/162713319-240822be-016d-4828-a900-ae86be3d407b.png)

![image](https://user-images.githubusercontent.com/2106987/162713370-934362dc-a13c-42de-8811-de50383ee386.png)

![image](https://user-images.githubusercontent.com/2106987/162713409-dd1f19ee-080d-48c0-9f19-c848f25b3b46.png)

![image](https://user-images.githubusercontent.com/2106987/162713460-d92304ab-132f-4fae-9b9a-31389740152c.png)

![image](https://user-images.githubusercontent.com/2106987/162713506-ec81b424-0ba0-4d1b-8c35-2a983669acff.png)

![image](https://user-images.githubusercontent.com/2106987/162713549-b3fb5936-9f75-4e23-ae77-07d3bdb0c3f8.png)

![image](https://user-images.githubusercontent.com/2106987/162713597-2a7c1247-6e11-45cf-a721-e244ea3831e3.png)

![image](https://user-images.githubusercontent.com/2106987/162713775-13dccd83-f0d9-41cd-af82-937aff355f10.png)
