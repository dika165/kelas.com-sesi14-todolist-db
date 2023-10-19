import { getData, createData, updateData, deleteData } from "../repositories/users.js";

export const getUser = async () => {
    let [result] = await getData();

    if (result.length > 0) {
        console.log(result);
    } else {
        console.log("data user kosong")
    }
}

export const createUser = async (name, email, password) => {
    let [result] = await createData(name, email, password);

    if(result.insertId >0) {
        console.log("Berhasil menambahkan user denganID:", result.insertId);
    } else {
        console.log("gagal create user")
    }
}

export const updateUser = async (id, name, email) => {
    let [result] = await updateData(id, name, email);

    if(result.affectedRows > 0){
        console.log("update berhasil")
    } else {
        console.log("id user tidak di temukan")
    }
}

export const deleteUser = async(id) => {
    let [result] = await deleteData(id);

    if(result.affectedRows >0) {
        console.log("berhasil hapus data");
    } else {
        console.log("data user tidak ditemukan");
    }
}