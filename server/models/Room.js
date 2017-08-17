module.exports = (bookshelf, models) => bookshelf.Model.extend({
  tableName: 'rooms',
  users: function users() {
    return this.belongsToMany(
      models.User,
      'user_rooms',
      'roomId',
      'userId'
    );
  },
  messages: function messages() {
    return this.hasMany(models.Message, 'roomId');
  },
  creator: function creator() {
    return this.belongsTo(models.User, 'creatorId');
  },
});
