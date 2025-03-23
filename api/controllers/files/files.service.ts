import { db } from "../../db/db";
import { files } from "./files.schema";
import { eq, and, isNull, ilike } from "drizzle-orm";
import {
  type BodyProps,
  type ParamsProps,
  type QueryProps
} from "../../types/files";

export class FileService {
  query?: QueryProps;
  params?: ParamsProps;
  body?: BodyProps;

  constructor(query?: QueryProps, params?: ParamsProps, body?: BodyProps) {
    this.query = query;
    this.params = params;
    this.body = body;
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
    const { name, type, parent_id, size } = body;

    return await db.insert(files).values({
      name,
      type,
      parent_id: parent_id ?? null,
      size: type === "file" ? size ?? 0 : 0,
    }).returning();
  }

  async update(params: ParamsProps, body: BodyProps) {
    const { id } = params;
    const { name, type } = body;

    return await db.update(files).set({
      name,
      type
    }).where(eq(files.id, Number(id))).returning();
  }

  async delete(params: ParamsProps) {
    return await db
      .update(files)
      .set({ deleted_at: new Date() })
      .where(eq(files.id, Number(params.id)))
      .returning();
  }
}