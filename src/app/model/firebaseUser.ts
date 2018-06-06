export class FirebaseUser {
   
    public email: string;
    public fullname: string;
    public username: string;
    public password: string;
    constructor(email: string, fullname: string, username: string, password: string) {
        this.email = email;
        this.fullname = fullname;
        this.username = username;
        this.password = password;
    }
}