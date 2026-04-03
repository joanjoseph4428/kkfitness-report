const fs = require('fs');
const path = require('path');

const HTML_FILES = ['index.html', 'coach.html', 'create.html', 'view.html'];
const DEST = 'dist';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  SUPABASE_URL 或 SUPABASE_ANON_KEY 未设置，保留占位符');
}

if (!fs.existsSync(DEST)) fs.mkdirSync(DEST);

HTML_FILES.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(DEST, file);
  let content = fs.readFileSync(src, 'utf-8');
  content = content.replace(/__SUPABASE_URL__/g, SUPABASE_URL);
  content = content.replace(/__SUPABASE_ANON_KEY__/g, SUPABASE_ANON_KEY);
  fs.writeFileSync(dest, content);
  console.log(`✓ ${file} → ${dest}`);
});

console.log('\n✅ 构建完成！');
