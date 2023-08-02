const { merge } = require('webpack-merge');
const loadSharedConfig = require('./configs/shared');

const loadModeConfig = env => {
  const modeConfig = require(`./configs/${env.mode}`)(env);
  return modeConfig;
};

module.exports = function (env) {
  env.mode = env.mode || 'development';
  return merge(loadSharedConfig(env), loadModeConfig(env));
};

// This module is a part of a Webpack configuration setup. It's responsible for loading and merging different configuration objects based on the specified environment mode:

// 1. **Import Statements:**

//    ```javascript
//    const { merge } = require('webpack-merge');
//    const loadSharedConfig = require('./configs/shared');
//    ```

//    - The `merge` function is imported from the 'webpack-merge' package. This function is used to merge multiple webpack configuration objects.
//    - The `loadSharedConfig` function is imported from a local file named `'./configs/shared'`. It's assumed that this function returns a webpack configuration object containing shared configuration settings.

// 2. **`loadModeConfig` Function:**

//    ```javascript
//    const loadModeConfig = env => {
//      const modeConfig = require(`./configs/${env.mode}`)(env);
//      return modeConfig;
//    };
//    ```

//    - This function takes an `env` object as an argument. It's expected that the `env` object contains a `mode` property indicating the environment mode ('development', 'production', etc.).
//    - It dynamically imports a webpack configuration module based on the provided `mode` using a template literal. It then immediately calls the imported module function with the `env` object and assigns the result to `modeConfig`.
//    - The function returns the `modeConfig` object.

// 3. **Exported Function:**

//    ```javascript
//    module.exports = function (env) {
//      env.mode = env.mode || 'development';
//      return merge(loadSharedConfig(env), loadModeConfig(env));
//    };
//    ```

//    - This function is the main exported function of the module. It takes an `env` object as an argument, which is expected to contain the environment mode.
//    - If `env.mode` is not provided, it defaults to `'development'`.
//    - It then calls the `loadSharedConfig` function and the `loadModeConfig` function with the `env` object, and merges their results using the `merge` function from 'webpack-merge'.
//    - The merged configuration is returned.

// Overall, this module serves as a mechanism to load different webpack configuration settings based on the specified environment mode (`'development'`, `'production'`, etc.). It dynamically imports configuration modules for the specific mode and merges them with a shared configuration. This approach allows for a flexible and modular webpack configuration setup based on different environments.
