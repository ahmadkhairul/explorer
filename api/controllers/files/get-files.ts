import { db } from "../../db/db";
import { files } from "../../db/schema";
import { and, isNull, ilike } from "drizzle-orm";
import { t } from "elysia";

export const getFiles = async ({
  query
}: {
  query: { search: string }
}) => {
  try {
    const isSearch = query?.search ? ilike(files.name, `%${query.search}%`) : isNull(files.parent_id)
    const data = await db
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
          isSearch,
          isNull(files.deleted_at),
        )
      );

    if (data.length > 0) {
      return {
        code: 200,
        message: "Success Retrieved Data",
        data,
      };
    }

    return {
      code: 404,
      message: "Anda belum memiliki file",
      data: null,
    };

  } catch (error) {

    return {
      code: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};

export const getFilesSchema = {
  query: t.Object({
    search: t.String(),
  }),
};

