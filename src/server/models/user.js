/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		username: {
			type: DataTypes.STRING(191),
			allowNull: true,
			unique: true,
			field: 'username'
		},
		firstName: {
			type: DataTypes.STRING(191),
			allowNull: true,
			field: 'first_name'
		},
		lastName: {
			type: DataTypes.STRING(191),
			allowNull: true,
			field: 'last_name'
		},
		email: {
			type: DataTypes.STRING(191),
			allowNull: true,
			field: 'email'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'updated_at'
		}
	}, {
		tableName: 'user'
	});
};
