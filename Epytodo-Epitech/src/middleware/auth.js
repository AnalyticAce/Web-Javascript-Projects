const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth (req, res, next) {
    let token = req.headers.cookie;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    } else {
        token = token.substring(4, token.length);
        jwt.verify(token, process.env.SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({ message: "Token is not valid" });
            } else {
                req.user = decode;
                next();
            }
        });
    }
};

module.exports={auth};
