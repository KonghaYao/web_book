import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
export default defineConfig({
    optimizeDeps: {
        exclude: ["@cn-ui/core", "@cn-ui/reactive"],
    },
    plugins: [solid(), UnoCSS()],
});
