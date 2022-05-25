'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado_proceso: {
        type: Sequelize.INTEGER
      },
      estado_registro: {
        type: Sequelize.INTEGER
      },
      base_datos: {
        allowNull: false,
        type: Sequelize.STRING
      },
      par_tramite: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nombres_apellidos: {
        allowNull: false,
        type: Sequelize.STRING
      },
      procedencia: {
        type: Sequelize.STRING
      },
      destino: {
        type: Sequelize.STRING
      },
      fecha_viaje: {
        type: Sequelize.DATE
      },
      puesto_control: {
        type: Sequelize.STRING
      },
      lugar_tramite: {
        type: Sequelize.STRING
      },
      cod_tramite: {
        type: Sequelize.STRING
      },
      id_tramite_origen: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_persona: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nombres: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
      numero_doc: {
        type: Sequelize.STRING
      },
      fecha_nac: {
        type: Sequelize.DATE
      },
      tipo_doc: {
        type: Sequelize.STRING
      },
      serie: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};