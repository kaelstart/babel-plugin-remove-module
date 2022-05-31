# babel-plugin-remove-module

Babel plugin helps can remove not match environment code.

## Installation

```sh
npm install babel-plugin-remove-module -D
```


or

```bash
yarn add babel-plugin-remove-module -D
```

## options

### currentEnv

The option add currentEnv that can help you set the current run environment.

**Default**: "" `(Required)`

````javascript
// .babel.config.js
{
  "plugins": ["babel-plugin-remove-module",{
      currentEnv: ''
  }]
}
````

## Example

```js
{
  "plugins": ["babel-plugin-remove-module",{
      currentEnv: 'test'
  }]
}
```

```javascript
import(/* environment: "dev" */ "@/component/c1"); // will be remove
import(/* environment: "dev|test" */ "@/component/c2");
import(/* environment: "uat" */ "@/component/c3"); // will be remove
```

origin:
![images](https://i.bmp.ovh/imgs/2022/05/31/45fb110468ea4feb.png)

To:

![images](https://i.bmp.ovh/imgs/2022/05/31/ce4ca9febf446a71.png)
