const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

function processDir(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Replaces remaining white-alpha with black-alpha for light mode contrast
            content = content.replace(/border-white\/(\d+)/g, 'border-black/$1');
            content = content.replace(/bg-white\/\.?\[?([\d\.]+)\]?/g, 'bg-black/[$1]');
            content = content.replace(/hover:bg-white\/\.?\[?([\d\.]+)\]?/g, 'hover:bg-black/[$1]');
            
            // Primary button text
            content = content.replace(/text-zinc-950/g, 'text-white');
            
            // Remaining zincs
            content = content.replace(/text-zinc-400/g, 'text-text-secondary');
            content = content.replace(/text-zinc-500/g, 'text-text-secondary');
            content = content.replace(/text-zinc-600/g, 'text-text-secondary');
            content = content.replace(/bg-zinc-600/g, 'bg-border');
            content = content.replace(/bg-zinc-800/g, 'bg-card-elevated');
            content = content.replace(/bg-zinc-900/g, 'bg-card');
            content = content.replace(/bg-zinc-950/g, 'bg-background');
            content = content.replace(/from-zinc-950/g, 'from-background');
            content = content.replace(/to-zinc-950/g, 'to-background');
            
            // Glow and shadows that are too gimmicky or clash in light mode
            content = content.replace(/glow-cyan/g, 'shadow-sm shadow-cyan-500/30');
            content = content.replace(/text-gradient-cyan/g, 'text-primary');

            // Text readability tweaks
            content = content.replace(/text-cyan-400/g, 'text-primary');
            content = content.replace(/text-cyan-500/g, 'text-primary');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated', fullPath);
            }
        }
    });
}
processDir(dir);
console.log('Theme refined.');
