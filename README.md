# babel-plugin-remove-module

一个可以根据当前运行环境移除当前环境之外的babel插件.场景:例如有些代码只存在于开发环境,而不发布到测试环境.或者只存在于开发和测试环境,而不发布到生产环境

## Installation

```sh
$ npm install babel-plugin-remove-module
```

## Usage

**.babelrc**

```javascript
{
  "plugins": ["babel-plugin-remove-module",{
      // 假设本地的环境变量有这些 ['dev','test','staging','prod']
      currentEnv: process.env.CURRENT_ENV // 假设你的项目中是用CURRENT_ENV作为环境变量.
  }]
}
```


```javascript
// 如果当前的currentEnv === 'dev',那么此时下面的c2和c3模块会被移除掉.
import(/* environment: "dev" */ "@/component/c1")
import(/* environment: "test" */ "@/component/c2")
import(/* environment: "uat" */ "@/component/c3")
import(/* environment: "dev|uat" */ "@/component/c3") // 多条件并存的情况.
import(/* environment: "dev|uat|prod" */ "@/component/c3") // 多条件并存的情况.
```


