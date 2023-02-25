import passport from "passport";
import LocalStrategy from "passport-local";

import passportJWT from "passport-jwt";
// import GoogleStrategy from "passport-google-oidc";

import { User } from "../Repository/Models/User";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";

dotenv.config();

const ExtractJWT = passportJWT.ExtractJwt;
const LocStrategy = LocalStrategy.Strategy;

passport.use(
  new LocStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, callback) => {
      try {
        const user: any = await User.findOne<User>({
          where: { username: username },
        });

        if (!user) {
          return callback(null, false, { message: "User not found@" });
        }

        const { dataValues } = user;
        const userPassword = dataValues.password;

        const hashPassword = bcrypt.compare(
          password,
          userPassword,
          (err, result) => {
            if (err) throw err;
            if (result === true) {
              return callback(null, dataValues);
            } else {
              return callback(null, false, { message: "Incorrect password!" });
            }
          }
        );

        return callback(null, user, { message: "Logged in Successfully!" });
      } catch (error) {
        return callback(error);
      }
    }
  )
);

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (jwtPayload, callback) => {
      try {
        const user: any = await User.findByPk<User>(jwtPayload.id);
        // console.log("ps_user: ", jwtPayload)
        return callback(null, user!);
      } catch (error) {
        console.log("ps_error: ", error);
        return callback(error);
      }
    }
  )
);

// google and social media platforms
// passport.use(
//   new GoogleStrategy({
//     clientID: process.env["GOOGLE_CLIENT_ID"],
//     clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
//     callbackURL: "https://www.example.com/oauth2/redirect",
//   }, async (issuer: any, profile: any, cb: any) => {

//   })
// );
