/* Chạy cả bộ câu thử KHÔNG CẦN TRÌNH DUYỆT, rồi in ra bảng markdown để dán vào results/.
   Chạy:  node eval/run-golden.mjs            (24 câu)
          node eval/run-golden.mjs 3          (chỉ 3 câu đầu, để thử key)

   Cách chính thức của nhóm là nút "▶ Chạy cả bộ" trong bản mẫu (xem README.md) — file này
   chỉ là cùng phép đo đó chạy trong terminal. KHÔNG có prompt thứ hai và không có luật chấm
   thứ hai: nó nạp thẳng đoạn JS trong codebase/prototype/index.html qua selftest/_load.mjs,
   nên mọi thay đổi trong bản mẫu tự động áp vào đây.

   Key đọc từ codebase/prototype/config.local.js (file đã bị .gitignore) hoặc biến môi trường
   GROQ_API_KEY. Key không bao giờ được in ra. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const nativeFetch = globalThis.fetch;
const HERE = path.dirname(fileURLToPath(import.meta.url));
const { load } = await import('file://' + path.resolve(HERE, 'selftest/_load.mjs').replace(/\\/g, '/'));
const A = load();
global.__FETCH = (...a) => nativeFetch(...a);

/* ---- Key ---- */
let key = process.env.GROQ_API_KEY || '';
if (!key) {
  const cfg = path.resolve(HERE, '../codebase/prototype/config.local.js');
  if (fs.existsSync(cfg)) key = (fs.readFileSync(cfg, 'utf8').match(/GROQ_API_KEY\s*:\s*'([^']*)'/) || [])[1] || '';
}
if (!key) {
  console.error('Chưa có key. Điền GROQ_API_KEY trong codebase/prototype/config.local.js');
  console.error('(copy từ config.local.example.js) hoặc đặt biến môi trường GROQ_API_KEY.');
  process.exit(2);
}
A.ai.key = key; A.ai.on = true;

/* ---- Chạy ---- */
const limit = Number(process.argv[2]) || A.GOLDEN.length;
const cases = A.GOLDEN.slice(0, limit);
const RES = {};

/* Log thô: mỗi câu một dòng JSON, ghi nguyên văn thứ mô hình trả về trước khi
   máy trạng thái xử lý. Đây là bằng chứng cho con số trong results/*.md —
   không có log thì tỉ lệ % chỉ là lời khai. */
const LOGPATH = path.resolve(HERE, 'results', (process.env.RUN_TAG || 'run-tmp') + '-raw.jsonl');
fs.mkdirSync(path.dirname(LOGPATH), { recursive: true });
fs.writeFileSync(LOGPATH, '');
const logLine = o => fs.appendFileSync(LOGPATH, JSON.stringify(o) + '\n', 'utf8');
logLine({ type:'meta', at:new Date().toISOString(), model:A.CFG.MODEL,
          temperature:A.CFG.TEMPERATURE, max_tokens:A.CFG.MAX_TOKENS,
          reasoning:A.CFG.REASONING, retries:A.CFG.RETRIES,
          demo_today:A.CFG.DEMO_TODAY, thresholds:{ t_low:A.T_LOW, t_high:A.T_HIGH },
          golden_size:A.GOLDEN.length, cases_run:cases.length,
          prompt_sha_len:A.systemPrompt().length, node:process.version });
console.error('Model ' + A.CFG.MODEL + ' · ' + cases.length + ' câu.');
console.error('Free tier Groq giới hạn token/phút nên gặp 429 là bình thường: máy tự chờ rồi thử lại.');
console.error('Cả bộ có thể mất 3–5 phút.\n');
for (let i = 0; i < cases.length; i++) {
  const c = cases[i];
  let r;
  try { r = await A.callAI(c.q); }
  catch (e) { r = { path: '—', intent: '—', aiError: String((e && e.message) || e) }; }
  const g = A.gradeCase(c, r);
  RES[c.id] = { r, g };
  logLine({ type:'case', id:c.id, at:new Date().toISOString(),
            question:c.q,
            expected:{ path:c.exp, intent:c.intent, src:c.src },
            model_raw: r.aiRaw || null,           /* NGUYÊN VĂN JSON mô hình trả về */
            decided:{ path:r.path, intent:r.intent, conf:r.conf,
                      conflict:!!r.conflict, ambiguous:!!r.ambiguous,
                      sources:r.sources || [], age_days:r.ageDays },
            answer_shown:{ answer:r.answer || null, sure:r.sure || null, unsure:r.unsure || null },
            grade:{ kind:g.kind, why:g.why },
            real:!!r.real, error:r.aiError || null,
            ms:r.ms || null, tokens:r.tokens || null, model:r.model || null });
  const mark = g.kind === 'pass' ? 'ĐẠT     ' : g.kind === 'fail' ? 'CHƯA ĐẠT' : 'LỖI     ';
  console.error(String(i + 1).padStart(2) + '/' + cases.length + '  ' + c.id + '  ' + mark +
    '  ' + String(r.path).padEnd(9) + ' ' + (typeof r.conf === 'number' ? r.conf.toFixed(2) : '   ') +
    '  ' + (r.ms || 0) + 'ms' + (g.kind === 'pass' ? '' : '  ← ' + g.why));
  await new Promise(s => setTimeout(s, 1200));   /* giãn nhịp cho giới hạn token/phút */
}

/* ---- Bảng markdown, cùng định dạng với nút xuất trong bản mẫu ---- */
const ids  = Object.keys(RES);
const pass = ids.filter(k => RES[k].g.kind === 'pass').length;
const fail = ids.filter(k => RES[k].g.kind === 'fail').length;
const err  = ids.filter(k => RES[k].g.kind === 'err').length;
const real = ids.filter(k => RES[k].r.real);
const ms   = real.length ? Math.round(real.reduce((a, k) => a + (RES[k].r.ms || 0), 0) / real.length) : 0;
const tok  = real.reduce((a, k) => a + (RES[k].r.tokens || 0), 0);
const pct  = ids.length ? Math.round(pass / ids.length * 100) : 0;
const L = [];
L.push('### Lượt chạy · ' + new Date().toLocaleString('vi-VN'));
L.push('');
L.push('| Thông số | Giá trị |');
L.push('|---|---|');
L.push('| Mô hình | `' + A.CFG.MODEL + '` (Groq) · temperature ' + A.CFG.TEMPERATURE + ' |');
L.push('| Bộ câu thử | ' + A.GOLDEN.length + ' câu · `eval/golden-set.md` |');
L.push('| Chạy bằng AI thật | ' + real.length + '/' + ids.length + ' câu |');
L.push('| Độ trễ trung bình | ' + ms + ' ms/câu |');
L.push('| Token đã dùng | ' + (tok || '—') + ' |');
L.push('| Chạy bằng | `node eval/run-golden.mjs` (cùng mã `callAI()` với bản mẫu) |');
L.push('| Log thô | [`' + path.basename(LOGPATH) + '`](' + path.basename(LOGPATH) + ') — nguyên văn JSON mô hình trả về cho từng câu |');
L.push('');
L.push('**Thử ' + ids.length + ' câu · đạt ' + pass + ' · chưa đạt ' + fail + ' · lỗi/mock ' + err +
       ' → tỉ lệ đạt ' + pct + '%.**');
L.push('');
L.push('| Mã | Câu thử | Mong đợi | Thực tế | Điểm khớp | Kết quả | Vì sao |');
L.push('|---|---|---|---|---|---|---|');
for (const c of cases) {
  const st = RES[c.id]; if (!st) continue;
  L.push('| ' + c.id + ' | ' + c.q.replace('@Trợ lý ', '').replace(/\|/g, '\\|') +
    ' | ' + c.exp + ' / ' + c.intent + (c.src.length ? ' / ' + c.src.join('+') : '') +
    ' | ' + st.r.path + ' / ' + (st.r.intent || '—') +
    ' | ' + (typeof st.r.conf === 'number' ? st.r.conf.toFixed(2) : '—') +
    ' | ' + (st.g.kind === 'pass' ? 'đạt' : st.g.kind === 'fail' ? 'chưa đạt' : 'lỗi') +
    ' | ' + st.g.why.replace(/\|/g, '\\|') + ' |');
}
logLine({ type:'summary', at:new Date().toISOString(), tried:ids.length,
          pass, fail, err, pct, real:real.length, avg_ms:ms, tokens:tok });

console.error('\nLog thô: ' + LOGPATH);
console.error('Kiểm chéo log: node eval/check-grounding.mjs ' + path.basename(LOGPATH));
console.error('\n--- bảng markdown (stdout) ---\n');
console.log(L.join('\n'));
