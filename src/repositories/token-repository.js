const { Token } = require("../models/index");

class TokenRepository {

    async insertToken(data) {
        try {
            await Token.create(data);
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async removeToken(tokenId) {
        try {
            await Token.destroy({
                where: {
                    id: tokenId
                }
            });
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = TokenRepository;