var _ = require('underscore');

exports.page = function(pageName, req, res, options) {
  res.render( pageName, _.extend( {
    pageName: pageName,
    production: this.get('env') != 'development'
    }, options || {} ) );
};
