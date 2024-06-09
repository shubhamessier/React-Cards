import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/card/", // Replace 'your-repo-name' with your actual repository name
  plugins: [react()],
});
