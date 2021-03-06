module.exports = (sequelize, DataTypes) => {
  const ListaAluno = sequelize.define(
    "ListaAluno",
    {
      doado: DataTypes.INTEGER,
    },
    {
      tableName: "Lista-Aluno",
    }
  );

  ListaAluno.associate = function (models) {
    this.belongsTo(models.Materiais, {
      foreignKey: "id_material",
      as: "material",
    });

    this.belongsTo(models.Alunos, {
      foreignKey: "id_aluno",
      as: "aluno",
    });

    this.belongsTo(models.ListaMateriais, {
      foreignKey: "id_lista",
      as: "lista",
    });
  };

  return ListaAluno;
};
