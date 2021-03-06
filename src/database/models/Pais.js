/* eslint-disable no-param-reassign */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const Pais = sequelize.define(
    "Pais",
    {
      nome_mae: DataTypes.STRING,
      nome_pai: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.VIRTUAL,
      hash_senha: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (pais) => {
          if (pais.senha) pais.hash_senha = await bcrypt.hash(pais.senha, 8);
        },
      },
    }
  );

  Pais.associate = function (models) {
    this.belongsTo(models.Enderecos, {
      foreignKey: "id_endereco",
      as: "endereco",
    });
    this.hasMany(models.Alunos, {
      foreignKey: "id_pais",
      as: "filhos",
    });
    this.belongsToMany(models.Escolas, {
      foreignKey: "id_pais",
      through: "Escola-Pais",
      as: "escolas",
    });
  };

  Pais.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.hash_senha);
  };

  Pais.prototype.signToken = function () {
    return jwt.sign({ id: this.id }, process.env.API_SECRET, {
      expiresIn: "4 hours",
    });
  };

  return Pais;
};
