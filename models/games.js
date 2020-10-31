module.exports = function (sequelize, DataTypes) {
    var Games = sequelize.define("Games", {
        // id,name,collection,genres,cover.url,first_release_date,rating,slug,storyline,summary
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cover_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        storyline: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        summary: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        }
        // company: {
        //     type: DataTypes.STRING,
        // },
        // franchise: {
        //     type: DataTypes.STRING,
        // },
        // key_words: {
        //     type: DataTypes.STRING,
        // },
        // videos: {
        //     type: DataTypes.STRING,
        // },
        // url: {
        //     type: DataTypes.STRING,
        // },

    });
    return Games;
};
