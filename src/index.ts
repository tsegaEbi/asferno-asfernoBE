import express from "express";

import {User } from './models';
import { UserServices } from "./services";
import cors from "cors"
import bodyParser from 'body-parser';
import dateFormater from 'date-and-time';

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const userService =new UserServices();
const SERVER_PORT=7070;


app.get('/list',(request,response)=>{
    const users =userService.getUsers();

    response.send(JSON.stringify(users));
});
app.post('/create',(request,response)=>{

  const body = request.body as User;


  if(request.body!==undefined || request.body!==null){
  const existingUsers =userService.getUsers()  as User[];

// count existing users and increment by 1 to create an ID for a new user
  let count=0;
  if(existingUsers===undefined || existingUsers==null ||existingUsers.length===0){
    count=1;
  }
  else{
    count=existingUsers.length;
    count++;
  }

                const today=dateFormater.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
                body.dateCreated=today;
                body.dateUpdated=today;
                body.id=count;

                const users =userService.addUser(body);
                response.send(users);
  }
  else{
      response.sendStatus(401);
  }

});
app.delete('/delete/:id', (request,response)=>{

    const id=Number(request.params.id);
    const updatedUsers =userService.deleteUser(id);

    response.send("Successfully deleted");


  });
  app.put('/update',  (request,response)=>{

    const body = request.body as User;
    const users = userService.getUsers();
    const id = body.id ;
    const exists =users.filter((u: { id: number; })=>u.id===id ) ;

    // Check if the user is already exisits, otherwise send not found error
    if(exists!==null)
        {
             const rst =   userService.deleteUser(body.id);
             const user:User={
             name:body.name,
             surname:body.surname,
             phone:body.phone,
             email:body.email,
             dateUpdated:dateFormater.format(new Date(), 'YYYY/MM/DD HH:mm:ss'),
             id:body.id,
             dateCreated:body.dateCreated,
             dob:body.dob
            }

            userService.addUser(user);
           response.send(user);

        }
    else
      response.sendStatus(404).send('NOT_FOUND');
  });

app.get('/:id',async (request,response)=>{


  const id= Number(request.params.id );
  const users = userService.getUsers();


    // filter by ID
            const user =users.filter((u: { id: number; })=>u.id===id) ;
            if(user!==null)
                response.send(JSON.stringify(user));
            else
              response.sendStatus(404).send('NOT_FOUND');



});


app.listen( SERVER_PORT, () => {
    console.log( `Asferno Server running on  http://localhost:${ SERVER_PORT }` );
} );



