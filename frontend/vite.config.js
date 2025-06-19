import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

// import { defineConfig } from "vite";

// export default defineConfig({
//   optimizeDeps: {
//     exclude: ["jsonwebtoken", "buffer", "safe-buffer"], // Exclude Node-specific modules
//   },
//   define: {
//     global: {},
//     "process.env": process.env?.NODE_ENV === "development" ? {} : undefined,
//   },
//   build: {
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       buffer: "buffer",
//     },
//   },
//   define: {
//     global: {},
//   },
// });
