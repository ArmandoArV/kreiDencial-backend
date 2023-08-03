/**********************
Production endpoints:

 • Free sites:
   https://deapco.wixsite.com/kreidencial/_functions

Test endpoints:

 • Free sites:
   https://deapco.wixsite.com/kreidencial/_functions-dev

**********************/

// The following is an example of an HTTP function, which gets the product of 2 operands. Adapt the code below for your specific use case.

import { ok, badRequest, created, notFound } from 'wix-http-functions';
import { getSecret } from "wix-secrets-backend"
import * as wixData from "backend/database"
import * as wixUser from "backend/users"

const jwt = require('jsonwebtoken');

const responseJSON = {
    "headers": {
        "Content-Type": "application/json"
    }
}

/**
 * Endpoint: https://deapco.wixsite.com/kreidencial/_functions/login
 * Headers: {
 *  "authorization":"Basic matricula:password"
 * }
 * Return: {}
 */
export async function get_login(request) {
    try {
        const auth = String(Buffer.from(String(request.headers.authorization).substr(6), "base64"));
        const end = auth.indexOf(":");
        const matricula = auth.substring(0, end);
        const password = auth.substring(end + 1)

        const loginResponse = await wixUser.login(matricula, password);

        console.log("get_login: loginResponse", loginResponse);

        if (loginResponse.status) {
            const jwtSecret = await getSecret("jwtSecret");

            const token = await jwt.sign({
                ...loginResponse.information
            }, jwtSecret, {
                expiresIn: "1h",
            });

            responseJSON.body = {
                ...loginResponse.information,
                "token": token
            }

            return ok(responseJSON);
        } else {
            responseJSON.body = loginResponse
            return notFound(responseJSON);
        }
    } catch (err) {
        console.log("get_login: catch error", err)
        responseJSON.body = {
            "error": err
        }
        return badRequest(responseJSON);
    }
}

/**
 * Endpoint: https://deapco.wixsite.com/kreidencial/_functions/register
 * Body: {
 * "matricula":"",
 * "password":"",
 * "userInfo":{
 *    "firstName": "",
 *    "lastName": ""
 *  }
 * }
 * Return: {}
 */
export async function post_register(request) {
    try {
        const body = await request.body.json();
        const registerResponse = await wixUser.register(body.matricula, body.password, body.userInfo);

        console.log("post_register: registerResponse", registerResponse);

        if (registerResponse.status) {
            const jwtSecret = await getSecret("jwtSecret");

            const token = await jwt.sign({
                "matricula": body.matricula,
                "nombre": `${body.userInfo.firstName}`,
                "apellido": `${body.userInfo.lastName}`
            }, jwtSecret, {
                expiresIn: "1h",
            });

            responseJSON.body = {
                ...registerResponse,
                "token": token
            }

            return created(responseJSON);
        } else {
            responseJSON.body = registerResponse
            return badRequest(responseJSON);
        }
    } catch (err) {
        console.log("post_register: catch error", err)
        responseJSON.body = {
            "error": err
        }
        return badRequest(responseJSON);
    }
}

/**
 * Endpoint: https://deapco.wixsite.com/kreidencial/_functions/validateMatricula/{matricula}
 * Return: [{}]
 */
export async function get_validateMatricula(request) {
    try {
        const user = await wixData.getValidateMatricula(request.path[0]);

        responseJSON.body = user;
        return ok(responseJSON);

    } catch (err) {
        responseJSON.body = {
            "error": err
        };
        return badRequest(responseJSON);
    }
}

/**
 * Endpoint: https://deapco.wixsite.com/kreidencial/_functions/allUsers
 * Return: [{}]
 */
export async function get_allUsers() {
    try {
        const users = await wixData.getAllUsers();

        responseJSON.body = users;
        return ok(responseJSON);

    } catch (err) {
        responseJSON.body = {
            "error": err
        };
        return badRequest(responseJSON);
    }
}
