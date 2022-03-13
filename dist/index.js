"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = require("./services");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const date_and_time_1 = __importDefault(require("date-and-time"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const userService = new services_1.UserServices();
const SERVER_PORT = 7070;
app.get('/list', (request, response) => {
    const users = userService.getUsers();
    response.send(JSON.stringify(users));
});
app.post('/create', (request, response) => {
    const body = request.body;
    if (request.body !== undefined || request.body !== null) {
        const existingUsers = userService.getUsers();
        // count existing users and increment by 1 to create an ID for a new user
        let count = 0;
        if (existingUsers === undefined || existingUsers == null || existingUsers.length === 0) {
            count = 1;
        }
        else {
            count = existingUsers.length;
            count++;
        }
        const today = date_and_time_1.default.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
        body.dateCreated = today;
        body.dateUpdated = today;
        body.id = count;
        const users = userService.addUser(body);
        response.send(users);
    }
    else {
        response.sendStatus(401);
    }
});
app.delete('/delete/:id', (request, response) => {
    const id = Number(request.params.id);
    const updatedUsers = userService.deleteUser(id);
    response.send("Successfully deleted");
});
app.put('/update', (request, response) => {
    const body = request.body;
    const users = userService.getUsers();
    const id = body.id;
    const exists = users.filter((u) => u.id === id);
    // Check if the user is already exisits, otherwise send not found error
    if (exists !== null) {
        const rst = userService.deleteUser(body.id);
        const user = {
            name: body.name,
            surname: body.surname,
            phone: body.phone,
            email: body.email,
            dateUpdated: date_and_time_1.default.format(new Date(), 'YYYY/MM/DD HH:mm:ss'),
            id: body.id,
            dateCreated: body.dateCreated,
            dob: body.dob
        };
        userService.addUser(user);
        response.send(user);
    }
    else
        response.sendStatus(404).send('NOT_FOUND');
});
app.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(request.params.id);
    const users = userService.getUsers();
    // filter by ID
    const user = users.filter((u) => u.id === id);
    if (user !== null)
        response.send(JSON.stringify(user));
    else
        response.sendStatus(404).send('NOT_FOUND');
}));
app.listen(SERVER_PORT, () => {
    console.log(`Asferno Server running on  http://localhost:${SERVER_PORT}`);
});
//# sourceMappingURL=index.js.map