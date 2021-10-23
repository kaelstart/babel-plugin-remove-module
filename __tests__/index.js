"use strict";

const babel = require("@babel/core");
const path = require("path");
test(`测试匹配当前环境`, () => {
  const input = `import(/* environment: "dev" */ './components/global-setting/index')`;
  const { code } = babel.transform(input, {
    plugins: [
      [
        path.join(__dirname, "../src/index"),
        {
          currentEnv: "dev",
        },
      ],
    ],
  });
  expect(code).not.toBe("");
});

test(`测试不匹配当前环境`, () => {
  const input = `import(/* environment: "dev" */ './components/global-setting/index')`;
  const { code } = babel.transform(input, {
    plugins: [
      [
        path.join(__dirname, "../src/index"),
        {
          currentEnv: "uat",
        },
      ],
    ],
  });
  expect(code).toBe("");
});

test(`测试多环境共存情况`, () => {
  const input = `import(/* environment: "dev|uat" */ './components/global-setting/index')`;
  const { code } = babel.transform(input, {
    plugins: [
      [
        path.join(__dirname, "../src/index"),
        {
          currentEnv: "uat",
        },
      ],
    ],
  });
  expect(code).not.toBe("");
});
