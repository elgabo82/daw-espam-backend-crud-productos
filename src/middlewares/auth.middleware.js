/*
Middleware: Autenticación / Validación
*/


const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Sin token de autenticación.'
            });
        }

        const [type, token] = authHeader.split(' ');

        if(type !== 'Bearer' || !token) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Formato de token inválido.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
                ok: false,
                mensaje: 'Token inválido o expirado.',
                error: error.message
            });
    }
};


module.exports = {
    autenticar
};