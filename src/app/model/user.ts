export class User {
    id: string;
    email: string;
    displayName: string;
    photoURL: string;
    userName: string;

    constructor(id: string,  email: string,  displayName: string,  photoURL : string, userName : string) {
        this.id = id;
        this.email = email;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.userName = userName;
    }
}