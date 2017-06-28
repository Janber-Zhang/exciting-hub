module.exports = {
    checkLogin(req, res, next) {
    	console.log(req.session)
        if (!req.session.userInfo) {
            return res.redirect('/login');
        }
        next();
    }
};