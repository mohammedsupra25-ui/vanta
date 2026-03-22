const fs = require('fs');
const path = 'src/components/interactives/Module03.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.split('\\`').join('\`');
content = content.split('\\$').join('$');
fs.writeFileSync(path, content);
console.log('Fixed escaping in ' + path);
