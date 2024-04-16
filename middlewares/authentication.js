const cookieParser = require("cookie-parser");
const { validateToken } = require("../services/authentication");


function checkForAuthenticationCookie(cookieName){
    return (req, res, next)=>{
        const tokenCookieValue = req.cookies[cookieName]; // npm i cookie-parser
        if (!tokenCookieValue) {
            return next();
        }
        
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) { console.log(error) }
        
       return next();
    }
}

module.exports = {
    checkForAuthenticationCookie
}