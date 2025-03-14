import { db } from "../../db/db";
import { files } from "../../db/schema";
import { eq } from "drizzle-orm";

export const deleteFiles = async ({
  params
}: {
  params: { id: number }
}) => {
  try {
    const data = await db
      .update(files)
      .set({ deleted_at: new Date() })
      .where(
        eq(files.id, Number(params.id))
      );

    if (data) {
      return {
        code: 200,
        message: "Success Deleted Data",
        data: null,
      };
    }

    return {
      code: 404,
      message: "Data Not Found",
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