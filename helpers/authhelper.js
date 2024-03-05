import bcrypt from 'bcrypt';

export const hashpassword=async(password)=>{
    
// console.log(password.toString())
    try{
        const saltRounds=10;
        const hashedpassword=await bcrypt.hash(password,saltRounds);
        
        return hashedpassword;
    }
    catch(error){
        console.error(error);
        // res.status(500).json(error)
    }
}
export const comparepassword=async(password,hashedpassword)=>{
        return bcrypt.compare(password,hashedpassword)
}