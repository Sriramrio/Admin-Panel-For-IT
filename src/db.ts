import { Dexie,type EntityTable } from "dexie"

export interface employeetype{
    id:number,
    username:string,
    emailid:string,
    password:string,
}
export interface session{
    id?: number
    username: string
    emailid: string
}

export interface Employessdatatype {
    id:number,
    Employeename:string,
    Role:string,
    Emailid:string,
    status:string,
    empProject:string,
}
export interface Projecttype{
    id:number,
    Projecttitle:string,
    projectdescription:string,
    status:string,
    progress:number,
    deadline:string,
}
const db=new Dexie("Employeloginedatabase") as Dexie &{
    employeeslogin:EntityTable<employeetype,'id'>
    session:EntityTable<session,'id'>
    Employeesdata:EntityTable<Employessdatatype,'id'>
    ProjectTable:EntityTable<Projecttype,'id'>
}
db.version(1).stores({
    employeeslogin:'++id,username,emailid,password',
    session:'++id,username,emailid',
    Employeesdata:'++id,EmployeeName,emailid,Role,status,empProject',
    ProjectTable:'++id,Projecttitle,projectdescription,status, progress,deadline',
})

export {db}