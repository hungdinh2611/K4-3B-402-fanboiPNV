# Vòng cho người ngoài dùng thử (R6) — cách chạy

> Nhóm **fanboiPNV** · Lớp 3B · Phòng E402 · Cụm 4
> File này là **quy trình**; biên bản nằm ở [`user_testing_log.md`](user_testing_log.md).
> **Trạng thái: đã chạy 2/5 người** (19:32 và 19:35 · 18/9) — còn thiếu 3 người. Không điền trước,
> không đoán hộ người dùng: chưa ai thử thì ô đó để trống.

R6 đáng **8 điểm**. Không làm thì trần điểm của nhóm là 92 (25 + 67). Làm ở mốc **CP5**.

**Người dùng chê cũng được tính đủ điểm.** Mục đích là xem giải pháp có ăn thua không — ra kết quả nào cũng
ghi nhận, miễn là bằng chứng thật.

---

## 1 · Bốn thứ bắt buộc phải có

| | Yêu cầu | Trạng thái của nhóm |
|---|---|---|
| 1 | **5 người ngoài nhóm** dùng thử, trong đó **≥2 người đã khai từ CP1** | **2/5 — chưa đủ.** Điều kiện “≥2 người từ CP1” thì **đã đủ**: cả hai người đã thử đều nằm trong danh sách CP1 |
| 2 | **Quote nguyên văn** — chép đúng lời họ nói, **kể cả viết sai chính tả** | có 2 quote trong `user_testing_log.md` |
| 3 | **Bảng nhật ký**: người thử · nhiệm vụ giao · điểm tắc nghẽn · quote · quyết định | [`user_testing_log.md`](user_testing_log.md) §1 |
| 4 | **≥1 thay đổi** ghi vào **§9 Changelog** của `spec.md` (giữ nguyên thì nói rõ vì sao) | 1 đã làm · 1 đã quyết chưa làm · 1 giữ nguyên có lý do — `user_testing_log.md` §3 |

**Người dùng thử (đã khai từ CP1):**

| Người | Mã học viên | Trạng thái |
|---|---|---|
| Ngô Văn Giáp | `2A202602644` | ✅ đã thử 19:32 · 18/9 |
| Mai Văn Trung | `2A202602513` | ✅ đã thử 19:35 · 18/9 |
| Trần Anh Đăng | `2A202602992` | ☐ chưa chạy |
| Bùi Gia Huy | `2A202602607` | ☐ chưa chạy |
| Nguyễn Khánh Đô | `2A202602687` | ☐ chưa chạy |

---

## 2 · Luật vàng: giao task rồi **ngồi im**

| Chưa đạt | Đạt |
|---|---|
| *“Demo này ok rồi đấy”* | *“Mình muốn tìm thông tin về code cho ReAct”* |

Bên trái là lời khen xã giao — **0 điểm**. Bên phải là lời người dùng nói **lúc đang cố làm việc** —
nhìn vào biết ngay họ vướng ở đâu.

Cách lấy được quote bên phải:

- **Đừng hỏi “sản phẩm này hay không”.** Giao một việc, đưa chuột cho họ, rồi im.
- Họ hỏi “giờ bấm gì?” → **đừng chỉ**. Trả lời “bạn cứ làm như bạn vẫn làm” rồi ghi lại đúng chỗ họ khựng.
- **Chép nguyên văn**, kể cả tiếng lóng, viết tắt, sai chính tả. Đừng sửa cho “sạch” — sửa là mất bằng chứng.
- Ghi cả **cái họ làm**, không chỉ cái họ nói: bấm nhầm chỗ nào, cuộn tìm gì, ngồi đợi bao lâu.
- Một người **8–10 phút** là đủ. 5 người xong trong khoảng 45 phút nếu chia hai người đi phỏng vấn.

Nên tách vai: **một người giao task** (không giải thích gì thêm), **một người ghi chép**.

---

## 3 · Ba task giao cho mỗi người

Đọc nguyên văn, không thêm gợi ý:

> **Task 1.** “Bạn vừa vào khoá và cần biết **nộp daily standup thế nào cho đúng**. Dùng công cụ này tìm câu
> trả lời giúp mình.”
>
> **Task 2.** “Bây giờ bạn cần biết **XP bắt đầu được tính từ lúc nào**. Làm như bạn vẫn hay làm.”
>
> **Task 3.** “Tự gõ một **câu hỏi logistics của chính bạn** — câu bạn từng phải đi hỏi thật. Đừng bấm các
> chip có sẵn.”

Sau **mỗi** task, hỏi đúng hai câu này (đây là thứ bộ 24 câu thử **không** đo được):

1. **“Bạn có tin câu trả lời này không — vì sao?”**
2. **“Bạn kiểm chứng lại được không — bằng cách nào?”**

Task 2 là bẫy có chủ ý: nó rơi vào nhánh **low-confidence** (hai nguồn `S3` ✕ `S4` đang đá nhau). Thứ cần
quan sát: người dùng **có nhận ra** là bot đang không chắc không, hay họ vẫn đọc như một câu trả lời chắc nịch.

**Chuẩn bị máy trước khi họ ngồi vào:** mở `codebase/prototype/index.html`, **Chế độ AI BẬT** (có key),
**Chế độ nghiêm ngặt BẬT**, xoá lịch sử hội thoại của người trước đó.

### Mỗi task phải ghi lại đủ 5 ô này *(sửa sau 2 lượt đầu — xem thay đổi #1 trong `user_testing_log.md`)*

Hai biên bản đầu tiên ghi *nhiệm vụ* một đằng, *câu người thử gõ* một nẻo, nên **không truy được** người thử
đã đi qua nhánh nào của sản phẩm. Từ người thứ ba trở đi, mỗi task ghi đủ:

| Ô | Ghi gì | Vì sao cần |
|---|---|---|
| **Task nào** | T1 / T2 / T3 | để biết đang đo nhánh nào |
| **Câu bạn vừa gõ** | chép **đúng** câu đã gõ vào ô chat, không tóm tắt | biên bản phải khớp được với câu thử trong `eval/golden-set.md` |
| **Đường đi bot rơi vào** | đọc đúng nhãn hiện trên câu trả lời: *Độ tin cậy cao* / *Chưa đủ chắc* / *Không tìm thấy căn cứ* / *Ngoài quyền truy cập* / *Ngoài phạm vi* / *Đã chặn* | đây là bằng chứng người thử **thật sự** chạm vào nhánh đó |
| **Lời người thử nói** | nguyên văn, **tách khỏi** ô “câu bạn vừa gõ” | quote để ăn điểm phải là lời *nói*, không phải câu *gõ* |
| **Ảnh chụp màn hình** | 1 ảnh mỗi task, lưu vào `validation/` | người chấm tự kiểm lại được |

---

## 4 · Sau khi xong cả 5 người

1. Điền đủ bảng trong [`user_testing_log.md`](user_testing_log.md).
2. Viết **4 dòng cuối bảng**: chủ đề lặp nhiều nhất · sẽ sửa gì trước demo · giữ nguyên gì và vì sao ·
   gì để dành sau.
3. Chọn **≥1 thay đổi** rồi làm thật, và ghi một dòng vào **§9 Changelog** của `spec.md`, trỏ về đúng quote
   đã dẫn tới thay đổi đó. Nếu quyết định **giữ nguyên**, vẫn ghi vào §9 và nói rõ vì sao.
4. Nếu kịp: thêm **1 câu nói đáng giá nhất** vào slide 6 của `demo-slides.html` (có sẵn chỗ đánh dấu bằng
   comment trong file), rồi in lại PDF.

> **Không được sửa chuẩn “đạt” ở §7.** Quality bar đã khoá tại CP4 (21:00 · 18/9). Mọi thứ phát hiện ở vòng
> này chỉ được ghi vào §9 dưới dạng quan sát và thay đổi sản phẩm — không đụng vào thước đo.

---

## 5 · Ranh giới dữ liệu

- Chỉ ghi **tên + mã học viên** đã khai từ CP1. Không ghi thêm thông tin cá nhân nào khác.
- Không dùng dữ liệu thật của người thật trong lúc thử — kho nguồn của bản mẫu là 7 mẩu **giả lập**.
- Nếu người thử tự kể một case thật của họ, ghi **tối đa 2 câu** và không ghi tên người thứ ba.
