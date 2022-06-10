'use strict';
module.exports = (sequelize, DataTypes) => {
  const estidistica = sequelize.define('estidistica', {
    id_tramite: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id: DataTypes.INTEGER,
	indicador_id :DataTypes.INTEGER,
	id_padre:  DataTypes.INTEGER,
	descripcion:  DataTypes.STRING,
	fuente_inf_sigla: DataTypes.STRING,
	web_service_sigla:  DataTypes.STRING,
	start_date: DataTypes.DATE,
	end_date: DataTypes.DATE,
	tipo_dato: DataTypes.STRING,
	nivel_geo_minimo_sigla:  DataTypes.STRING,
	atributos_cabecera: DataTypes.STRING,
	payload_json: DataTypes.STRING

  },
   {schema: 'modipi_test',
    tableName: 'estdisitica',
    

});
  return estidistica;
};