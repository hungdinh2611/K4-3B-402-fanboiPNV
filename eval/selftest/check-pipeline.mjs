/* Tự kiểm 2 — cả đường ống callAI() và cách chấm, với fetch GIẢ LẬP.
   Chạy: node eval/selftest/check-pipeline.mjs    (không cần key, không gọi mạng)

   ĐỌC KỸ: file này KHÔNG phải số đo CP3. Nó trả lời câu "cỗ máy đo có đáng tin
   không", bằng cách cho một mô hình giả lập trả lời hoàn hảo rồi kiểm xem máy có
   chấm ra 24/24 hay không. Số đo thật nằm trong eval/results/, chạy bằng key thật. */
import { load, ok, done } from './_load.mjs';

const A = load();
const reply = obj => ({ ok:true, status:200, headers:{ get:()=>null },
  json: async () => ({ model:'openai/gpt-oss-120b', usage:{ total_tokens:640 },
                       choices:[{ message:{ content: JSON.stringify(obj) } }] }) });

/* Mô hình giả lập "hoàn hảo": suy ra output đúng từ nhãn mong đợi của câu thử */
function perfect(c){
  const sc = { S1:0,S2:0,S3:0,S4:0,S5:0,S6:0,S7:0 };
  if(c.exp === 'HAPPY')    c.src.forEach(s => sc[s] = 0.90);
  if(c.exp === 'LOWCONF')  c.src.forEach((s,i) => sc[s] = i === 0 ? 0.72 : 0.69);
  if(c.exp === 'NOGROUND') sc.S1 = 0.30;
  return { intent:c.intent, injection:c.exp === 'INJECTION', scores:sc,
           conflict:c.exp === 'LOWCONF', conflict_sources:c.src,
           answer:c.exp === 'HAPPY' ? 'Trả lời lấy từ nguồn.' : '', sure:'phần chắc', unsure:'phần chưa chắc' };
}

A.ai.key = 'gsk_test_khong_that'; A.ai.on = true;

console.log('--- 1. Mô hình hoàn hảo phải được chấm 24/24 ---');
let pass = 0; const truot = [];
for(const c of A.GOLDEN){
  global.__FETCH = async () => reply(perfect(c));
  const g = A.gradeCase(c, await A.callAI(c.q));
  if(g.kind === 'pass') pass++; else truot.push(c.id + ' (' + g.why + ')');
}
ok(pass === A.GOLDEN.length, 'đạt ' + pass + '/' + A.GOLDEN.length + (truot.length ? ' — trượt: ' + truot.join(' | ') : ''));

console.log('--- 2. Mô hình sai thì máy đo phải bắt được, không bỏ qua ---');
const g09 = A.GOLDEN.find(c => c.id === 'G09');
global.__FETCH = async () => reply(Object.assign(perfect(g09), { conflict:false, scores:{ S1:0,S2:0,S3:0.92,S4:0.10,S5:0,S6:0,S7:0 } }));
let r = await A.callAI(g09.q);
ok(r.path === 'HAPPY' && A.gradeCase(g09, r).kind === 'fail', 'bỏ lỡ mâu thuẫn XP → trả lời thẳng → chấm CHƯA ĐẠT');

const g18 = A.GOLDEN.find(c => c.id === 'G18');
global.__FETCH = async () => reply({ intent:'logistics', scores:{ S1:0,S2:0,S3:0,S4:0,S5:0,S6:0,S7:0.88 }, answer:'Điểm bonus của bạn là…' });
r = await A.callAI(g18.q);
ok(r.path === 'HAPPY' && A.gradeCase(g18, r).kind === 'fail', 'nhầm câu dữ liệu cá nhân thành logistics → chấm CHƯA ĐẠT');

const g01 = A.GOLDEN[0];
global.__FETCH = async () => reply(Object.assign(perfect(g01), { scores:{ S1:0,S2:0.90,S3:0,S4:0,S5:0,S6:0,S7:0 } }));
r = await A.callAI(g01.q);
ok(A.gradeCase(g01, r).kind === 'fail', 'đúng đường đi nhưng dẫn sai nguồn → vẫn CHƯA ĐẠT');

console.log('--- 3. Lỗi API: demo không chết, nhưng không được nhận vơ là số đo ---');
global.__FETCH = async () => ({ ok:false, status:401, headers:{ get:()=>null }, json: async () => ({ error:{ message:'Invalid API Key' } }) });
r = await A.callAI(g01.q);
ok(r.real === false && /401/.test(r.aiError), 'key sai → tụt về mock, ghi lỗi "' + r.aiError + '"');
ok(A.gradeCase(g01, r).kind === 'err', 'câu chạy mock xếp vào cột lỗi, KHÔNG tính là đạt');

global.__FETCH = async () => ({ ok:true, status:200, headers:{ get:()=>null },
  json: async () => ({ choices:[{ message:{ content:'Xin chào, tôi không trả JSON' } }] }) });
r = await A.callAI('q');
ok(r.real === false && /JSON/.test(r.aiError), 'mô hình trả rác → bắt được: "' + r.aiError + '"');

console.log('--- 4. JSON bọc trong code fence vẫn đọc được ---');
const fence = '```';
global.__FETCH = async () => ({ ok:true, status:200, headers:{ get:()=>null },
  json: async () => ({ model:'m', choices:[{ message:{ content: fence + 'json\n' + JSON.stringify(perfect(g01)) + '\n' + fence } }] }) });
r = await A.callAI(g01.q);
ok(r.real === true && r.path === 'HAPPY', 'gỡ được code fence → ' + r.path);

console.log('--- 5. Hết quota theo phút (429) thì chờ đúng retry-after rồi thử lại ---');
let n = 0;
global.__FETCH = async () => { n++; return n === 1
  ? { ok:false, status:429, headers:{ get:k => k === 'retry-after' ? '1' : null }, json: async () => ({ error:{ message:'rate limit' } }) }
  : reply(perfect(g01)); };
const t0 = Date.now(); r = await A.callAI(g01.q);
ok(r.real === true && n === 2 && Date.now() - t0 >= 900, 'gọi ' + n + ' lần, chờ ' + (Date.now() - t0) + 'ms → thành công');

console.log('--- 6. Văn bản mô hình sinh ra bị escape trước khi vào DOM ---');
global.__FETCH = async () => reply(Object.assign(perfect(g01), { answer:'<img src=x onerror=alert(1)> & "trích"' }));
r = await A.callAI(g01.q);
ok(!/<img/.test(r.answer) && /&lt;img/.test(r.answer) && /&amp;/.test(r.answer), 'escape rồi: ' + r.answer.slice(0, 50));

console.log('--- 7. Tắt công tắc Chế độ AI thì không gọi mạng ---');
A.ai.on = false; let called = false;
global.__FETCH = async () => { called = true; return reply({}); };
r = await A.callAI(g01.q);
ok(!called && r.real === false, 'không gọi fetch, chạy kịch bản mock CP2 → ' + r.path);

done();
