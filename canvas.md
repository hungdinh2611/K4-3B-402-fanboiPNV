# Canvas 7 dòng — CP1
### Track B — Trợ lý Học viên (Discord)

---

### 1 · Track + đề

**Track B, đề B1** — Tối ưu bot "Trợ lý" hiện có trên Discord: nhận đúng intent (chào hỏi / hỏi bài / hỏi logistics), trả lời đúng cỡ, **biết-mình-không-biết** để chuyển TA thay vì đoán, và chỉ trả lời logistics từ nguồn chính thức.

*(Giả định chọn B1 vì cả hai nguồn bằng chứng — mining Discord và khảo sát 21 người — đều chỉ thẳng vào vấn đề "chất lượng/độ tin cậy câu trả lời của bot đang có", không phải "thiếu tính năng mới". Nếu nhóm muốn làm B2 song song, báo lại để tách canvas riêng.)*

---

### 2 · Job executor

Học viên khoá 4, đang trong 6 tuần Build Phase (giai đoạn onboarding tuần đầu là lúc pain rõ nhất), thường xuyên lên Discord để hỏi logistics (standup, XP, team, deadline, điểm danh) — phần lớn bằng cách tag bot "Trợ lý", một số hỏi lại TA/Mod khi không chắc.

---

### 3 · Pain một câu

Học viên hỏi bot "Trợ lý" về logistics (cách làm daily-standup, cách tính XP, quy định ghép team...) — bot trả lời nhưng đôi khi dài dòng, không trích nguồn, hoặc trả lời xong vẫn không giải quyết được vấn đề thật — khiến học viên phải tự đọc lại nhiều tin nhắn hoặc hỏi lại TA, có trường hợp làm đúng theo hướng dẫn của bot mà vẫn bế tắc, không biết bước tiếp theo.

> Ví dụ hậu quả cụ thể (khảo sát, Người 16): hỏi bot cách kiểm tra ai đã "log hoạt động" cho team, làm theo hướng dẫn, "không lâu nhưng không có kết quả... không biết phải làm gì tiếp."

---

### 4 · Bằng chứng (chuẩn A + chuẩn B)

**Chuẩn B — mining 779 tin nhắn học viên (12–14/09, khoá 4), cách đếm: phân loại từ khoá + soát tay, kiểm lại được qua `classified_messages.csv`:**
- 318/779 tin (40.8%) là logistics — nhóm lớn nhất.
- Top chủ đề logistics: team/nhóm (32 câu), standup (16 câu), XP (10 câu), điểm danh (9 câu), deadline chỉ 3 câu.
- Bot phản hồi trực tiếp 306/307 tin có tag bot (99.7%) → **pain không phải "bot im lặng"**, mà là chất lượng câu trả lời.
- 9 câu hỏi thông tin cá nhân (VD `M10902`: "check điểm bonus của mình thế nào") mà bot không có quyền trả lời chính xác.
- VD nguyên văn: `M89326` "[@BOT] /daily-standup có bắt buộc không?...", `M40677` "nộp codelab đúng giờ nhưng commit lỗi, đẩy lên sau deadline có tính đúng hạn không?".

**Chuẩn A — khảo sát 21 học viên ngoài nhóm (xem `khao_sat_tong_hop.md` để đối chiếu đầy đủ):**
- 21/21 (100%) từng tìm/hỏi thông tin trên Discord trong 7 ngày qua.
- **16/21 (76%)** gặp lại tình huống tương tự ≥2 lần/tuần — vượt xa ngưỡng 50% của chuẩn A.
- 10/21 (48%) phải đọc nhiều tin nhắn mới tìm được thông tin; 4/21 (19%) phải hỏi lại TA/Mod dù đã hỏi bot trước.
- 5/21 (24%), khi được hỏi muốn đổi một điều duy nhất, chọn đúng hướng "bot trả lời đúng/đủ hơn, đỡ phải hỏi lại coach" (Người 17: *"Trả lời hết các câu hỏi về quy định, nhiều câu phải hỏi coach"*).

**Hai nguồn bằng chứng khớp nhau:** cả mining lẫn khảo sát đều cho thấy team-forming, standup, XP là chủ đề lặp lại nhiều nhất — nhiều hơn hẳn deadline cụ thể.

---

### 5 · Lát cắt MỘT CÂU

Một học viên hỏi bot "Trợ lý" một câu logistics thường gặp (VD: "daily-standup nộp thế nào", "khi nào bắt đầu tính XP", "khác lớp có ghép team được không") · bot chỉ trả lời khi tìm được câu trả lời trong nguồn chính thức (thông báo/pinned message), và nếu không tìm thấy hoặc có ≥2 nguồn mâu thuẫn thì tag TA thay vì đoán · học viên nhận được câu trả lời đúng hoặc biết rõ mình cần hỏi ai tiếp theo, không bị bỏ lại bế tắc như trường hợp Người 16.

---

### 6 · Automation + Willing users

**AI tự làm:** phân loại intent (logistics / academic / chào hỏi / hỗn hợp) → tra cứu nguồn chính thức được cung cấp sẵn → quyết định trả lời ngắn gọn kèm trích nguồn, hoặc từ chối trả lời và chuyển TA nếu không tìm thấy nguồn/nguồn mâu thuẫn/câu hỏi mang tính cá nhân. Con người (TA) vẫn là người duy nhất xác nhận và cập nhật nguồn chính thức — bot không được tự tạo thông tin mới, đúng như 9 câu hỏi cá nhân và trường hợp Người 16 đã cho thấy hậu quả khi bot trả lời vượt quá phạm vi mình biết chắc.

**Willing users:
Trần Anh Đăng 2A202602992
Bùi Gia Huy 2A202602607
Nguyễn Khánh Đô 2A202602687
Mai Văn Trung 2A202602513
Ngô Văn Giáp 2A202602644

---

### 7 · Phân công

| Đầu việc | Người phụ trách |
|---|---|
| Hoàn thiện spec.md (§1, §2) từ canvas này | *Hoang Anh Tu* |
| Chốt 2 willing users (tên + liên hệ) | *Nguyen Minh Quan |
| Viết prototype/system prompt cho bot B1 | *Dinh Bao Hung* |
| Chuẩn bị hard tests (2 deadline mâu thuẫn, câu hỏi cá nhân, injection, câu hỏi hỗn hợp) | *Nguyen Thanh Nam* |
| Điền form nộp CP1 + commit/push repo | Dinh Bao Hung |

---
*Nguồn bằng chứng đầy đủ: `report_pain_points.md` (mining), `classified_messages.csv` (779 tin đã gắn nhãn), `khao_sat_tong_hop.md` (21 khảo sát), `survey_dump.txt` (log nguyên văn từng người).*
