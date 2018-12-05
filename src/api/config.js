const env = location.href.match(/^http:\/\/(\w+).label.37degreedata.com/) || [];

let passportUrl = location.protocol + '//passport.37degreedata.com';

if (env[1] === 'dev') {
    passportUrl = 'http://dev.passport.37degreedata.com';
} else if (env[1] === 'test') {
    passportUrl = 'http://test.passport.37degreedata.com';
} else if (env[1] === 'pre') {
    passportUrl = 'http://pre.passport.37degreedata.com';
}

module.exports = {
    passportUrl: passportUrl
};
