export class LoginInfoAdministratorDto{
    admnistratorId: number;
    username: string;
    token: string;

constructor (id: number, un: string , jwt: string){
    this.admnistratorId = id;
    this.username = un;
    this.token = jwt;
}
    
}