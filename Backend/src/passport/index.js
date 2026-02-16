import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as FacebookStrategy } from "passport-facebook"
import { User } from "../models/user.model.js"
import { APIError } from "../utils/APIError.js"
import { userLoginType, userRole } from "../constant.js"

// Serialize and deserialize user for passport
// comment is because there is no need for jwt based authentication
// this is only for session nased authentication

// passport.serializeUser(function (user, cb) {
//     cb(null, user._id)
// })

// passport.deserializeUser(async function (userId, cb) {
//     try {
//         const user = await User.findById(userId)
//         if (user) cb(null, user)
//         else cb(new APIError(404, "User not found"), null)
//     } catch (error) {
//         cb(new APIError(500, error?.message || "Error on passport configure"), null)
//     }
// })

// Configure passport strategies for Google and Facebook login
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/v1/users/google/callback"
        },
        async function (accessToken, refreshToken, profile, cb) {
            // check if user is exists
            // if exists then check if user is registered with google or not
            // if registered with google then return user
            // if not registered with google then return error
            // if user is not exists then create a new user with google profile            
            try {
                const user = await User.findOne({ email: profile._json.email })
                if (user) {
                    if (user.loginType !== userLoginType.GOOGLE) {
                        cb(
                            new APIError(400, "You are previosly registered using "
                                + user.loginType.toLowerCase().replace("_", " ") + ". Use the "
                                + user.loginType.toLowerCase().replace("_", " ") +
                                " strategy to access your account."

                            )
                            , null
                        )
                    } else {
                        cb(null, user)
                    }
                } else {
                    const { name, email, picture, sub } = profile._json
                    const user = await User.create({
                        fullName: name,
                        email,
                        password: sub,
                        avatar: picture,
                        role: userRole.USER,
                        loginType: userLoginType.GOOGLE,
                        isEmailVerified: true
                    })

                    user ?
                        cb(null, user)
                        :
                        cb(new APIError(500, "Internal server error while login with google"), null)

                }
            } catch (error) {
                cb(
                    new APIError(500, error.message || "An error occured during google login"),
                    null
                )

            }
        }
    )
)

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:5000/api/v1/users/facebook/callback",
            profileFields: ['id', 'displayName', 'email', 'photos'],
            profileURL: 'https://graph.facebook.com/v18.0/me',
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                if (!profile?.emails.length) {
                    cb(
                        new APIError(
                            400, "Your Email is not regitered with facebook try another strategy to access your account"
                        ),
                        null
                    )
                }

                const user = await User.findOne({ email: profile.emails[0].value })

                if (user) {
                    if (user.loginType !== userLoginType.FACEBOOK) {
                        cb(
                            new APIError(400, "You are previosly registered using "
                                + user.loginType.toLowerCase().replace("_", " ") + ". Use the "
                                + user.loginType.toLowerCase().replace("_", " ") +
                                " strategy to access your account."

                            ),
                            null
                        )
                    } else {
                        cb(null, user)
                    }

                } else {

                    const { displayName, emails, photos, id } = profile
                    const user = await User.create({
                        fullName: displayName,
                        email: emails[0].value,
                        password: id,
                        avatar: photos[0].value,
                        role: userRole.USER,
                        isEmailVerified: true,
                        loginType: userLoginType.FACEBOOK,
                    })

                    user ?
                        cb(null, user)
                        :
                        cb(new APIError(500, "Internal server error while login with facebook"), null)
                }
            } catch (error) {
                cb(
                    new APIError(500, error.message || "An error occured during facebook login"),
                    null
                )
            }

        }
    )
)


