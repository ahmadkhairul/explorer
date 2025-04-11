import bcrypt from "bcrypt";
import { type Context } from "elysia";

import {
  returnNonSuccess,
  returnSuccess,
} from "@/helper/response";
import type { ContextLoginProps, ParamsProps } from "@/types/users";
import { UserService } from "@/controllers/users/users.service";

const userService = new UserService();

export const login = async (ctx: ContextLoginProps) => {
  const { body, jwt } = ctx;
  try {
    const user = await userService.get(body as ParamsProps);
    if (!user[0]?.password) throw "error";

    const { password, ...rest } = user[0];

    const isMatch = await bcrypt.compare(body.password, password as string);
    if (!isMatch) throw "error";

    const token = await jwt.sign(rest);
    return returnSuccess(ctx, 200, "login success", { token });
  } catch (err) {
    return returnNonSuccess(ctx, 403, "username atau password salah");
  }
};
