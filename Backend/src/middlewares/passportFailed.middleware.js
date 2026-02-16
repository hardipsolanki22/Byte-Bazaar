import passport from "passport"

export const passportStrategy = (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy.toLowerCase(), { session: false },
            (err, user) => {
                if (err) {
                    const errorMessage = encodeURIComponent(err.message)
                    return res.redirect(
                        `${process.env.CLIENT_URL}/signin?error=auth_failed&message=${errorMessage}`
                    )
                }
                req.user = user
                next()
            }
        )(req, res, next)
    }
}