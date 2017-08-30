module.exports = (bookshelf, models) => bookshelf.Model.extend({
  tableName: 'users',
  rooms: function rooms() {
    return this.belongsToMany(
      models.Room,
      'user_rooms',
      'userId',
      'roomId'
    );
  },
});
