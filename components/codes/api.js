const express = require('express');
const CodeRouter = express.Router();
const Utility = require('./../../services/utility');
const CodeService = require('./service');
/*const Authorize = require('./private/middlewares');*/

CodeRouter.get('/', /*Authorize._auth('user'),*/ (req, res) => {
    if (!req.query.key) {
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_PERMISSION_DENIED));
    }
    CodeService.getCode().then(data => {
                  return res.send(data);
            });
    });


CodeRouter.post('/', /*Authorize._auth('user'),*/ (req, res) => {
    if (!req.query.key) {
       return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_PERMISSION_DENIED));
    }
    let code = {
         content: req.body.content,
         language: req.body.language,
         author: req.user._id
    }
    CodeService.insertCode(code).then(data => {
        return res.send(data);
    });
});


CodeRouter.put('/:id',/*Authorize._auth('user'),*/(req,res) => {
    if (!req.query.key) {
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_PERMISSION_DENIED));
    }
    let code = {
        content: req.body.content,
        language: req.body.language,
        author: req.user._id
    }
    CodeService.updateCode(req.params.id,code).then(data => {
        return res.send(data);
    });
});


CodeRouter.delete('/:id',/*Authorize._auth('admin'),*/(req,res) => {
  let id = req.params.id;
     if(!id) {
         return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_ID_ERROR));
       }
     CodeService.deleteCode({_id: id}).then(data => {
         return res.send(data);
     });
});
module.exports = CodeRouter;
