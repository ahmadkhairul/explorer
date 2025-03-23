import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { getFiles, createFiles, deleteFiles, updateFiles } from "./controllers/files/files.api";
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
    .get("/files", getFiles)
    .get("/files/:parent_id", getFiles)
    .post("/files", createFiles)
    .put("/files/:id", updateFiles)
    .delete("/files/:id", deleteFiles)
);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
