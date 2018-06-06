export class Fileupload {
    uploadedUser: string;
    url: string;
    description: string;
    name: string;
    uploadedUserId: string;
    id : string;

    constructor( id : string, name: string, uploadedUser: string, url: string, description: string,uploadedUserId: string) {
       this.id = id;
        this.name = name;
        this.uploadedUser = uploadedUser;
        this.url = url;
        this.description = description;
        this.uploadedUserId = uploadedUserId;
    }
}