import { Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/auth-use-cases/registerUser";
import { LoginUser } from "../../application/use-cases/auth-use-cases/loginUser";
import { PostgreUserRepo } from "../../infrastructure/repositories/postgreUserRepo";
import { JwtService } from "../../infrastructure/external/jwtService";
import { PostgreTenantRepository } from "../../infrastructure/repositories/postgreTenantRepo";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const repo = new PostgreUserRepo();
    const tenantRepo = new PostgreTenantRepository();
    const jwtService = new JwtService();
    const registerCase = new RegisterUser(repo, tenantRepo, jwtService);

    console.log('1. Starting request processing');


    const { email, fullName, password } = req.body;
    const subdomain = Array.isArray(req.headers["x-subdomain"])
      ? req.headers["x-subdomain"][0]
      : req.headers["x-subdomain"];

    const user = await registerCase.execute({
      email,
      fullName,
      password,
      subdomain,
    });

    res.cookie("authToken", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json("User registered successfully");
  } catch (err: any) {
    console.error("Error registering user");
    res.status(500).json({ error: err.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const repo = new PostgreUserRepo();
    const jwtService = new JwtService();

    const loginCase = new LoginUser(repo, jwtService);

    const user = await loginCase.execute({ email, password });

    res.cookie("authToken", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json("Login successful");
  } catch (err: any) {
    console.error("Error while loggin user");
    res.status(500).json({ error: err.message });
  }
};
