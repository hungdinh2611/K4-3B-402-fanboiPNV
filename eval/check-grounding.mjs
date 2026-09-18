/* Kiểm chéo log thô — câu trả lời bot đưa ra có truy được về nguyên văn nguồn không.
   Chạy: node eval/check-grounding.mjs results/run-3-raw.jsonl

   VÌ SAO CÓ FILE NÀY: bảng kết quả trong results/*.md chấm ba chiều (đúng intent ·
   đúng đường đi · dẫn đúng nguồn). Cả ba chiều đó đều nói về ĐƯỜNG ĐI, không chiều
   nào chứng minh phần CHỮ bot nói ra là có căn cứ. Nhóm từng viết trong báo cáo rằng
   "không câu nào khiến bot phát minh thông tin ngoài kho nguồn" — đó là một khẳng
   định tuyệt đối, nên phải có cách kiểm, chứ không được nói suông.

   CÁCH KIỂM (và giới hạn của nó): rút mọi "dữ kiện cứng" khỏi câu trả lời —  con số,
   giờ, ngày, tỉ lệ, lệnh dạng /slash — rồi tìm từng cái trong nguyên văn các nguồn mà
   bot đã dẫn. Đây là phép kiểm HEURISTIC, không phải chứng minh:
     · nó bắt được kiểu bịa nguy hiểm nhất (bot tự phát minh con số/lệnh/mốc thời gian);
     · nó KHÔNG bắt được diễn giải sai ý bằng lời văn thuần, không có số.
   Câu nào máy không kết luận được thì in ra để người đọc tự đối chiếu, không tự cho đạt. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from './selftest/_load.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const arg = process.argv[2];
if (!arg) { console.error('Thiếu tham số: node eval/check-grounding.mjs results/<ten>-raw.jsonl'); process.exit(2); }
const file = path.isAbsolute(arg) ? arg : path.resolve(HERE, arg);
if (!fs.existsSync(file)) { console.error('Không thấy file log: ' + file); process.exit(2); }

const A = load();
const rows = fs.readFileSync(file, 'utf8').trim().split('\n').map(l => JSON.parse(l));
const meta = rows.find(r => r.type === 'meta') || {};
const cases = rows.filter(r => r.type === 'case');

/* Bỏ thẻ HTML + đổi thực thể đã escape về ký tự thường, rồi chuẩn hoá dấu gạch/khoảng trắng */
const norm = s => String(s || '')
  .replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  .replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();

/* Dữ kiện cứng: lệnh /slash · giờ 23:59 · ngày 14/09 · tỉ lệ 50% · số trần 4, 6, 24 */
function facts(text) {
  const t = norm(text);
  const out = new Set();
  (t.match(/\/[a-z][a-z0-9-]{2,}/gi)     || []).forEach(x => out.add(x.toLowerCase()));
  (t.match(/\b\d{1,2}:\d{2}\b/g)         || []).forEach(x => out.add(x));
  (t.match(/\b\d{1,2}\/\d{1,2}(\/\d{2,4})?\b/g) || []).forEach(x => out.add(x));
  (t.match(/\b\d{1,3}\s?%/g)             || []).forEach(x => out.add(x.replace(/\s/g, '')));
  (t.match(/\b\d{1,4}\b/g)               || []).forEach(x => out.add(x));
  return [...out];
}

/* Nguyên văn các nguồn bot đã dẫn (vượt τ_thấp) — đúng thứ người dùng thấy khi mở
   "📎 Vì sao có câu trả lời này": kênh, tiêu đề, NGÀY GHIM và câu trích.
   Ngày ghim phải nằm trong corpus: mô hình được cho biết ngày của từng nguồn và hay
   dẫn lại ("S4 (13/09) đính chính…"). Bản đầu của file này chỉ so với câu trích nên
   gắn cờ oan 4 câu — giữ ghi chú này lại để không ai sửa ngược. */
function citedText(c) {
  const ids = (c.decided.sources || []).filter(s => s.score >= A.T_LOW).map(s => s.id);
  const text = norm(ids.map(id => {
    const k = A.KB[id] || {};
    return [k.ch, k.title, k.date, k.quote].filter(Boolean).join(' ');
  }).join(' '));
  return { ids, text };
}

console.log('Log:    ' + path.basename(file));
console.log('Lượt:   ' + (meta.at || '?') + ' · model ' + (meta.model || '?') +
            ' · reasoning ' + (meta.reasoning || '—') + ' · temperature ' + meta.temperature);
console.log('Số câu: ' + cases.length + '\n');

let checked = 0, clean = 0, flagged = 0, nofacts = 0, noanswer = 0;
const flags = [];

for (const c of cases) {
  const shown = [c.answer_shown.answer, c.answer_shown.sure, c.answer_shown.unsure]
    .filter(Boolean).join(' ');
  if (!shown) {                       /* các nhánh từ chối dùng chữ cố định của nhóm, không phải chữ mô hình */
    noanswer++;
    console.log('  ' + c.id + '  —        bot không đưa nội dung tự sinh (nhánh ' + c.decided.path + ')');
    continue;
  }
  const cited = citedText(c);
  const fs_ = facts(shown);
  const missing = fs_.filter(f => !cited.text.toLowerCase().includes(f.toLowerCase()));
  checked++;
  if (!fs_.length) {
    nofacts++;
    console.log('  ' + c.id + '  ? KHÔNG KẾT LUẬN ĐƯỢC  câu trả lời không chứa dữ kiện cứng nào để đối chiếu' +
                ' — cần người đọc: "' + shown.slice(0, 70) + '…"');
  } else if (!missing.length) {
    clean++;
    console.log('  ' + c.id + '  ✓ truy được  ' + fs_.length + ' dữ kiện (' + fs_.join(', ') +
                ') đều có trong ' + (cited.ids.join('+') || 'nguồn đã dẫn'));
  } else {
    flagged++;
    flags.push({ id: c.id, missing, cited: cited.ids, shown });
    console.log('  ' + c.id + '  ✗ CẦN SOÁT   dữ kiện KHÔNG thấy trong nguồn đã dẫn: ' + missing.join(', ') +
                ' · nguồn ' + (cited.ids.join('+') || '(không có)'));
  }
}

console.log('\n' + '-'.repeat(72));
console.log('Câu có nội dung bot tự sinh : ' + checked + '/' + cases.length +
            '   (còn lại ' + noanswer + ' câu đi nhánh từ chối, dùng chữ cố định của nhóm)');
console.log('  · mọi dữ kiện truy được   : ' + clean);
console.log('  · có dữ kiện chưa truy được: ' + flagged);
console.log('  · không kết luận được máy : ' + nofacts + '  (không có số/lệnh/ngày để đối chiếu)');
if (flags.length) {
  console.log('\nCẦN NGƯỜI ĐỌC SOÁT TAY:');
  for (const f of flags) {
    console.log('\n  ' + f.id + ' · thiếu: ' + f.missing.join(', ') + ' · nguồn dẫn: ' + (f.cited.join('+') || '(không)'));
    console.log('    bot nói : ' + f.shown.slice(0, 200));
    f.cited.forEach(id => console.log('    ' + id + '      : ' + norm((A.KB[id] || {}).quote).slice(0, 200)));
  }
}
console.log('\nĐây là phép kiểm heuristic trên dữ kiện cứng, không phải chứng minh tuyệt đối:');
console.log('nó bắt bịa số/lệnh/mốc thời gian, không bắt được diễn giải sai ý bằng lời văn thuần.');
