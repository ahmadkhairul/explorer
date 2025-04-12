import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";

import { login } from "@/controllers/auth/auth.api";
import {
  createFiles,
  deleteFiles,
  findFiles,
  getFiles,
  updateFiles,
} from "@/controllers/files/files.api";
import {
  createUsers,
  deleteUsers,
  getUsers,
  updateUsers,
} from "@/controllers/users/users.api";
import {
  bodySchema as fileBodySchema,
  bodyEditSchema as fileBodyEditSchema,
} from "@/types/files";
import { bodySchema as userBodySchema } from "@/types/users";

const app = new Elysia();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(
  jwt({
    name: "jwt",
    secret: process.env.APP_DATA_JWT_SECRET || "tdr-3000",
    exp: "2h",
  })
);

app.use(
  staticPlugin({
    prefix: "/uploads",
    assets: "./uploads",
  })
);

app.post("/api/v1/login", login);
app.post("/api/v1/register", createUsers, userBodySchema);
app.group("/api/v1", (app) =>
  app
    // @ts-ignore
    .onBeforeHandle(async ({ jwt, headers, set }) => {
      try {
        const header = headers.authorization;
        if (!header || !header.startsWith("Bearer "))
          throw new Error("No token");

        const token = header.split(" ")[1];
        if (!token) throw new Error("Token invalid");

        const user = await jwt.verify(token);
        if (!user) throw new Error("Token invalid");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Forbidden";
        return (set.status = 403), { message };
      }
    })
    .get("/files", getFiles)
    .get("/folder/:parent_id", getFiles)
    .get("/files/:id", findFiles)
    .post("/files", createFiles, fileBodySchema)
    .put("/files/:id", updateFiles, fileBodyEditSchema)
    .delete("/files/:id", deleteFiles)

    .get("/user", getUsers)
    .put("/user", updateUsers, userBodySchema)
);

app.group("/api-admin/v1", (app) =>
  app
    // @ts-ignore
    .onBeforeHandle(async ({ jwt, headers, set }) => {
      try {
        const header = headers.authorization;
        if (!header || !header.startsWith("Bearer "))
          throw new Error("No token");
    
        const token = header.split(" ")[1];
        if (!token) throw new Error("Token invalid");
    
        const user = await jwt.verify(token);
        if (!user || (user && user.role !== 'admin')) throw new Error("Token invalid");

      } catch (err) {
        const message = err instanceof Error ? err.message : "Forbidden";
        return (set.status = 403), { message };
      }
    })
    .get("/users", getUsers)
    .get("/users/:id", getUsers)
    .delete("/users/:id", deleteUsers)
);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
