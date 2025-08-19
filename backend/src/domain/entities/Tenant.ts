export interface TenantProps {
    id: string;
    subdomain?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Tenant {
  public readonly id: string;
  public readonly subdomain?: string;
  public name?: string;             
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: TenantProps) {
    this.id = props.id;
    this.subdomain = props.subdomain;
    this.name = props.name;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  rename(newName: string) {
    if (!newName || newName.length < 3) {
      throw new Error("Tenant name must be at least 3 characters long");
    }
    this.name = newName;
    this.updatedAt = new Date();
  }
}
