module.exports = (bookshelf, models) => bookshelf.Model.extend({
  tableName: 'users',
  rooms: function users() {
    return this.belongsToMany(
      models.User,
      'user_rooms',
      'userId',
      'roomId'
    );
  },
});
