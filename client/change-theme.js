const fs = require('fs');
const path = require('path');

function replaceTheme(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace colors
  content = content.replace(/bg-navy-950/g, 'bg-slate-50');
  content = content.replace(/bg-slate-900/g, 'bg-white');
  content = content.replace(/bg-slate-950/g, 'bg-slate-100');
  content = content.replace(/border-slate-800/g, 'border-slate-200');
  content = content.replace(/border-slate-700/g, 'border-slate-300');
  content = content.replace(/text-slate-300/g, 'text-slate-600');
  content = content.replace(/text-slate-400/g, 'text-slate-500');
  
  content = content.replace(/hover:bg-slate-800\/60/g, 'hover:bg-slate-100');
  content = content.replace(/hover:bg-slate-800/g, 'hover:bg-slate-100');
  content = content.replace(/bg-slate-800/g, 'bg-slate-100');
  
  content = content.replace(/hover:text-white/g, 'hover:text-slate-900');

  // Carefully replace text-white
  // We only replace text-white if it's NOT on a line with a primary/brand background color
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('text-white')) {
      if (!lines[i].includes('bg-brand') && !lines[i].includes('bg-gradient-to-r') && !lines[i].includes('bg-rose') && !lines[i].includes('bg-emerald') && !lines[i].includes('bg-blue')) {
        lines[i] = lines[i].replace(/text-white/g, 'text-slate-900');
      }
    }
  }
  content = lines.join('\n');

  // Fix BrandLogo to isDark={false} since we're now on light mode
  content = content.replace(/<BrandLogo isDark=\{true\} \/>/g, '<BrandLogo isDark={false} />');

  fs.writeFileSync(filePath, content);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceTheme(fullPath);
      console.log('Processed', fullPath);
    }
  }
}

// Process public folder
processDirectory(path.join(__dirname, 'app', '(public)'));

// Process all components
processDirectory(path.join(__dirname, 'components'));

console.log('Public Theme changed to light mode!');
