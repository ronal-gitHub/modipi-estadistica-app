const sequelize = require('sequelize');
const axios = require('axios');

const express = require('express');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
// require('../config/passport')(passport);
// rbc const Product = require('../models').Products; //rbc se cambio por tramites
const User = require('../models').usuario;
const DetailDB = require('../models').estidistica;
//const DetailDB2 = require('../models').sync_log;
//onst Sequelize = require('sequelize'); 



router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ msg: 'Por favor introdusca usuario y password.' })
    } else {
        User
            .create({
                login: req.body.username,
                password_hash: req.body.password,
                nombres: '', //req.body.nombres,
                apellidos: '', //req.body.apellidos,
                email: '', //req.body.email,
                reset_key: 'false' , //req.body.reset_key,
                puesto_id: 0  // req.body.puesto_id
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => {
                console.log(error);
                // console.log("<<<<<<<<")
                res.status(400).send(error);
            });
    }
});

router.post('/signin', function (req, res) {
    User
        .findOne({
            where: {
                login: req.body.username
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    message: 'Autenticacion fallo. El usuario no existe',
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', { expiresIn: 86400 * 30 });
                    jwt.verify(token, 'nodeauthsecret', function (err, data) {
                        console.log(err, data);
                    })
                    res.json({ success: true, token: 'JWT ' + token, login: req.body.username , id:  user.id});
                } else {
                    res.status(401).send({ success: false, msg:  'Autenticacion fallo. Password incorrrecto' });
                }
            })
        })
        .catch((error) => res.status(400).send(error));
});


// Consulta estidisticas mediante su id y titulo


router.get  ('/indicador', async function (req, res)   {
  try { //  The variable that received the HTTP data had to use the await keyword to ensure the asynchronous data was received before continuing
   // var token = getToken(req.headers);
 console.log(req.headers);

     if (true) {
      // Verify the token using jwt.verify method
    //  const decode =   jwt.verify(token, 'nodeauthsecret');

  //  const wsExterno = await    wsExternos(); // llamda a ws wxternos ej INTERPOL
     
      // Use raw SQL queries to select all rows which belongs to the tramite_inf
     // console.log(req.url);  // [results, metadata]
     let results = await DetailDB.sequelize.query(  
        "	 WITH estadistica_json AS (	"+
"	SELECT  sec::numeric , filas ,filas->>'B' col_B , filas->>'C' col_C  ,filas->>'E' col_E ,filas->>'F' col_F  ,filas->>'G' col_G , filas->>'H' col_H, filas->>'I' col_I, filas->>'J' col_J, filas->>'K' col_K, filas->>'L' col_L from (	"+
"	 select   (json_array_elements (payload_json::json->'arr') ->>'A') as sec, json_array_elements (payload_json::json->'arr')as filas  	"+
"	  FROM modipi_test.estadistica where   status = 'ACTIVO' AND indicador_id= 1) as subqry /* :id_indic */	"+
"	   )  	"+
"	 , titulo_json AS  (select sec FROM estadistica_json  where    filas->>'B' = 'NÚMERO DE VIVENDAS POR TIPO DE VIVIENDA, SEGÚN  DEPARTAMENTO, PROVINCIA Y MUNICIPIO, CNPV 2012'  ) 	"+
"	 , titulo_fin_json AS  (select sec  FROM estadistica_json where    sec >= (select sec  from titulo_json) and  filas->>'B' = 'Fuente: Instituto Nacional de Estadistica' ORDER BY sec ASC FETCH FIRST ROW ONLY  )	"+
"	 , set_data_json as (select sec,  col_B, col_C, col_E, col_F ,  col_G ,  col_H,  col_I,  col_J,col_K,col_L , 'themes.primary' backgroundColor,  'transparent' borderColor  FROM estadistica_json est1      where sec BETWEEN  (select sec  from titulo_json) AND   (select sec  from titulo_FIN_json) )	"+
"	, estadistica_cols_tit as (select (array[ col_F , col_G ,  col_H,  col_I,col_J,col_K,col_L  ]) labels  from set_data_json WHERE col_F in ('Total') group by sec ,col_C,col_F,  col_G ,  col_H,  col_I,col_J,col_K,col_L order by sec  ) 	"+
"	 , estadistica_cols_dep as (select col_C as label,(array[ col_F::NUMERIC , col_G::NUMERIC ,  col_H::NUMERIC ,  col_I::NUMERIC, col_J::NUMERIC,col_K::NUMERIC,col_L::NUMERIC   ]) as data , backgroundColor, borderColor from set_data_json WHERE col_C in ('La Paz','Chuquisaca','Cochabamba','Oruro','Potosi','Tarija','Santa Cruz','Beni','Pando') group by sec ,col_C, col_G , col_F, col_H,  col_I,col_J,col_K,col_L ,backgroundColor,borderColor order by sec  )	"+
"	 , estadistica_cols_mun as (select col_E as label,(array[ col_F::NUMERIC , col_G::NUMERIC ,  col_H::NUMERIC ,  col_I::NUMERIC,  col_J::NUMERIC,col_K::NUMERIC,col_L::NUMERIC  ]) as data , backgroundColor, borderColor from set_data_json WHERE col_E in ('Yotala') group by sec ,col_E,col_F,col_G,col_H,col_I,col_J,col_K,col_L ,backgroundColor,borderColor order by sec  )	"+
"	  SELECT labels FROM  estadistica_cols_tit 	",
       {
             
             type: DetailDB.sequelize.QueryTypes.SELECT
         });  // bind: {status}


     const results_det = await DetailDB.sequelize.query(  
        "	 WITH estadistica_json AS (	"+
"	SELECT  sec::numeric , filas ,filas->>'B' col_B , filas->>'C' col_C  ,filas->>'E' col_E ,filas->>'F' col_F  ,filas->>'G' col_G , filas->>'H' col_H, filas->>'I' col_I, filas->>'J' col_J, filas->>'K' col_K, filas->>'L' col_L from (	"+
"	 select   (json_array_elements (payload_json::json->'arr') ->>'A') as sec, json_array_elements (payload_json::json->'arr')as filas  	"+
"	  FROM modipi_test.estadistica where   status = 'ACTIVO' AND indicador_id= 1) as subqry /* :id_indic */	"+
"	   )  	"+
"	 , titulo_json AS  (select sec FROM estadistica_json  where    filas->>'B' = 'NÚMERO DE VIVENDAS POR TIPO DE VIVIENDA, SEGÚN  DEPARTAMENTO, PROVINCIA Y MUNICIPIO, CNPV 2012'  ) 	"+
"	 , titulo_fin_json AS  (select sec  FROM estadistica_json where    sec >= (select sec  from titulo_json) and  filas->>'B' = 'Fuente: Instituto Nacional de Estadistica' ORDER BY sec ASC FETCH FIRST ROW ONLY  )	"+
"	 , set_data_json as (select sec,  col_B, col_C, col_E, col_F ,  col_G ,  col_H,  col_I,  col_J,col_K,col_L , 'themes.primary' backgroundColor,  'transparent' borderColor  FROM estadistica_json est1      where sec BETWEEN  (select sec  from titulo_json) AND   (select sec  from titulo_FIN_json) )	"+
"	, estadistica_cols_tit as (select (array[ col_F , col_G ,  col_H,  col_I,col_J,col_K,col_L  ]) labels  from set_data_json WHERE col_F in ('Total') group by sec ,col_C,col_F,  col_G ,  col_H,  col_I,col_J,col_K,col_L order by sec  ) 	"+
"	 , estadistica_cols_dep as (select col_C as label,(array[ col_F::NUMERIC , col_G::NUMERIC ,  col_H::NUMERIC ,  col_I::NUMERIC, col_J::NUMERIC,col_K::NUMERIC,col_L::NUMERIC   ]) as data , backgroundColor, borderColor from set_data_json WHERE col_C in ('La Paz','Chuquisaca','Cochabamba','Oruro','Potosi','Tarija','Santa Cruz','Beni','Pando') group by sec ,col_C, col_G , col_F, col_H,  col_I,col_J,col_K,col_L ,backgroundColor,borderColor order by sec  )	"+
"	 , estadistica_cols_mun as (select col_E as label,(array[ col_F::NUMERIC , col_G::NUMERIC ,  col_H::NUMERIC ,  col_I::NUMERIC,  col_J::NUMERIC,col_K::NUMERIC,col_L::NUMERIC  ]) as data , backgroundColor, borderColor from set_data_json WHERE col_E in ('Yotala') group by sec ,col_E,col_F,col_G,col_H,col_I,col_J,col_K,col_L ,backgroundColor,borderColor order by sec  )	"+
"	 SELECT label,REPLACE (data::TEXT,',NULL','' ) AS data,	backgroundcolor,	bordercolor FROM estadistica_cols_dep 	",
       {
             
             type: DetailDB.sequelize.QueryTypes.SELECT
         });  // bind: {status}

          console.log("===**+**====");     
         // console.log(typeof wsExterno) ; // object 
         // console.log(wsExterno);
          console.log(typeof results_det) ; 
         // console.log(results_det);
        results.push(results_det);
         console.log(results);
       return  res.status(200).send(results);    // res.json({ success: true, email: req.query.nroDoc });
      } else {
         return res.status(403).send({ success: false, msg: 'Unauthorized.' });
     }
     }catch (error) {
       console.log("===2====");
      // console.log((res.json({error:error.message})));
       return res.json({error:error.message});
      }

    });
    //    const numero_doc = results.map(elm => elm.numero_doc);
      // const resultsMap = new Map();
     //  results.forEach(message => resultsMap.set(results.numero_doc, message));

      /*this.body = messages.map(function(user) {
       const obj = user.toJSON();
       obj.recentMessage = messagesMap.get(obj.id);
       return obj;*/

       router.get  ('/paramsCboVisible', async function (req, res)   {
        try { //  The variable that received the HTTP data had to use the await keyword to ensure the asynchronous data was received before continuing
         // var token = getToken(req.headers);
       console.log(req.headers);
      
           if (true) {
            // Verify the token using jwt.verify method
          //  const decode =   jwt.verify(token, 'nodeauthsecret');
      
         
           const results =  {arr:[
            {
                  label: "Departamento",
                  data: ["DPTO_CH:huquisica","DPTO_LP:La Paz"],
                  index_data: 1,
                  position_cbo_cbo: 1,
                  enable: "false",
                  visible:"true",
                  level: "Departamento",
                  father_cbo: ""
              },
            {
                  label: "Municipio",
                  data: ["DPTO_CH:Sucre","DPTO_CH:Tolata","DPTO_LP:Murillo","DPTO_LP:El Alto"],
                  index_data: 1,
                  position_cbo: 2,
                  enable: "false",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Departamento"
              },
              {
                  label: "Grupo etareo",
                  data: ["GRP_1_TODO:RANGO DE 0 A 99 AÑOS CUMPLIDOS","GRP_0_1_AÑOS:RANGO DE 1 MES A 11.9 MESES CUMPLIDOS"],
                  index_data: 1,
                  position_cbo: 3,
                  enable: "true",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Inicador"
              },
                {
                  label: "Edad desde",
                  data: ["GRP_1_TODO:0 años", "GRP_0_1_AÑOS:0 meses"],
                  index_data: 1,
                  position_cbo: 4,
                  enable: "true",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Grupo etareo"
              }, 
                {
                  label: "Edad hasta",
                  data: ["GRP_1_TODO:99 años","GRP_0_1_AÑOS:11.9 meses"],
                  index_data: 1,
                  position_cbo: 5,
                  enable: "true",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Grupo etareo"
              }, 	
            {
                  label: "genero",
                  data: ["A-AMBOS","M-MASCULINO","F-FEMENINO"],
                  index_data: 1,
                  position_cbo: 6,
                  enable: "true",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Indicador"
              }, 
              {
                  label: "Riesgo",
                  data: ["ALTO", "MEDIO"],
                  index_data: 2,
                  position_cbo: 7,
                  enable: "true",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Indicador"
              },
            {
                  label: "Periodo de tiempo",
                  data: ["ANUAL","SEMESTRAL-1","SEMESTRAL-2","TRIMESTRAL-1"],
                  index_data: 1,
                  position_cbo: 8,
                  enable: "true",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Indicador"
              },
              {
                  label: "Fecha desde",
                  data: ["ANUAL:01/01/2019","SEMESTRAL-1:01/01/2019","SEMESTRAL-2:01/07/2019"],
                  position_cbo: 9,
                  enable: "false",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Periodo de tiempo"
              }, 
                {
                  label: "Fecha hasta",
                  data: ["ANUAL:31/12/2019","SEMESTRAL-1:30/06/2019","SEMESTRAL-2:31/12/2019"],
                  position_cbo: 10,
                  enable: "false",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Periodo de tiempo"
              }, 	
           {
                  label: "Componente",
                  data: ["COMPONENTE-1","COMPONENTE-2"],
                  position_cbo: 11,
                  enable: "false",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: ""
              },
           {
                  label: "Dimension",
                  data: ["COMPONENTE-1:DIMENSION-1-1","COMPONENTE-1:DIMENSION-1-2","COMPONENTE-2:DIMENSION-2-1"],
                  position_cbo: 12,
                  enable: "false",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Componente"
              }, 
              {
                  label: "SubDimension",
                  data: ["DIMENSION-1-1:SUBDIMENSION-1-1-1","DIMENSION-1-2:SUBDIMENSION-1-2-1"],
                  position_cbo: 13,
                  enable: "false",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Dimension"
              },
           {
                  label: "Indicador",
                  data: ["SUBDIMENSION-1-1-1:(1)-NÚMERO DE VIVENDAS POR TIPO DE VIVIENDA, SEGÚN  DEPARTAMENTO, PROVINCIA Y MunicipioICIPIO, CNPV 2012", "SUBDIMENSION-1-2-1:(2)NUMERO DE VIVIENDAS  CON POBLACION  DE 1 AÑO DE EDAD POR TIPO DE VIVIENDA, SEGÚN  DEPARTAMENTO, PROVINCIA Y MunicipioICIPIO,CNPV 2012"],
                  position_cbo: 14,
                  enable: "true",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "SubDimension"
              },
           {
                  label: "Estado",
                  data: ["(1):ACTIVO","(2):ACTIVO"],
                  position_cbo: 15,
                  enable: "false",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Indicador"
              },
           {
                  label: "RURAL URBANO",
                  data: ["(1):AMBOS","(2):AMBOS"],
                  position_cbo: 16,
                  enable: "false",
                  visible:"true",
                  level: "Municipio",
                  father_cbo: "Indicador"
              }, {
                  label: "ES MIGRANTE",
                  data: ["(1):NO","(2):NO"],
                  position_cbo: 17,
                  enable: "false",
                  visible:"false",
                  level: "Municipio",
                  father_cbo: "Indicador"
              }         
             ]};
      
                console.log("===**+**====");     
               // console.log(typeof wsExterno) ; // object 
               // console.log(wsExterno);
                console.log(typeof results) ; 
                console.log(results);
             // results.push(wsExterno);
          
             return  res.status(200).send(results);    // res.json({ success: true, email: req.query.nroDoc });
            } else {
               return res.status(403).send({ success: false, msg: 'Unauthorized.' });
           }
           }catch (error) {
             console.log("===2====");
            // console.log((res.json({error:error.message})));
             return res.json({error:error.message});
            }
      
          });


    const wsExternos = async (param1,param2) => {
        var respBodyMinPub= {};
        var respBodyMinPub= {};
        var jsons = new Array();
  
        try {
            const [response1, response2] = await axios.all([
              axios.get('https://jsonplaceholder.typicode.com/users/1'),  // llamda ws INTERPOL
              axios.get('https://jsonplaceholder.typicode.com/users/2XXXX') //  
            ]); 
            // const headerDate = response1.headers && response1.headers.date ? response1.headers.date : 'no response date';
             //  console.log(response2.data.url); //console.log('Date in Response header:', headerDate);
            // if (response1.status != '200') return {};
         
           //  console.log('Status Code:', response1.status); //            console.log( JSON.stringify(response1)); 
                    
           let obj1 = response1.data;  //JSON.parse(response1);
           let obj2 = response2.data; //JSON.parse(response2);         
        //  console.log(typeof response1.data) ;                
         
            jsons.push(obj1);
            jsons.push(obj2);
     
            console.log("===1.1====");     // console.log(jsons);
         //  respBodyInterpol = jsons; 
          } catch (error) {
              
              var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date+' '+time;
              
              console.log("====1.2===");
              var code = error.response.status;
              var errorKey = "801-NOT_FOUND_INTERPOL";
              var message = "Error. El WS se encuentra Fuera de Línea. "+ error.message;
              var path = "https://jsonplaceholder.typicode.com/users";
              
              respBodyInterpol = {
                "code": code,
                "errorKey": errorKey,
                "message": message,
                "path": path,
                "submitTime": dateTime
                } 
                jsons.push(respBodyInterpol);           
            //  respBodyMinPub = JSON.stringify(respBodyMinPub); // JSON.parse(jsons);
             //  console.log(respBodyMinPub);
          }
        
          // desde aqui min pub
          try {
          
            const [response3, response4] = await axios.all([
                axios.get('https://jsonplaceholder.typicode.com/usersXX/3'),  // 
                axios.get('https://jsonplaceholder.typicode.com/users/4') //  llamda ws min publico
              ]); 
                              
           let obj3 = response3.data;  
           let obj4 = response4.data;        
        //  console.log(typeof response1.data) ;                          
            jsons.push(obj3);
            jsons.push(obj4);
        
            console.log("====2.1===");
            //jsons.push(respBodyInterpol);//console.log(jsons);
            return jsons; 

          } catch (error) {
           
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            console.log("====2.2===");
              var code =  error.response.status;  //  error.response.data.message)
              var errorKey = "803-NOT_FOUND_MIN_PUB";
              var message = "Error. El WS se encuentra Fuera de Línea. "+error.message;
              var path = "https://jsonplaceholder.typicode.com/users";
             
              var respBodyMinPub = {
                "code": code,
                "errorKey": errorKey,
                "message": message,
                "path": path,
                "submitTime": dateTime
                } 
                           
            //    console.log(typeof respBodyMinPub) ;   // string
               jsons.push(respBodyMinPub);
              // console.log( jsons);   
              // console.log(JSON.stringify(jsons));  //       console.log(JSON.parse(jsons));
              
             return jsons ;
          }
        };
    //    https://exerror.com/unhandledpromiserejectionwarning-this-error-originated-either-by-throwing-inside-of-an-async-function-without-a-catch-block/
 
router.post('/create', function (req, res) {
    const ini_details = {
        par_tramite: req.body.par_tramite,
        nombres_apellidos: req.body.nombres_apellidos,
        fecha_nac: new Date(req.body.fecha_nac),
        numero_doc: parseInt(req.body.numero_doc),
        tipo_doc: req.body.tipo_doc,
        pais_nac: req.body.pais_nac,
        serie: req.body.serie,
        fecha_emi: new Date(req.body.fecha_emi),
        fecha_ven: new Date(req.body.fecha_ven),
        lugar_emi: req.body.lugar_emi,
        estado: req.body.estado,
        observacion: req.body.observacion
    };
    console.log("<<<<<<");
    console.log(ini_details);
    // var token = getToken(req.headers);
    // if (token) {
        DetailDB
            .create(ini_details)
            .then((product) => res.status(201).send(product))
            .catch((error) => res.status(400).send(error));
    // } else {
    //     return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    // }
});

router.post('/update', function (req, res) {

    const ini_details = {
        par_tramite: req.body.par_tramite,
        nombres_apellidos: req.body.nombres_apellidos,
        fecha_nac: req.body.fecha_nac,
        numero_doc: req.body.numero_doc,
        tipo_doc: req.body.tipo_doc,
        pais_nac: req.body.pais_nac,
        serie: req.body.serie,
        fecha_emi: req.body.fecha_emi,
        fecha_ven: req.body.fecha_ven,
        lugar_emi: req.body.lugar_emi,
        estado: req.body.estado,
        observacion: req.body.observacion
    };
    // var token = getToken(req.headers);
    // if (token) {
    DetailDB
        .update(ini_details, {
            where: {id: req.body.id}
        })
        .then((product) => res.status(201).send(product))
        .catch((error) => res.status(400).send(error));
    // } else {
    //     return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    // }
});

router.post('/del_id', function (req, res) {
    console.log("=======");
    console.log(req.body.id);
    // var token = getToken(req.headers);
    // if (token) {
    DetailDB
        .destroy({
            where: { id: req.body.id }
        })
        .then(() => {
            res.status(201).send({
                message: "Registro was deleted successfully!"
            });
        })
        .catch(() => res.status(400).send({error:"error"}));
    // } else {
    //     return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    // }
});

router.post('/check_token/', function (req, res) {
    console.log("====tk===");
    //console.log(req.headers);
    var token = getToken(req.headers);
    if (token) {
        res.json({ success: true, token: 'JWT ' + token, username: req.body.username });
    } else {
        res.json({ invalid: 1 });
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;

