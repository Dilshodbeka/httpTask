const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwtTokenNotKey = process.env.JWT_TOKEN;
const { User } = require("../models/User");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtTokenNotKey
}


module.exports = passport => {
    passport.use(options, async(payload, done)=> {
        const user = await User.findById(payload.userId).select('email id')

        try {
            if(user) {
                done(null, user)
            }else{
                done(null, false)
            }
        } catch (err) {
            console.log(err);
        }
    })
}