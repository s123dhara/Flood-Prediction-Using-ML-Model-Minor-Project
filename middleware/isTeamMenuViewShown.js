

const isTeamMenuViewShown = (req, res, next) => {
    if (req.path === '/') {
        res.locals.isTeamMenuView = true;
    } else {
        res.locals.isTeamMenuView = false;
    }
    next();
};

module.exports = { isTeamMenuViewShown }