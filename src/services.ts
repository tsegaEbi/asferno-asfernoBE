import { User } from "./models";
import fs from 'fs';
import promise from 'fs/promises';
  const usersFile ="./users.json";

export class UserServices{

    getUsers():any {

       const data =   fs.readFileSync('./users.json', 'utf8');
        return JSON.parse(data) ;


    }

     addUser(user:any): any {
        const users = this.getUsers() as User[];

        users.push(user);

        const newUsers =JSON.stringify(users);


        const data =  fs.writeFileSync('./users.json', newUsers);

        return data;


     }
   updateUser(users:any): any {

        const newUsers =JSON.stringify(users);

        const data =  fs.writeFileSync('./users.json', newUsers);

        return data;


     }

      deleteUser(id:any):any{

        const users =  this.getUsers();
        const filteredUsers =users.filter((u: { id: string; })=>u.id!==id) ;
        const updatedUsers = this.updateUser(filteredUsers)
     }

}