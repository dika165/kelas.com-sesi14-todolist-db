/*
    1. Buat function untuk delete user
    2. Buat REST API untuk process CRUD untuk table Tasks.

*/
import * as UserService from './services/user.js';
import express from 'express';

const host = "0.0.0.0";
const port = 8080;

const app = express();
app.use(express.json());
app.get("/", UserService.getUser);
app.post("/", UserService.createUser);
app.put("/:id", UserService.updateUser);

app.listen(port, host, ()=> {
    console.log(`server berjalan di http://${host}:${port}`);
})