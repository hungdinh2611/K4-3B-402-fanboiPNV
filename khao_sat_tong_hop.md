# Tổng hợp khảo sát trải nghiệm hỏi đáp Discord (n = 21)

Nguồn: `Khảo_sát_trải_nghiệm_hỏi_đáp_trên_Discord_khóa_học__Câu_trả_lời_.csv`, không có cột tên/liên hệ (xem cảnh báo cuối file).

## 1. Tần suất gặp lại vấn đề trong 7 ngày

| Mức | Số người | % |
|---|---|---|
| 0 lần | 1 | 5% |
| 1 lần | 4 | 19% |
| 2–3 lần | 8 | 38% |
| 4–6 lần | 3 | 14% |
| Nhiều / hàng ngày / >5 lần (diễn đạt tự do) | 5 | 24% |

**≥2 lần/7 ngày: 16/21 = 76%** — vượt xa ngưỡng 50% yêu cầu của chuẩn A. Đây không phải sự cố hiếm, mà là trải nghiệm lặp lại hàng tuần với phần lớn học viên được hỏi.

*Cách đếm: đọc nguyên văn 21 ô trả lời (số, "vài ba", "hàng ngày", "ngày nào cũng gặp"...) và gán vào 1 trong 5 mức trên theo nghĩa gần nhất — kiểm lại được bằng `survey_dump.txt` đính kèm.*

## 2. Điều gì đã xảy ra khi tìm câu trả lời (đối chiếu ý nghĩa, không phải đếm checkbox thuần — nhiều người trả lời tự do thay vì chọn từ danh sách)

| Việc xảy ra | Số người (≈) | Ví dụ (≤2 câu) |
|---|---|---|
| Phải đọc nhiều tin nhắn mới tìm được thông tin | 10/21 (48%) | Người 9: "tìm kiếm thủ công... mất thời gian để tìm được tài liệu mong muốn". Người 21: "hỏi bot, tìm lại tin nhắn, bước tìm lại tin nhắn là mất thời gian nhất." |
| Phải hỏi lại người khác / TA / Mod | 4/21 (19%) | Người 13: "Tôi phải đọc nhiều tin nhắn... Tôi phải hỏi lại người khác / TA / Mod". |
| Nhận được câu trả lời nhanh, đủ tin cậy (tích cực) | 4/21 (19%) | Người 11: "Mình hỏi trợ lý cute và đã nhận được câu trả lời... nhanh và đủ tin cậy". |
| Không nhận được câu trả lời | 1/21 (5%) | Người 14: hỏi về nhận thẻ sinh viên, "vẫn chưa được câu trả lời, các lab không trả lời đc". |
| **Nhận câu trả lời / làm theo hướng dẫn nhưng vẫn KHÔNG giải quyết được vấn đề** (phát hiện mới, không nằm trong lựa chọn gốc) | 1/21 | Người 16: hỏi cách kiểm tra ai đã "log hoạt động" cho team, tag bot, "không lâu nhưng không có kết quả... không biết phải làm gì tiếp." |
| Phải xem lại nhiều lần mới hiểu (gần với "bot trả lời dài/lệch trọng tâm") | 1/21 | Người 17: "Tôi phải xem lại nhiều lần mới hiểu". |

**Phát hiện đáng chú ý:** Người 16 là ví dụ "hậu quả cụ thể" đúng chuẩn guide — không chỉ "bất tiện chung chung" mà: hỏi → bot trả lời → làm theo → vẫn bế tắc, không biết bước tiếp theo. Bằng chứng cho pain "bot trả lời nhưng không thực sự giải quyết vấn đề", khác với "bot im lặng".

## 3. Chủ đề hay được hỏi nhất

Standup/daily-standup và XP xuất hiện nhiều nhất (Người 2, 4, 7, 9, 13, 17, 19, 21), sau đó team/dự án (Người 4, 15, 16), thông báo/lịch build phase (Người 1, 12, 20), cách nộp bài (Người 4, 8, 9), rải rác: xin nghỉ, nhận thẻ sinh viên, nội dung khoá học.

**Đối chiếu với mining CSV Discord:** khớp nhau — mining cũng cho thấy team/nhóm (32), standup (16), XP (10) là 3 chủ đề logistics nhiều nhất, còn deadline chỉ 3/318. Tức là **"deadline" không phải chủ đề phổ biến nhất** như đề bài gợi ý ban đầu — team-forming, cách làm standup, cách tính XP mới là nhóm câu hỏi lặp lại nhiều nhất. Đáng cân nhắc khi chọn ví dụ cụ thể cho "lát cắt MỘT CÂU" (xem ghi chú ở canvas.md).

## 4. Điều gì đang giúp học viên nhiều nhất hiện tại

Bot "Trợ lý" (học viên gọi là "bot kute"/"trợ lý cute"/"chatbot") được nêu trực tiếp bởi ~6/21 người (Người 2, 7, 9, 11, 17, 18) là kênh hữu ích nhất hiện tại — cho thấy bot đã có chỗ đứng, vấn đề là **độ tin cậy câu trả lời**, không phải việc học viên không dùng bot. Số còn lại dựa vào: thanh tìm kiếm/hashtag Discord (3 người), thông báo/lịch có sẵn (3–4 người), hỏi TA/lab coach trực tiếp (2 người), hỏi đồng đội (1 người).

## 5. Nếu chỉ đổi MỘT điều — nhóm theo ý

| Nhóm mong muốn | Số người | Ví dụ |
|---|---|---|
| Bot trả lời đúng/đủ hơn, đỡ phải hỏi lại coach | 5 | Người 17: *"Trả lời hết các câu hỏi về quy định, nhiều câu phải hỏi coach"*. Người 16: *"Muốn được hỗ trợ với hướng dẫn chính xác, trả lời được thắc mắc"*. |
| Tổ chức/sắp xếp thông tin, kênh, tài liệu rõ ràng hơn | 5 | Người 20: *"Quá nhiều kênh dễ loạn. Cần sắp xếp hợp lý hơn"*. |
| Hỏi riêng tư / xem lại lịch sử đã hỏi bot | 2 | Người 12: *"mục hỏi đáp cá nhân để xem mình đã hỏi bot những gì"*. |
| Khác / chưa rõ | 9 | — |

Nhóm "bot trả lời đúng/đủ hơn" **khớp trực tiếp** với hướng B1 (biết-mình-không-biết, trả lời từ nguồn chính thức, chuyển TA thay vì đoán) — bằng chứng chuẩn A ủng hộ đúng slice đã chọn.

## Kết luận nhanh cho canvas dòng 4 (chuẩn A)

- 21/21 người đã từng tìm/hỏi thông tin trên Discord trong 7 ngày qua.
- 76% (16/21) gặp lại tình huống tương tự ≥2 lần/tuần — vượt ngưỡng 50%.
- 48% (10/21) phải đọc nhiều tin nhắn mới tìm được thông tin; 19% (4/21) phải hỏi lại TA/Mod dù đã hỏi bot trước.
- Có ít nhất 1 ca cụ thể (Người 16) bot trả lời nhưng không giúp giải quyết được vấn đề thật.
- 24% người được hỏi (5/21), khi được hỏi muốn đổi một điều, chọn đúng hướng "bot trả lời đúng/đủ hơn, đỡ phải hỏi TA" — khớp lát cắt B1.

## ⚠️ Cảnh báo quan trọng — thiếu willing users

File CSV này **không có cột tên/liên hệ** như mẫu form gốc yêu cầu ở câu cuối. Nghĩa là **nhóm chưa có 2 tên willing users bắt buộc để nộp CP1**. Xử lý ngay một trong hai cách:
1. Kiểm tra lại Google Form gốc xem có tab/sheet riêng chứa câu "Tên/Liên hệ" bị bỏ sót khi export không.
2. Nếu thật sự không có, nhắn trực tiếp 2–3 người đã trả lời khảo sát (hoặc ai đó khác trong lớp) xin phép làm willing user, lấy tên + liên hệ ngay — đừng để tới sát giờ 19:30.
