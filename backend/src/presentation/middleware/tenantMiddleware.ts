import { Request, Response, NextFunction } from "express";
import { PostgreTenantRepository } from "../../infrastructure/repositories/postgreTenantRepo";

const tenantRepo = new PostgreTenantRepository();

declare global {
  namespace Express {
    interface Request {
      tenantId?: string | null;
    }
  }
}

export const tenantCheck = async (req: Request, res: Response, next: NextFunction) => {
  const subdomain = Array.isArray(req.headers["x-subdomain"])
    ? req.headers["x-subdomain"][0]
    : req.headers["x-subdomain"];

  if (!subdomain) {
    return res.status(400).send("Subdomain is required.");
  }

  try {
    const tenant = await tenantRepo.findBySubdomain(subdomain);

    if (!tenant) {
      return res.status(404).send("Tenant not found.");
    }

    (req as any).tenantId = tenant.id;

    next();
  } catch (err: any) {
    console.error("Tenant check error:", err.message);
    return res.status(500).send("Internal server error.");
  }
};