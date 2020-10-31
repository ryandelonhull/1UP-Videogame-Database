// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machine
// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var Friends = sequelize.define("Friends", {
        // The email cannot be null, and must be a proper email before creation
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        friend_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    Friends.associate = models => {
        // Each Event belongs to A User
        // Each Event can have many UserEvents
        models.Friends.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Friends;
};
