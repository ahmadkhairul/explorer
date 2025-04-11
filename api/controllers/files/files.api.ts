import type { Context } from "elysia";
import path from "path";
import fs from "fs/promises";

import { FileService } from "@/controllers/files/files.service";
import { responseFormat } from "@/helper/response";
import type { BodyProps } from "@/types/files";
import { currentUser, randStr } from "@/helper/utils";

const fileService = new FileService();

export const findFiles = async (ctx: Context) => {
  const { id } = await currentUser(ctx);
  const { params } = ctx;
  return responseFormat(
    fileService.findOne(Number(params.id), Number(id)),
    ctx
  );
};

export const getFiles = async (ctx: Context) => {
  const { id } = await currentUser(ctx);
  const { query, params } = ctx;
  return responseFormat(
    fileService.get(query, { ...params, user_id: id }),
    ctx
  );
};

export const createFiles = async (ctx: Context<{ body: BodyProps }>) => {
  const { id } = await currentUser(ctx);
  // @ts-ignore
  const file = await ctx.body?.file;
  const parent_id = ctx.body?.parent_id;
  let name = ctx.body?.name;

  let filePath = null;
  let size = 0;
  let type = "folder";

  if (file) {
    const savePath = path.resolve("uploads", randStr(5) + file.name);
    const buffer = await file.arrayBuffer();
    await fs.writeFile(savePath, Buffer.from(buffer));

    filePath = "./uploads/" + randStr(5) + file.name;
    size = file.size;
    name = file.name;
    type = "file";
  }

  const data = {
    name,
    type,
    parent_id,
    size,
    path: filePath,
    user_id: id,
  } as BodyProps;

  return responseFormat(fileService.create(data), ctx);
};

export const updateFiles = async (ctx: Context) => {
  const { id } = await currentUser(ctx);
  const { body, params } = ctx;
  return responseFormat(
    fileService.update({ ...params, user_id: id }, body as BodyProps),
    ctx
  );
};

export const deleteFiles = async (ctx: Context) => {
  const { id } = await currentUser(ctx);
  const { params } = ctx;
  return responseFormat(fileService.delete({ ...params, user_id: id }), ctx);
};
