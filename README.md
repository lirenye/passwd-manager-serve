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
    maxLength: [8, '用户名大于8个字符'],
    trim: true
  },
  password: {
    type: String,
    required: [true, '没有密码'],
    minLength: [6, '密码小于6个字符'],
    maxLength: [10, '密码大于10个字符'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '没有电子邮箱'],
    maxLengh: [30, '电子邮箱最大30个字符'],
    trim: true
  },
  code: {
    type: String,
    minLength: [6, '验证码小于6个字符'],
    maxLength: [6, '验证码大于6个字符'],
    trim: true
  },
  CodeLastTime: {
    type: String,
    maxLength: [30, '验证码过期时间戳长度大于30个字符'],
    trim: true
  }
 })
 ```
 - account  
 存储账户信息
 ```js
 Schema({
  author: {
    type: string,
    required: [true, '没有所属者']
  },
  platform: {
    type: String,
    required: [true, '没有平台名称'],
    maxLength: [10,  '平台名词大于10个字符'],
    trim: true
  },
  username: {
    type: String,
    required: [true, '没有用户名'],
    maxLength: [16, '用户名大于16个字符'],
    trim: true
  },
  password: {
    type: String,
    required: [true, '没有密码'],
    maxLength: [20, '密码大于20个字符'],
    trim: true
  },
  email: {
    type: String,
    required: false,
    maxLength: [20, '邮箱地址大于20个字符'],
    default: '',
    trim: true
  },
  mobile: {
    type: String,
    required: false,
    maxLength: [11, '电话号码只有11个字符'],
    default: '',
    trim: true
  },
  remark: {
    type: String,
    required: false,
    maxLength: [30, '备注信息最大30个字符'],
    default: '',
    trim: true
  }
 })
 ```

# 接口

 - 登陆接口
 ```js
 method: post,
 path: /login
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
  type: string,
  value: string
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
path: /account/modify
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

## 验证码接口
 - 获取用户信息，并且验证用户信息、过期时间
 - 生成验证码和过期时间，并存入数据库中
 - 调用函数发送验证码
 - 返回发送结果
```typescript
// request params
method: post
path: '/code'
{
  username: string,
  password: string
}

// response data
{data: null, meta: {status: number, msg: string}}
```