const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src');
function processDir(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('/result-dashboard')) {
                content = content.replace(/\/result-dashboard/g, '/results-dashboard');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed', fullPath);
            }
        }
    });
}
processDir(dir);
