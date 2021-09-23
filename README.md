# Tunnel

Tunnel 是一个开发环境的接口实时查看工具

用以实时查看自己开发的接口的请求和相应信息，以及请求耗时，数据库，redis等信息。
类似 Laravel Telescope。

不同于 Telescope 仅服务于 Laravel，Tunnel 被设计为一个支持多用户(在整个开发团队内部使用)、多应用的开发工具。

## 内容列表

- [背景](#背景)
- [安装](#从源码安装)
- [使用说明](#使用说明)
    - [后端接入](#后端接入)
- [TODO](#TODO)  
- [维护者](#维护者)
- [如何贡献](#如何贡献)
- [使用许可](#使用许可)

## 背景

`Tunnel` 是我在 `MOMO` 公司供职是使用的开发工具的名字，当我离开 `MOMO` 之后，我一直想寻找一个类似的工具却无所得，
一个休息日的下午我想，不如自己开发一个。

得益于最近工作的 Nodejs 开发经验，我选择了 Nest.js 与 socket.io 迅速开发出了后端服务。
前端我选择了使用 React + Github primer，所以整体的风格看起来和 Github 有些相像。

其主要原理是后端应用把请求信息通过接口发送给 Tunnel 服务，Tunnel 会实时把数据推送给正在监听的 Web 端。
目前监听的维度是`用户`，所以推送的数据内必须包含`username`信息，以后会增加设备等维度的监听。

> 项目还在开发之中，部分功能还未实现。

## 从源码安装

这个项目使用 [node](http://nodejs.org) 和 [pnpm](https://pnpm.io)。请确保你本地安装了它们。

安装依赖
```sh
$ pnpm install -r
```

生成 sqlite 数据库
```sh
$ cd packages/server
$ pnpm prisma db push
```

构建
```sh
$ pnpm build -r
```

执行
```sh
$ node build/server/main.js
```
部署的时候只需要 build 文件夹下的内容即可。

## 使用说明
在页面顶部输入账号，然后点击开始，就开始监听来自服务端的推送的请求数据。

左侧的表格是请求的`域名`和`Path`等信息，点击行右侧显示请求的详细信息。

还可以通过顶部搜索框按照`Paht`过滤。

### 后端接入

后端需要在请求完成后，组装符合格式的数据推送给 Tunnel 服务。

推送接口为 `POST /logRequest`，body 为 json 格式，具体如下：
```json
{
    "user":{
        "username":"zhang_san"
    },
    "data":{
        "requestId":"a319fdbd-791f-4450-875f-4c7a8bb711d3",
        "domain":"github.com",
        "method":"GET",
        "path":"/mx1700/tunnel",
        "duration":45,
        "time":1632056013000,
        "request":{
            "query":"a=1&b=2",
            "body":{
                "a":1
            },
            "headers":{
                "host":"github.com"
            }
        },
        "response":{
            "status":200,
            "body":{
                "ec":200,
                "em":"OK"
            },
            "headers":{
                "vary":"Origin"
            }
        }
    }
}
```
`username` 为前端监听的账号名

`data.requestId` 请求的唯一 id，建议使用 uuid

`request.body` 和 `response.body` 目前都仅支持 json 格式

## TODO

- [x] 数据存储
- [x] 历史数据自动清理
- [x] 历史查询
- [ ] 分享

## 维护者

[@mx1700](https://github.com/mx1700)

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/mx1700/tunnel/issues/new) 或者提交一个 Pull Request。

## 使用许可

[MIT](LICENSE)
