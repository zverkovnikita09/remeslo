const fs = require("fs/promises");
const resolveRoot = require("./resolveRoot");
const createPublicApi = require("./createPublicApi");
const createUI = require("./createUI");
const { firstCharUpperCase } = require("./firstCharChangeCase");

module.exports = async (layer, sliceName) => {
  try {
    await fs.mkdir(resolveRoot("src", layer, firstCharUpperCase(sliceName)));
  } catch (e) {
    console.log(e);
  }

  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
};

