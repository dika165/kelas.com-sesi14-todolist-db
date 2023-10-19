import { getData, createData, updateData, deleteData } from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const getUser = async (request, response, next) => {
    try{
        let [result] = await getData();

        if (result.length > 0) {
            successResponse(response, "success", result)
        } else {
            errorResponse(response, "data not found!", 404)
        }
    } catch(error) {
        next(error);
    }
}

export const createUser = async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;

        let [result] = await createData(name, email, password);

        if(result.insertId >0) {
            successResponse(response, "success  create user", result, 201)
        } else {
            errorResponse(response, "failed create user", 500)
        }
    } catch(error) {
        next(error)
    }
    
}

export const updateUser = async (request, response, next) => {
    try{
        let id = request.params.id;
        let name = request.body.name;
        let email = request.body.email;
        let [result] = await updateData(id, name, email);

        if(result.affectedRows > 0){
            successResponse(response, "success update user", result);
        } else {
            errorResponse(response, "user not found", 404);
        }
    } catch (error) {
        next(error)
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