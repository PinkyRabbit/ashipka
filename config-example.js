const debug = require('debug')('ashipka:config');

const secret = 'asdhfjlkashdlkf';

const reCAPTCHA = 'gjkdsfghasergkerkgbwekr';

if (!secret) {
    debug("Error: Needed to set session secret");
    process.exit(1);
}
if (!reCAPTCHA) {
    console.error("Error: Needed to set reCAPTCHA secret");
    process.exit(1);
}

exports = module.exports = { secret, reCAPTCHA };
