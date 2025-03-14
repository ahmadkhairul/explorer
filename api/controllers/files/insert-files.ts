import { t } from "elysia";
import { db } from "../../db/db";
import { files, type File } from "../../db/schema";

export const upsertFile = async ({
  body
}: {
  body: {
    name: string;
    type: "folder" | "file";
    parent_id?: number;
    size?: number
  }
}): Promise<
  {
    code: number; message: string; data: File | null
  }
> => {
  try {
    const { name, type, parent_id, size } = body;

    const [newData] = await db.insert(files).values({
      name,
      type,
      parent_id,
      size: type === "file" ? size : 0
    }).returning();

    if (newData) {
      return {
        code: 200,
        message: "Success Created Data",
        data: newData,
      };
    }

    return {
      code: 404,
      message: "Gagal membuat file/folder baru",
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

export const upsertFileSchema = {
  body: t.Object({
    name: t.String(),
    type: t.Union([t.Literal("folder"), t.Literal("file")]),
    parent_id: t.Optional(t.Number()),
    size: t.Optional(t.Number()),
  }),
};
