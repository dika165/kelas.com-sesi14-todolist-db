/*
    1. Pasang midleware authorization pada setiap endpoint users kecuali endpoint login.
    2. ubah response create user, update user menjadi data yang user yang di buat atau di update
    3. Buat REST API untuk process CRUD untuk table Tasks dan tambahkan authorisasinya.

*/
import * as UserService from './services/user.js';
import { printLogRequest } from './utils/logging.js';
import express from 'express';

const host = "0.0.0.0";
const port = 8080;

const app = express();
app.use(express.json());
app.get("/",UserService.validateToken,  UserService.getUser);
app.post("/", UserService.createUser);
app.put("/:id", UserService.validateToken, UserService.updateUser);
app.post("/login",printLogRequest, UserService.authUser);

app.listen(port, host, ()=> {
    console.log(`server berjalan di http://${host}:${port}`);
})