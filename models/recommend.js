module.exports = function (sequelize, DataTypes) {
    var Reco = sequelize.define("Recommendations", {
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Reco;
};

// game_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
// },
// Recommender_id: {
//     type: DataTypes.Integer,
//     allowNull: false
// },
// Recommendee_id: {
//     type: DataTypes.Integer,
//     allowNull: false
// }