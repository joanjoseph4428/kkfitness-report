const fs = require('fs');
const path = require('path');

const HTML_FILES = ['index.html', 'coach.html', 'create.html', 'view.html'];

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('WARNING: SUPABASE_URL or SUPABASE_ANON_KEY env vars not set');
  console.warn('Build will continue but Supabase will not connect at runtime');
}

HTML_FILES.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping missing file: ' + file);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  content = content.replace(/__SUPABASE_URL__/g, SUPABASE_URL);
  content = content.replace(/__SUPABASE_ANON_KEY__/g, SUPABASE_ANON_KEY);
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Injected env vars into: ' + file);
  } else {
    console.log('No changes needed: ' + file);
  }
});

console.log('Build-time env var injection complete');
