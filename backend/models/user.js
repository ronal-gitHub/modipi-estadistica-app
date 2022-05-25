'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
  },  
    login: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    email: DataTypes.STRING,
    reset_key: DataTypes.STRING,
    puesto_id:DataTypes.INTEGER            ,
  }, {schema: 'dgm_scg_test',});
  User.beforeSave((user, options) => {
  //  console.log(user.changed('password_hash'));
    if (user.changed('password_hash')) {
      user.password_hash = bcrypt.hashSync(user.password_hash, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password_hash, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};