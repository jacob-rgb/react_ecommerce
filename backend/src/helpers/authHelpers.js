const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   const hashedPasword = await bcrypt.hash(password, salt);
   return hashedPasword;
};

const matchPassword = async (password, savedPassword) => {
    try {
     return await bcrypt.compare(password, savedPassword) ? true : false ;
    } catch (error) {
        console.log(error);
        return false
    }
};

module.exports ={
    encryptPassword,
    matchPassword
}