const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');


router.get(
    '/admin-dashboard',
    isAuthenticated,
    allowRoles(1),
    (req, res) => {
        res.json({ message: 'Welcome Admin' });
    }
);

router.get(
    '/nurse-dashboard',
    isAuthenticated,
    allowRoles(2),
    (req, res) => {
        res.json({ message: 'Welcome Staff' });
    }
);

router.get(
    '/student-dashboard',
    isAuthenticated,
    allowRoles(3),
    (req, res) => {
        res.json({ message: 'Welcome Student' });
    }
);

module.exports = router;
