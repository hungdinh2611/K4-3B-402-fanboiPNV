/* Nạp phần JS trong codebase/prototype/index.html vào Node để tự kiểm.
   Stub DOM tối thiểu — chỉ đủ để script chạy hết phần khởi tạo. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const PROTO = path.resolve(HERE, '../../codebase/prototype/index.html');

const el = () => new Proxy(
  { style:{}, classList:{ add(){}, remove(){} }, dataset:{}, value:'', innerHTML:'', textContent:'',
    placeholder:'', checked:false, addEventListener(){}, querySelector:()=>el(), scrollIntoView(){},
    remove(){}, appendChild(){}, insertAdjacentHTML(){}, focus(){}, select(){} },
  { get:(t,k)=>t[k], set:(t,k,v)=>{ t[k]=v; return true; } });

const CACHE = new Map();
const el1 = sel => { if(!CACHE.has(sel)) CACHE.set(sel, el()); return CACHE.get(sel); };

export function load(){
  CACHE.clear();
  const html = fs.readFileSync(PROTO, 'utf8');
  const blocks = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const src = blocks[blocks.length - 1];

  global.document    = { querySelector:sel=>el1(sel), querySelectorAll:()=>[], createElement:()=>el(), body:{ appendChild(){} } };
  global.window      = {};
  global.localStorage= { getItem:()=>null, setItem(){}, removeItem(){} };
  global.navigator   = {};
  global.location    = { reload(){} };
  global.fetch       = (...a) => global.__FETCH(...a);
  global.__FETCH     = async () => { throw new Error('test chưa gán fetch'); };

  return new Function(src + ';return {callAI,callAIMock,decide,gradeCase,ageDays,systemPrompt,GOLDEN,KB,ai,CFG,T_LOW,T_HIGH,RES,runSet,exportRaw,runStats};')();
}

/* Bộ đếm assert dùng chung */
export const dom = sel => el1(sel);
export const T = { fails: 0 };
export function ok(cond, msg){
  if(cond){ console.log('  ok   ' + msg); }
  else { T.fails++; console.log('  FAIL ' + msg); }
}
export function done(){
  console.log(T.fails ? '\n*** ' + T.fails + ' TEST TRƯỢT ***' : '\nTẤT CẢ TEST ĐẠT');
  process.exit(T.fails ? 1 : 0);
}
