module.exports = (bookshelf, models) => bookshelf.Model.extend({
  tableName: 'users',
  room: function room() {
    return this.belongsTo(models.Room, 'roomId');
  },
  user: function user() {
    return this.belongsTo(models.User, 'userId');
  },
});
