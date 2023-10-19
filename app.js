/*
    1. Buat process CRUD untuk table Tasks
*/
import * as UserService from './services/user.js';

await UserService.getUser();

// UserService.createUser("Zafif", "zafif@gmail.com", "pass123");

await UserService.updateUser(2, "mubaidi", "mubaydi@gmail.com");

// UserService.deleteUser();

await UserService.getUser();