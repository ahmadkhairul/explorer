import { Elysia } from "elysia";
import {
  getFiles,
  getFileDetail,
  getFilesSchema,
  upsertFile,
  upsertFileSchema,
  updateFile,
  deleteFiles,
  editFileSchema,
} from "./controllers/files";
import { cors } from "@elysiajs/cors";

const app = new Elysia();

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Hanya izinkan dari Vue di port 3001
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // ✅ Izinkan hanya method tertentu
    credentials: true, // ✅ Jika ada cookies atau auth
  })
);

app.group('/api/v1', (app) =>
  app
    .get("/files", getFiles, getFilesSchema)
    .get("/files/:parent_id", getFileDetail)
    .post("/files", upsertFile, upsertFileSchema)
    .put("/files/:id", updateFile, editFileSchema)
    .delete("/files/:id", deleteFiles)
);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
