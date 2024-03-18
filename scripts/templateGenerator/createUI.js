const fs = require("fs/promises");
const resolveRoot = require("./resolveRoot");
const {
  firstCharUpperCase,
  firstCharLowerCase,
} = require("./firstCharChangeCase");
const componentTemplate = require("./сomponentTemplate");
const styleTemplate = require("./styleTemplate");

module.exports = async (layer, sliceName) => {
  const resolveUIPath = (...segments) =>
    resolveRoot("src", layer, sliceName, "ui", ...segments);

  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (e) {
      console.log("Не удалось создать UI директорию", e);
    }
  };

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName);
      await fs.mkdir(resolveUIPath(componentName));
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName)
      );
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        styleTemplate(firstCharLowerCase(componentName))
      );
    } catch (e) {
      console.log("Не удалось создать компонент", e);
    }
  };

  await createUIDir();
  await createComponent();
};

