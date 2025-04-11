import { and, eq, ilike, isNull } from "drizzle-orm";

import { db } from "@/db/db";
import {
  type BodyProps,
  type ParamsProps,
  type QueryProps,
} from "@/types/files";
import { files } from "@/controllers/files/files.schema";

export class FileService {
  query?: QueryProps;
  params?: ParamsProps;
  body?: BodyProps;

  constructor(query?: QueryProps, params?: ParamsProps, body?: BodyProps) {
    this.query = query;
    this.params = params;
    this.body = body;
  }

  async findOne(id?: number, user_id?: number) {
    const [file] = await db
      .select()
      .from(files)
      .where(eq(files.id, Number(id)));

    if (!file) throw new Error("File not found");
    if (file.user_id !== user_id) throw new Error("Unauthorized");

    return file;
  }

  async get(query?: QueryProps, params?: ParamsProps) {
    return await db
      .select({
        id: files.id,
        name: files.name,
        parent_id: files.parent_id,
        type: files.type,
        size: files.size,
      })
      .from(files)
      .where(
        and(
          params?.user_id !== undefined
            ? eq(files.user_id, Number(params.user_id))
            : undefined,
          params?.parent_id !== undefined
            ? eq(files.parent_id, Number(params.parent_id))
            : isNull(files.parent_id),
          query?.name ? ilike(files.name, `%${query.name}%`) : undefined,
          query?.type ? ilike(files.type, `%${query.type}%`) : undefined,
          isNull(files.deleted_at)
        )
      );
  }

  async create(body: BodyProps) {
    const { name, type, parent_id, size, user_id, path } = body;

    return await db
      .insert(files)
      .values({
        name,
        type,
        path,
        user_id: Number(user_id),
        parent_id: parent_id ? Number(parent_id) : null,
        size: type === "file" ? (size ?? 0) : 0,
      })
      .returning();
  }

  async update(params: ParamsProps, body: BodyProps) {
    const { id, user_id } = params;
    const { name, type, parent_id } = body;
    await this.findOne(id, user_id);

    return await db
      .update(files)
      .set({
        name,
        type,
        ...(parent_id && { parent_id: Number(parent_id) }),
      })
      .where(eq(files.id, Number(id)))
      .returning();
  }

  async delete(params: ParamsProps) {
    const { id, user_id } = params;
    await this.findOne(id, user_id);

    return await db
      .update(files)
      .set({ deleted_at: new Date() })
      .where(eq(files.id, Number(id)))
      .returning();
  }
}
