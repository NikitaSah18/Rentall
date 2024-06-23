export class ChatMessageDto {
    userLogin: string ;
    message: string;

    constructor(userLogin: string, message: string){
        this.userLogin = userLogin;
        this.message = message;
    }
}