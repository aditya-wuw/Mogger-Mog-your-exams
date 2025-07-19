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

export type sessiontypes = {
    Token : string
    user_id : number
}

export type google_cred = {
    username : string,
    email: string,
    method: string,
    profile_pic:string
}

export type uploads_notes = {
    user_id: number,
    file_name:string,
    path : string
} 