exports.isAuthenticated = (req, res, next) => {
    const { user_id } = req.body; 
    // later: req.user from JWT/session

    if (!user_id) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    next();
};
