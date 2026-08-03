const fs = require('fs');
const path = require('path');

function fixImports(dir, depth) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixImports(fullPath, depth + 1);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Calculate correct relative path to components
      let correctRelative = '';
      for (let i = 0; i < depth; i++) {
        correctRelative += '../';
      }
      correctRelative += 'components';
      
      // Calculate correct relative path to lib
      let correctLib = '';
      for (let i = 0; i < depth; i++) {
        correctLib += '../';
      }
      correctLib += 'lib';

      let original = content;
      // Replace anything like '../components' or '../../components' with the correct one
      content = content.replace(/(?:\.\.\/)+components/g, correctRelative);
      content = content.replace(/(?:\.\.\/)+lib/g, correctLib);
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
}

fixImports(path.join(__dirname, 'app'), 1);
