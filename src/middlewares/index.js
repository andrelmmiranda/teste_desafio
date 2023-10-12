const { tokenValidator } = require('./tokenValidator');
const { userAlreadyExistsValidator } = require('./userAlreadyExistsValidator');
const { FieldValidator } = require('./FieldValidator');

module.exports = {
    tokenValidator,
    userAlreadyExistsValidator,
    FieldValidator
}