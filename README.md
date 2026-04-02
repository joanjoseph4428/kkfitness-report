# 🏋️‍♂️ 健身训练报告系统

基于 Supabase + Vercel 的健身训练报告生成与分发系统。

## 功能
- 教练创建/编辑训练报告
- 训练动作记录（热身/力量/有氧/拉伸/核心）
- 体测数据记录
- 教练评语
- 发送报告给学员

## 部署

### 1. 上传代码到 GitHub
把本文件夹内容上传到 `joanjoseph4428/kkfitness-report` 仓库。

### 2. 在 Vercel 创建项目
1. 访问 https://vercel.com/new
2. Import 你的 GitHub 仓库
3. 添加环境变量：
   - `SUPABASE_URL` = `https://tjdrzjucvwebclsfvgrr.supabase.co`
   - `SUPABASE_ANON_KEY` = 你的 Anon Key
4. 点击 Deploy

### 3. 在 Supabase 创建数据表
在 Supabase SQL Editor 运行以下 SQL：

```sql
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  session_number INT DEFAULT 1,
  session_date DATE,
  duration INT DEFAULT 60,
  goal TEXT DEFAULT '减脂',
  location TEXT DEFAULT '器械区',
  coach_name TEXT DEFAULT '教练',
  status TEXT DEFAULT 'pending',
  report_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON reports FOR ALL USING (true);
```

## 页面说明
- `index.html` - 教练端首页，报告列表
- `coach.html` - 查看报告详情
- `create.html` - 创建/编辑报告
