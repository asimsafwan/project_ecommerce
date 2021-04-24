var mongoose = require('mongoose');
const crypto = require('crypto');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim: true, //trimming extra spaces
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true //avoiding duplication
    },
    userinfo:{
        type:String,
        required:true
    },
    //TODO: come back here
    encry_password:{
        type:String,
        trim:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{ //the items a user has purchased
        type: Array,
        default:[]
    }
})

userSchema.virtual("password").set(function(password){
    this._password=password
    this.salt=uuidv1();
    this.encry_password=this.securePassword(password);
}).get(function(){
    return this._password;
})

userSchema.method={
    autheticate:function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;
    },
    securePassword:function(plainpassword){
        if(!password) return "";
        try{
            return crypto.createHmac('sha256', salt).update(plainpassword).digest('hex');
        }catch(err){
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema)