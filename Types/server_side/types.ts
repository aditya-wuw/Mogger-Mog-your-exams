export type cred = {
    id?:number,
    username:string,
    email:string,
    password:string,
    method:string
}
export type validation_ = {
    q_index : number,
    given_answer : boolean,
    correct_answer : string
}