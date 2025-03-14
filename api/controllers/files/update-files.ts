
import { t } from "elysia";
import { db } from "../../db/db";
import { files, type File } from "../../db/schema";
import { eq } from "drizzle-orm";

export const updateFile = async ({
  params,
  body
}: {
  params: { id: number };
  body: { name: string; }
}): Promise<
  {
    code: number; message: string; data: File | null
  }
> => {
  try {
    const { id } = params;
    const { name } = body;

    const [updatedData] = await db.update(files).set({
      name,
    }).where(eq(files.id, Number(id))).returning();

    if (updatedData) {
      return {
        code: 200,
        message: "Success Updated Data",
        data: updatedData,
      };
    }

    return {
      code: 404,
      message: "Gagal mengupdate file/folder",
      data: null,
    };

  } catch (error) {
    return {
      code: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export const editFileSchema = {
  body: t.Object({
    name: t.String(),
  }),
};