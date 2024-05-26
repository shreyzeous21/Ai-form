import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://portfolio_manager_owner:PR4Uvg5erzLp@ep-polished-cake-a5zi2gww.us-east-2.aws.neon.tech/Form_ai?sslmode=require',
  }
});