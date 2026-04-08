const fs = require('fs');
const path = require('path');

const HTML_FILES = ['index.html', 'coach.html', 'create.html', 'view.html'];

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('WARNING: SUPABASE_URL or SUPABASE_ANON_KEY env vars not set');
}

HTML_FILES.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) { console.log('Skipping: ' + file); return; }
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Replace placeholder values
  content = content.replace(/__SUPABASE_URL__/g, SUPABASE_URL);
  content = content.replace(/__SUPABASE_ANON_KEY__/g, SUPABASE_ANON_KEY);

  // Fix the conditional logic: replace old broken check with proper truthy check
  content = content.replace(
    /const supabase = SUPABASE_URL !== '__SUPABASE_URL__' \? createClient\(SUPABASE_URL, SUPABASE_ANON_KEY\) : null;/g,
    "const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;"
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Injected: ' + file);
  } else {
    console.log('No changes: ' + file);
  }
});

console.log('Done');
