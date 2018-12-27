var openpgp = require('openpgp')

openpgp.initWorker({
  path: 'openpgp.worker.js'
})

module.exports = function (env) {
  var numBits = 1024 * 4,
    passphrase = env.cryptoSecret

  return {
    generateKey,
    encrypt,
    decrypt,
  }

  function generateKey(fingerPrint) {
    return openpgp
      .generateKey({
        numBits,
        passphrase,
        userIds: [fingerPrint],
      })
      .then(result => {
        return {
          publicKey: result.publicKeyArmored,
          privateKey: result.privateKeyArmored,
          revokeKey: result.revocationCertificate,
        }
      })
  }

  function encrypt(armoredPubkey) {
    return function (rawData) {
      return openpgp.key
        .readArmored(armoredPubkey)
        .then(pubkey => {
          return openpgp.encrypt({
            message: openpgp.message.fromText(rawData),
            publicKeys: pubkey.keys,
          })
        })
        .then(ciphertext => {
          return ciphertext.data
        })
    }
  }

  function decrypt(armoredPrivkey) {
    return async function (encryptedString) {
      var privKeyObj = (await openpgp.key.readArmored(armoredPrivkey)).keys[0]
      await privKeyObj.decrypt(passphrase)

      var plaintext = await openpgp.decrypt({
        message: await openpgp.message.readArmored(encryptedString),
        privateKeys: [privKeyObj],
      })

      return plaintext.data
    }
  }
}