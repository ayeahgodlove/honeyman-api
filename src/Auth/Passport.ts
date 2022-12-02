import passport from "passport";
import LocalStrategy from "passport-local";

import passportJWT from "passport-jwt";
import slugify from "slugify";
import { User } from "../Repository/Models/User";

const ExtractJWT = passportJWT.ExtractJwt;
const LocStrategy = LocalStrategy.Strategy;

passport.use(
  new LocStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    async (username, password, callback) => {
      try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
          return callback(null, false, { message: "User not found" });
        }

        return callback(null, user, { message: "Logged in Successfully" });
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
      secretOrKey: "honeymansecret",
    },
    async (jwtPayload, callback) => {
      try {
        const user = await User.findByPk<User>(jwtPayload._id);
        return callback(null, user!);
      } catch (error) {
        return callback(error);
      }
    }
  )
);
