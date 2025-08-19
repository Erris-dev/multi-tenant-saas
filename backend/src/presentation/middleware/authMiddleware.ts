import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/external/jwtService";
import { UserPayload } from "../../infrastructure/external/jwtService";

const jwtService = new JwtService();

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload | null;
    }
  }
}

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  console.log("--> Starting authCheck middleware");
  const token = req.cookies.authToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }

  try {
    const decodedUser = jwtService.verifyToken(token);

    if (!decodedUser) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decodedUser;

    console.log("--> AuthCheck: Success, calling next()");

    next();
  } catch (err: any) {
    console.error("Authentication error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
