import { t } from "elysia";

export interface QueryProps {
  name?: string;
  type?: string;
}

export interface BodyProps {
  name: string; 
  type: "folder" | "file"; 
  parent_id?: number; 
  size?: number;
}

export interface ParamsProps {
  id?: number;
  parent_id?: number; 
}

export const bodySchema = {
  body: t.Object({
    name: t.String(),
    type: t.Union([t.Literal("folder"), t.Literal("file")]),
    parent_id: t.Optional(t.Number()),
    size: t.Optional(t.Number()),
  }),
}

export const bodyEditSchema = {
  body: t.Object({
    name: t.String(),
    type: t.Union([t.Literal("folder"), t.Literal("file")]),
  }),
}

export const querySchema = {
  query: {
    name: t.String(),
    type: t.Union([t.Literal("folder"), t.Literal("file")]),
  }
}
