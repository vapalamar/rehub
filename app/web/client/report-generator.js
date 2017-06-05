const fs = require('fs');

function generateProgressItem(model) {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/reports/progress-template.html', 'utf8', function(err, template) {
            if (err) {
                reject(err);
            }
            const report = template.replace(/({{.*?}})/gi, function(foundChunk, text) {
                const field = text.replace('{{', '').replace('}}', '');
                return model[field];
            });
            resolve(report);
        });
    });
}

module.exports = {generateProgressItem};