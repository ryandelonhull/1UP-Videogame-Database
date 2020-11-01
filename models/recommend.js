
module.exports = function (sequelize, DataTypes) {
    var Reco = sequelize.define("Recommendations", {
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return Reco;
};