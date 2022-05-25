'use strict';
module.exports = (sequelize, DataTypes) => {
  const syn_log = sequelize.define('syn_log', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_tramite: DataTypes.STRING,
    par_tramite: DataTypes.STRING,
    nombres_apellidos: DataTypes.STRING,
    fecha_nac: DataTypes.DATE,
    numero_doc: DataTypes.INTEGER,
    tipo_doc: DataTypes.STRING,
    pais_nac: DataTypes.STRING,
    serie: DataTypes.STRING,
    fecha_emi: DataTypes.DATE,
    fecha_ven: DataTypes.DATE,
    lugar_emi: DataTypes.STRING,
    estado: DataTypes.STRING,
    observacion: DataTypes.STRING,
    fecha_reg: DataTypes.DATE
  },
   {schema: 'dgm_scg_test',
    tableName: 'syn_log',
    
});
  return syn_log;
};