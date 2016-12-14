var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    if (require('../../lib/detectmobilebrowser')(req))
        view.render('about_mobile');
    else
        res.redirect('/');

}
