const handleRemove = ({ path, data, removeParent = false, currentEnv }) => {
  const index = data.findIndex((item) => Array.isArray(item.leadingComments));
  if (index > -1) {
    const reg = /\s{0,}environment\s{0,}:\s{0,}['|"](.*)['|"]\s{0,}/;
    const [leadingComments] = data[index].leadingComments;
    const matchList = leadingComments?.value?.match(reg);
    if (matchList) {
      const [originValue, matchValue] = matchList;
      const envList = matchValue.split("|");
      const includeCurrentEnv = envList.includes(currentEnv);
      if (includeCurrentEnv) {
        path.skip();
        return;
      }
      removeParent ? path.parentPath.remove() : path.remove();
      path.skip();
    }
  }
};
module.exports = function ({ types: t }, { currentEnv = "dev" }) {
  return {
    visitor: {
      MemberExpression(path) {
        path.parentPath.isCallExpression() &&
          Array.isArray(path.node.object.arguments) &&
          handleRemove({
            path: path,
            data: path.node.object.arguments,
            removeParent: true,
            currentEnv,
          });
      },
      CallExpression(path) {
        handleRemove({ path: path, data: path.node.arguments, currentEnv });
      },
      ObjectExpression(path) {
        handleRemove({
          path,
          data: path.node.properties,
          removeParent: t.isVariableDeclarator(path.parentPath), 
          currentEnv,
        });
      },
    },
  };
};
