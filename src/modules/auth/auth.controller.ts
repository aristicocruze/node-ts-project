import { Request, Response } from "express";
import { findUserByEmail } from "../user/user.service";
import { StatusCodes } from "http-status-codes";
import { signJwt, verifyJwt } from "./auth.utils";
import omit from "../../helpers/omit";
import { LoginBody } from "./auth.schema";

export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user || !user.comparePassword(password))
    return res.status(StatusCodes.UNAUTHORIZED).send("Invalid credentials");

  const payload = omit(user.toJSON(), ["password"]);

  const jwt = signJwt(payload);

  res.cookie("accessToken", jwt, {
    // 1 day
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN || "localhost",
    path: "/",
    sameSite: "strict",
    secure: false, // change this in production to use https
  });

  return res.status(StatusCodes.OK).send(jwt);
}

// 55:46 youtube video.
