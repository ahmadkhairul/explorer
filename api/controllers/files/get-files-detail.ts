import { db } from "../../db/db";
import { files } from "../../db/schema";
import { and, isNull, eq } from "drizzle-orm";

export const getFileDetail = async ({
  params
}: {
  params: { parent_id: number }
}) => {
  try {
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
          eq(files.parent_id, Number(params.parent_id)),
          isNull(files.deleted_at)
        )
      )
      .orderBy(files.name);

    if (data.length > 0) {
      return {
        code: 200,
        message: "Success Retrieved Data",
        data,
      };
    }

    return {
      code: 404,
      message: "Folder ini masih kosong",
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
