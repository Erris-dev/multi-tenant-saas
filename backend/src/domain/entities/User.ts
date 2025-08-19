export interface UserProps {
    id: string;
    email: string;
    fullName: string;
    passwordHash: string;
    isActive?: boolean;
    tenantId: string;
}

export class User {
    public readonly id: string;
    public email: string;
    public fullName: string;
    private passwordHash: string;
    public isActive: boolean;
    public tenantId: string;

    constructor(props: UserProps) {
        this.id = props.id;
        this.email = props.email;
        this.fullName = props.fullName;
        this.passwordHash = props.passwordHash;
        this.isActive = props.isActive ?? true;
        this.tenantId = props.tenantId;
    }

    deactivate() {
        this.isActive = false;
    }

    activate(){
        this.isActive = true;
    }

    async checkPassword(password: string): Promise<boolean> {
        const bcrypt = await import('bcrypt');
        return bcrypt.compare(password, this.passwordHash);
    }


}