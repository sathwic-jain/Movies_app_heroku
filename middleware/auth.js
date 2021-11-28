//one place to listen to all the requests
import jwt from "jsonwebtoken";

export const auth=(request,response,next)=>{
    try{
    const token=request.header("x-auth-token");
    console.log(token);
    jwt.verify(token,process.env.SECRET_KEY);
    next();
    }
    catch(err){
        response.status(401).send({error:err.message});
    }
}