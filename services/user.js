import { response } from "express";
import { getData, createData, updateData, deleteData, getDataByEmail } from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY_TOKEN = 'kelas.com';
const SECRET_KEY_REFRESH = 'backend-web';

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
        let saltRound = 10;
        bcrypt.hash(password, saltRound, async (error, hashedPassword)=> {
            let [result] = await createData(name, email, hashedPassword);
            if(result.insertId >0) {
                successResponse(response, "success  create user", result, 201)
            } else {
                errorResponse(response, "failed create user", 500)
            }
        })
         
    } catch(error) {
        next(error)
    }
    
}

export const updateUser = async (request, response, next) => {
    try{
        let id = request.params.id;
        let name = request.body.name;
        let email = request.body.email;
        let updatedBy = request.claims.user_id;
        console.log(updatedBy);
        let [result] = await updateData(id, name, email, updatedBy);

        if(result.affectedRows > 0){
            successResponse(response, "success update user", result);
        } else {
            errorResponse(response, "user not found", 404);
        }
    } catch (error) {
        next(error)
    }
    
}

export const deleteUser = async(request, response, next) => {
    try{
        let id = request.params.id;
        let [result] = await deleteData(id);

        if(result.affectedRows >0) {
            successResponse(response, "success delete user", result)
        } else {
            errorResponse(response, "data tidak ditemukan", 404);
        }
    } catch(error) {
        next(error)
    }
    
}

export const authUser = async (request, response, next) => {
    try{
        let email = request.body.email;
        let password = request.body.password;

        let [result] = await getDataByEmail(email);
        
        if(result.length>0) {
            let user = result[0];
            let hashedPassword = user.password;
            bcrypt.compare(password,hashedPassword, (error, isValid) => {
                if(isValid) {
                    let payload = {
                        user_id: user.user_id, 
                        name: user.name, 
                        email: user.email
                    }
                    let accessToken = jwt.sign(payload, SECRET_KEY_TOKEN, {expiresIn: '15m'});
                    let refreshToken = jwt.sign(payload, SECRET_KEY_REFRESH, {expiresIn: '30m'});
                    let data = {
                        access_token : accessToken, 
                        refresh_token: refreshToken
                    }
                    successResponse(response, "success login", data)
                } else {
                    errorResponse(response, "email / password salah")
                }
            })
        }
    } catch(error) {
        next(error);
    }
}

export const validateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if(accessToken) {
        jwt.verify(accessToken, SECRET_KEY_TOKEN, (error, payload) => {
            if(error) {
                errorResponse(response, error.message, 403)
            }else {
                request.claims = payload;
                console.log(payload);
                next();
            }
        })
    } else {
        errorResponse(response, "invalid request, authorization not found!!")
    }
}