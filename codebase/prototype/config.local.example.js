/* ---------------------------------------------------------------------------
   MẪU cấu hình cho lời gọi AI thật ở CP3.

   File này AN TOÀN để commit vì không chứa khoá thật.
   Cách dùng: copy thành config.local.js (đã nằm trong .gitignore) rồi dán key.

       cp config.local.example.js config.local.js

   Không có file config.local.js thì trang vẫn chạy: nhập key vào ô
   "Chế độ AI" ở cột phải, key được lưu trong localStorage của máy bạn.
   --------------------------------------------------------------------------- */
window.PROTO_CONFIG = {
  /* Khoá Groq, dạng gsk_... — lấy ở https://console.groq.com/keys */
  GROQ_API_KEY : '',

  /* Model trên Groq. Đã thử với openai/gpt-oss-120b.
     Đổi model thì phải chạy lại cả bộ câu thử: số đo gắn với đúng một model. */
  MODEL        : 'openai/gpt-oss-120b',

  /* Mốc "hôm nay" để tính tuổi nguồn ở chốt G5 (nguồn còn hiệu lực <= 14 ngày).
     Cố định vào ngày demo vì kho nguồn là dữ liệu giả lập chỉ ghi dd/MM —
     để mai mốt mở lại bản mẫu thì mọi nguồn không tự nhiên hoá "hết hạn"
     và bộ câu thử vẫn so sánh được giữa các lượt chạy. */
  DEMO_TODAY   : '2026-09-18',

  /* 0 = cùng một câu hỏi cho ra cùng một kết quả, để hai lượt chạy so được */
  TEMPERATURE  : 0,

  /* gpt-oss là model reasoning: token suy luận CŨNG tính vào max_tokens.
     Đặt thấp (900) thì JSON bị cắt giữa dòng, Groq trả 400 "Failed to validate JSON". */
  MAX_TOKENS   : 2600,

  /* 'low' | 'medium' | 'high' — chỉ áp cho model reasoning của Groq.
     'low' cắt mạnh token suy luận: nhanh hơn và đỡ chạm giới hạn token/phút.
     Để '' (chuỗi rỗng) nếu đổi sang model không nhận tham số này. */
  REASONING    : 'medium',

  /* Free tier Groq giới hạn ~8000 token/phút. Mỗi câu tốn ~1.5k token nên chạy
     cả bộ 24 câu sẽ gặp 429 vài lần — gặp thì chờ đúng retry-after rồi thử lại,
     không tính là câu trượt. Chạy cả bộ mất khoảng 3–5 phút là bình thường. */
  RETRIES      : 4
};
