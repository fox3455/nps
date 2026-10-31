import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { ignores: ["dist/"] },
  pluginJs.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      semi: "error",
      "prefer-const": "error"
    }
  }
];
