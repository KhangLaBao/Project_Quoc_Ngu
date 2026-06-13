const fs = require('fs');
const s = fs.readFileSync('script.js', 'utf8');
const start = s.indexOf('const rules = {');
if (start === -1) { console.error('start not found'); process.exit(1); }
let i = start + 'const rules = {'.length;
let depth = 1;
for (; i < s.length; i++) {
  const c = s[i];
  if (c === '{') depth++;
  if (c === '}') depth--;
  if (depth === 0) break;
}
const block = s.slice(start, i+1);
const keys = [...block.matchAll(/^[ \t]*\"([^\"]+)\"\s*:/mg)].map(r => r[1]);
console.log(keys.length);
console.log(keys.slice(0,10).join(', '));
