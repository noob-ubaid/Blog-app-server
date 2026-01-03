import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export const authentication = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
      headers : req.headers as any
    })
    console.log(session)
    next()
  };
};
