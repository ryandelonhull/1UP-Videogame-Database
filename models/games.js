module.exports = function (sequelize, DataTypes) {
    var Games = sequelize.define("Game", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cover: {
            type: DataTypes.STRING,
        },
        user_rating: {
            type: DataTypes.STRING,
        },
        age_rating: {
            type: DataTypes.STRING,
        },
        company: {
            type: DataTypes.STRING,
        },
        franchise: {
            type: DataTypes.STRING,
        },
        genre: {
            type: DataTypes.STRING,
        },
        key_words: {
            type: DataTypes.STRING,
        },
        videos: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        },


    });
    return Games;
};
