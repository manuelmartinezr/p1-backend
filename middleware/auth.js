import jwt from 'jsonwebtoken';

function authenticateJWT(req, res, next) {
    const token = req.get('Authorization')?.split(' ')[1]; // Bearer <token>
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}
function authorize(permission) {
    return (req, res, next) => {
        if (req.user?.permisos?.[permission]) return next();
        res.status(403).json({ message: 'Forbidden' });
    };
}
export { authenticateJWT, authorize };