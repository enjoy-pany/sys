const env = location.href.match(/^http:\/\/(\w+).sys.com/) || [];

let passportUrl = location.protocol + '//passport.sys.com';

if (env[1] === 'dev') {
    passportUrl = 'http://dev.sys.com';
} else if (env[1] === 'test') {
    passportUrl = 'http://test.sys.com';
} else if (env[1] === 'pre') {
    passportUrl = 'http://pre.sys.com';
}

module.exports = {
    passportUrl: passportUrl
};
