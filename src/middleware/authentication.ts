import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export const authentication = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }
      console.log(session);
      next();
    } catch (error: any) {
      next(error);
    }
  };
};
