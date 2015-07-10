var crypto = require('crypto');
var ecdh = crypto.createECDH('secp256k1');
ecdh.generateKeys()
console.log(ecdh.getPublicKey('hex'));
console.log(ecdh.getPrivateKey('hex'));


crypto.randomBytes(256, function(ex, password) {
    if (ex) throw ex;
    console.log('Have %d bytes of random data: %s', password.length,
        password);

    var cipheredPassword = ecdh.computeSecret(ecdeh.getPublicKey(),
        null, 'hex');
    console.log()
});
