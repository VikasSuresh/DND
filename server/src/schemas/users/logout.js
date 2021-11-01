const logout = async (req, res, next) => {
    try {
        return res.cookie('DSID', '', {
            expires: new Date(0),
            secure: true,
            httpOnly: true,
        }).end();
    } catch (error) {
        return next(error);
    }
};

module.exports = logout;
