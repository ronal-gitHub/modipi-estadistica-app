const express = require('express');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
// require('../config/passport')(passport);
// rbc const Product = require('../models').Products; //rbc se cambio por tramites
const User = require('../models').Users;
const DetailDB = require('../models').inf_tramite;
//const DetailDB2 = require('../models').sync_log;
//onst Sequelize = require('sequelize'); 



router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ msg: 'Por favor introdusca usuario y password.' })
    } else {
        User
            .create({
                username: req.body.username,
                password: req.body.password
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
                username: req.body.username
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
                    res.json({ success: true, token: 'JWT ' + token, email: req.body.username });
                } else {
                    res.status(401).send({ success: false, msg:  'Autenticacion fallo. Password incorrrecto' });
                }
            })
        })
        .catch((error) => res.status(400).send(error));
});


// Endpoint Consulta flujos migratorios desde la tabla inf_tramite
router.get('/flujo', function (req, res) {
    console.log("=======");
    console.log(req.url);
    console.log("=======");
   // console.log(req.query.nroDoc);
    // var token = getToken(req.headers);
    // if (token) {
      
      DetailDB
            .findAll({             
            })
            .then((tramites) => { // rbc era prods
                var temp = tramites.filter(item =>  item.numero_doc.toString().includes(req.query.nroDoc.toString())
                    && (item.nombres_apellidos.toString().toLowerCase().includes(req.query.nombres.toString().toLowerCase()) 
                    && item.nombres_apellidos.toLowerCase().includes(req.query.apellidos.toString().toLowerCase()))
                    && moment(item.fecha_nac).format('DD/MM/YYYY').toString().includes(req.query.fechaNac.toString())
                );
                                  
             
                if(req.query.fechaReg == 'TODOS')
                    res.status(200).send(temp);
                else
                    res.status(200).send(temp.filter(item => req.query.fechaReg.toString().includes(item.fecha_reg.getFullYear().toString())));
            })
            .catch((error) => { res.status(400).send(error); });
    // } else {
    //     return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    // }
 // });
});

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
    console.log("=======");
    console.log(req.headers);
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

