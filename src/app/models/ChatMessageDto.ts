export class ChatMessageDto {
    login: string ;
    message: string;

    constructor(login: string, message: string){
        this.login = login;
        this.message = message;
    }
}