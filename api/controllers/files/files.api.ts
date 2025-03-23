import type { Context } from "elysia";
import { responseFormat } from "../../helper/response";
import type { BodyProps } from "../../types/files";
import { FileService } from "./files.service";

const fileService = new FileService();

export const getFiles = async (ctx: Context) => {
  const { query, params } = ctx;
  return responseFormat(fileService.get(query, params), ctx);
};

export const createFiles = async (ctx: Context) => {
  const { body } = ctx;
  return responseFormat(fileService.create(body as BodyProps), ctx);
}

export const updateFiles = async (ctx: Context) => {
  const { body, params } = ctx;
  return responseFormat(fileService.update(params, body as BodyProps), ctx);
}

export const deleteFiles = async (ctx: Context) => {
  const { params } = ctx;
  return responseFormat(fileService.delete(params), ctx);
}
