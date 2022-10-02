# 目录
## config
```js
// 存放配置数据
```

# 集合
 - user  
 存储系统用户信息
 ```js
 Schema({
  username: {
    type: String,
    required: [true, '没有用户名'],
    minLength: [4, '用户名小于4个字符'],
    maxLength: [6, '用户名大于6个字符'],
    trim: true
  },
  password: {
    type: String,
    required: [true, '没有密码'],
    minLength: [6, '密码小于6个字符'],
    maxLength: [10, '密码大于10个字符'],
    trim: true
  }
 })
 ```
 - account  
 存储账户信息
 ```js
 Schema({
  platform: {
    type: String,
    required: [true, '没有平台名称'],
    maxLength: [10,  '平台名词大于10个字符'],
    trim: true
  },
  username: {
    type: String,
    required: {true, '没有用户名'},
    maxLength: [10, '用户名大于10个字符'],
    trim: true
  },
  password: {
    type: String,
    required: {true, '没有密码'},
    maxLength: [10, '用户名大于10个字符'],
    trim: true
  },
  email: {
    type: String,
    required: false,
    maxLength: [20, '邮箱地址大于20个字符'],
    trim: true
  },
  mobile: {
    type: String,
    required: false,
    maxLength: [11, '电话号码只有11个字符'],
    trim: true
  },
  remark: {
    type: String,
    required: false,
    maxLength: [30, '备注信息最大30个字符'],
    trim: true
  }
 })
 ```

# 接口

 - 登陆接口
 ```js
 method: post
//  request
{
  username: string,
  password: string,
  code: string
}
// response
{
  data: {
    token: string
  },
  meta: {
    status: number,
    message: string
  }
}
```
 - 查询号信息接口
 ```js
 method: get
 path: /account/info
//  request
 {
  query: string,
  type: enum: {}
 }
//  response
{
  data: [{
    _id: ObjectId,
    platform: string,
    username: string,
    password: string,
    email: string,
    mobile: string,
    remark: string
  }],
  meta: {
    status: number,
    message: string
  }
}
 ```
  - 修改号户信息接口
```js
method: put
path: /account/modifye
// request
Option One
{
  _id: ObjectId,
  platform: string,
  username: string,
  password: string,
  email: string,
  mobile: string,
  remark: string
}

Option Tow
{
  _id: ObjectId,
  modifyed: array[]
}

// response
{
  data: null,
  meta: {
    status: number,
    message: string
  }
}
```
 - 删除账号信息
```js
method: delete
path: /account/delete
// request
{
  _id: ObjectId
}
// response
{
  data: null,
  meta: {
    status: number,
    message: string
  }
}
```
 - 新增账号信息
```js
method: post
path: /account/add
// request
{
  platform: string,
  username: string,
  password: string,
  email: string,
  mobile: string,
  remark: string
}
// response
{
  data: null,
  meta: {
    status: number,
    message: string
  }
}
```