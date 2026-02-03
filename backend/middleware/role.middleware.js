exports.allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const { role_id } = req.body;

        if (!allowedRoles.includes(role_id)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};
