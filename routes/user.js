const express = require('express')
const app = express();
const Usuario = require('../models/user');
const bcrypt = require('bcrypt');


// const {
//     verificaToken,
//     verifica_Admin_Role
// } = require('../middleware/autentificacion');


//  GET LIST
app.get('/user/', (req, res) => {
    Usuario.find()
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuarios
            });
        });

});


// GET ID USUARIO


app.get('/user/:id', (req, res) => {
    id = req.params.id;
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: "El id no es correcto"
            });
        };
        res.json({
            ok: true,
            usuarioDB
        });
    });

});


// POST USUARIO DATA 
//[verificaToken, verifica_Admin_Role], 

app.post('/user', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        name: body.name,
    });



    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            sala: usuarioDB
        });

    });


});

app.put('/user/:id', (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let nombreUsuario = {
        name: body.name,
    };
    // usuarioBD.save valid
    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            sala: usuarioDB
        });
    });

});


app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let cambiaState = {
        state: false
    }

    Usuario.findByIdAndUpdate(id, cambiaState, {
        new: true,
    }, (err, usuarioBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Sala no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});


module.exports = app;