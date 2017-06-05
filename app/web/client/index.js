const fs = require('fs');
const express = require('express');
const path = require('path');
const uuid = require('uuid/v1');
const {generateProgressItem} = require('./report-generator');
const guard = require('../guard');
const router = express.Router();

router.use(express.static(path.join(__dirname, 'public/dist')));
router.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/dist/index.html');
});

router.post('/generate', function(req, res, next) {
    fs.readFile(__dirname + '/reports/template.html', 'utf8', function(err, template) {
        const data = req.body;
        Promise.all((data.progress || []).map(p => generateProgressItem(p))).then(items => {
            data.progress = items.join();
            data.generationDate = new Date().toLocaleDateString();
            const report = template.replace(/({{.*?}})/gi, function(foundChunk, text) {
                const field = text.replace('{{', '').replace('}}', '');
                return data[field];
            });
            const link = `/reports/${uuid()}`;
            fs.writeFile(__dirname + `${link}.html`, report, function(err) {
                res.json({
                    ok: true,
                    link: link
                });
            });
        });
    });
});

router.delete('/reports/:id', guard, function(req, res, next) {
    fs.unlink(__dirname + `/reports/${req.params.id}.html`, function(err) {
        res.send({ok: true});
    });
});

router.get('/reports/:id', function(req, res, next) {
    res.sendFile(__dirname + `/reports/${req.params.id}.html`);
});

router.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/dist/index.html');
});

module.exports = router;