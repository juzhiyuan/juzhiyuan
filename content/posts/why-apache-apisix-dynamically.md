---
date: 2021-12-29T08:00:00Z
title: "Apache APISIX 动态能力原理"
image: "https://static.juzhiyuan.me/images/2022/12/09/IMG_1688.JPG"
tags: ["Apache APISIX"]
---

Apache APISIX 作为 API 网关，在更新路由规则、上游节点配置、SSL 证书等配置时是无需重启服务的，只需要调用 RESTful API 即可毫秒级生效，避免重启服务、加载配置导致业务中断，否则一是重启服务期间有一定量的请求无法被正确处理，二是会导致 WebSocket 长连接客户端中断，非常影响客户端用户体验，从而进一步导致业务数据下滑。 Apache APISIX 的全动态能力与其运行机制密不可分，下图为 Apache APISIX 对请求的处理流程：

{{< figure src="https://user-images.githubusercontent.com/2106987/150668642-4c517f55-9635-4fb4-af62-91ec65a7b1cb.png" >}}

Apache APISIX 启动时会从 ETCD 读取配置并加载到内存中以生成 Router（路由器），请求进入后 Router 会根据预设规则对请求特征进行匹配分析，当管理员通过 AdminAPI 下发配置到 ETCD，ETCD 便会主动通知 Apache APISIX 节点动态更新内存中配置生成新的 Router、借助 Lua 更改运行时行为，以此来实现动态能力。相比较而言，在 Nginx 中更新配置后需要 reload 服务才可生效，这是因为它的路由表来源于静态配置文件，而 Apache APISIX 是基于内存，因此 Apache APISIX 可以动态生成与构建。值得一提的是，Apache APISIX 支持了多种 Router 来处理东西、南北向流量，其中：

- radixtree_host_uri：南北向流量作为业务流量出入口，需先判断 Host 再判断 URI，适用于该路由器算法；
- radixtree_uri：集群内服务间东西向流量在请求匹配时更关注 URI 参数，适用于该路由器算法，省掉 Host 判断效率更高。 南北向流量主要根据 Host 做反向代理，由于业务演变地愈加复杂，因此需要更细颗粒度的匹配与控制，于是 Apache APISIX 针对不同场景下流量处理有着更有优的处理方式。