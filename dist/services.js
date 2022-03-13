"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const fs_1 = __importDefault(require("fs"));
const usersFile = "./users.json";
class UserServices {
    getUsers() {
        const data = fs_1.default.readFileSync('./users.json', 'utf8');
        return JSON.parse(data);
    }
    addUser(user) {
        const users = this.getUsers();
        users.push(user);
        const newUsers = JSON.stringify(users);
        const data = fs_1.default.writeFileSync('./users.json', newUsers);
        return data;
    }
    updateUser(users) {
        const newUsers = JSON.stringify(users);
        const data = fs_1.default.writeFileSync('./users.json', newUsers);
        return data;
    }
    deleteUser(id) {
        const users = this.getUsers();
        const filteredUsers = users.filter((u) => u.id !== id);
        const updatedUsers = this.updateUser(filteredUsers);
    }
}
exports.UserServices = UserServices;
//# sourceMappingURL=services.js.map