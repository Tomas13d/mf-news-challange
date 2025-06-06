import { Request, Response } from "express";
import * as AuthService from "../../services/auth";

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const user = await AuthService.registerUser(email, password, name);
    const { password: ps, ...restUser } = user;
    res.status(201).json(restUser);
    return;
  } catch (err: any) {
    res.status(400).json({ error: err.message });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await AuthService.loginUser(email, password);
    const { password: ps, ...restUser } = user;
    res.json({ user: restUser, token });
    return;
  } catch (err: any) {
    res.status(401).json({ error: err.message });
    return;
  }
};
