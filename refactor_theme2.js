const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const replacementsList = [
    ['bg-[hsl(240_10%_4%/0.85)]', 'bg-background/85'],
    ['bg-[hsl(240_10%_4%)]', 'bg-background'],
    ['text-white', 'text-text-primary'],
    ['text-zinc-950', 'text-white'], // inverse
    ['text-zinc-50', 'text-text-primary'],
    ['text-zinc-100', 'text-text-primary'],
    ['text-zinc-200', 'text-text-primary'],
    ['text-zinc-300', 'text-text-primary'],
    ['text-zinc-400', 'text-text-secondary'],
    ['text-zinc-500', 'text-text-secondary'],
    ['text-zinc-600', 'text-text-secondary'],
    ['text-zinc-700', 'text-text-secondary'],
    ['bg-zinc-950', 'bg-background'],
    ['bg-zinc-900/80', 'bg-card'],
    ['bg-zinc-900/50', 'bg-card'],
    ['bg-zinc-900', 'bg-card'],
    ['bg-zinc-800/80', 'bg-card-elevated'],
    ['bg-zinc-800/50', 'bg-card-elevated'],
    ['bg-zinc-800', 'bg-card-elevated'],
    ['bg-zinc-700', 'bg-border'],
    ['bg-zinc-950/80', 'bg-background/80'],
    ['border-white/5', 'border-border-subtle'],
    ['border-white/10', 'border-border'],
    ['border-white/20', 'border-border'],
    ['border-zinc-800', 'border-border'],
    ['border-zinc-700', 'border-border'],
    ['border-zinc-900', 'border-border'],
    ['bg-white/5', 'bg-black/5'],
    ['bg-white/10', 'bg-black/10'],
    ['hover:bg-white/5', 'hover:bg-black/5'],
    ['hover:bg-white/10', 'hover:bg-black/10'],
    ['hover:text-white', 'hover:text-text-primary'],
    ['from-zinc-900', 'from-background'],
    ['to-zinc-950', 'to-card'],
    ['ring-white/10', 'ring-black/10'],
    ['glow-danger', 'shadow-sm shadow-red-500/20 ring-1 ring-red-500/30'],
    ['glow-warning', 'shadow-sm shadow-orange-500/20 ring-1 ring-orange-500/30'],
    ['glow-safe', 'shadow-sm shadow-green-500/20 ring-1 ring-green-500/30']
];

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processDir(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            for (let [target, replacement] of replacementsList) {
                const regex = new RegExp("(?<=[\\s\"'`])" + escapeRegExp(target) + "(?=[\\s\"'`])", "g");
                content = content.replace(regex, replacement);
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
