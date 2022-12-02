import passport from "passport";
import LocalStrategy from "passport-local";

import passportJWT from "passport-jwt";
import { IUser } from "../Repository/Contracts/IUser";
import { UserTable } from "../Repository/Table/UserTable";
import { PgSequelize } from "@src/Config/connection";
import slugify from "slugify";
const _operation = UserTable(PgSequelize);

passport.use(
  "signup",
  new LocalStrategy.Strategy(
    { usernameField: "Email", passwordField: "Password" },
    async (username, password, callback) => {
      try {
        const user: any = await _operation.create({
          username,
          slug: slugify(username.toLowerCase(), "-"),
          password,
          fullname: "",
          address: "",
          email: username,
          id: 0,
          role: "",
        });
        return callback(null, user);
      } catch (error) {
        callback(error);
      }
    }
  )
);

// ...

passport.use(
  "login",
  new LocalStrategy.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user: any = await _operation.findOne(
          {  },
          
        );

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
