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

    async removeToken(data) {
        try {
            await Token.destroy({
                where: {
                    id: data.UserId
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