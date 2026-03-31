const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const replacements = [
    { regex: /\btext-zinc-50\b/g, replacement: 'text-text-primary' },
    { regex: /\btext-zinc-100\b/g, replacement: 'text-text-primary' },
    { regex: /\btext-zinc-200\b/g, replacement: 'text-text-primary' },
    { regex: /\btext-zinc-300\b/g, replacement: 'text-text-primary' },
    { regex: /\btext-white\b/g,  replacement: 'text-text-primary' },
    { regex: /\btext-zinc-400\b/g, replacement: 'text-text-secondary' },
    { regex: /\btext-zinc-500\b/g, replacement: 'text-text-secondary' },
    { regex: /\btext-zinc-600\b/g, replacement: 'text-text-secondary' },
    { regex: /\bbg-zinc-950\b/g, replacement: 'bg-background' },
    { regex: /\bbg-zinc-900\/80\b/g, replacement: 'bg-card' },
    { regex: /\bbg-zinc-900\/50\b/g, replacement: 'bg-card' },
    { regex: /\bbg-zinc-900\b/g, replacement: 'bg-card' },
    { regex: /\bbg-zinc-800\/50\b/g, replacement: 'bg-card-elevated' },
    { regex: /\bbg-zinc-800\b/g, replacement: 'bg-card-elevated' },
    { regex: /\bbg-zinc-700\b/g, replacement: 'bg-border' },
    { regex: /\bborder-white\/5\b/g, replacement: 'border-border-subtle' },
    { regex: /\bborder-white\/10\b/g, replacement: 'border-border' },
    { regex: /\bborder-white\/20\b/g, replacement: 'border-border' },
    { regex: /\bborder-zinc-800\b/g, replacement: 'border-border' },
    { regex: /\bborder-zinc-700\b/g, replacement: 'border-border' },
    { regex: /\bborder-zinc-900\b/g, replacement: 'border-border' },
    { regex: /bg-\[hsl\(240_10%_4%\/0\.85\)\]/g, replacement: 'bg-background/85' },
    { regex: /\bbg-white\/5\b/g, replacement: 'bg-black/5' },
    { regex: /\bhover:bg-white\/5\b/g, replacement: 'hover:bg-black/5' },
    { regex: /\bhover:bg-white\/10\b/g, replacement: 'hover:bg-black/10' },
    { regex: /\bring-white\/10\b/g, replacement: 'ring-black/10' },
    
    // extra ones specific for full light mode
    { regex: /\bfrom-zinc-900\b/g, replacement: 'from-background' },
    { regex: /\bto-zinc-950\b/g, replacement: 'to-card' },
    { regex: /\btext-zinc-950\b/g, replacement: 'text-white' }, // e.g. text on primary buttons
];

function processDir(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            for (let r of replacements) {
                content = content.replace(r.regex, r.replacement);
            }
            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated', fullPath);
            }
        }
    });
}
processDir(dir);
console.log('Theme classes updated successfully.');
