export const printLogRequest = (request, response, next) => {
    console.log(request.body);
    next();
}