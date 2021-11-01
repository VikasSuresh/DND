const { verify } = require('../jwt');

module.exports = async (req, res, next) => {
    try {
        const authorization = req.cookies.DSID;
        if (!authorization) {
            return res.status(401).send({ success: false, message: 'Missing authorization!', value: null });
        }

        const user = verify(authorization);
        req.state = {
            userId: user.sub,
        };

        return next();
    } catch (e) {
        return res.status(403).send({ success: false, message: 'Unauthorized', value: null });
    }
};
