export class Customer {
    uploadedUser: string;
    url: string;
    description: string;
    name: string;

    constructor(name: string, uploadedUser: string, url: string, description: string,) {
        this.name = name;
        this.uploadedUser = uploadedUser;
        this.url = url;
        this.description = description;
    }
}