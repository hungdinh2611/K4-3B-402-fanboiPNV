# Nhật ký cho người ngoài dùng thử (R6) — `user_testing_log.md`

> Nhóm **fanboiPNV** · Lớp 3B · Phòng E402 · Cụm 4 · mốc **CP5** · bản mẫu `codebase/prototype/index.html`
> Quy trình chạy: [`README.md`](README.md). Nguồn dữ liệu: form thu phản hồi của nhóm (sheet `Form_Responses`),
> **chép nguyên văn, không sửa chính tả, không viết lại cho gọn**.

## Trạng thái tại thời điểm ghi file — khai trước, đọc bảng sau

| Yêu cầu của R6 | Trạng thái thật |
|---|---|
| **≥5 người ngoài nhóm** dùng thử | **2/5 — CHƯA ĐỦ.** Còn thiếu 3 người: Trần Anh Đăng `2A202602992`, Bùi Gia Huy `2A202602607`, Nguyễn Khánh Đô `2A202602687` |
| **≥2 người thuộc danh sách willing user khai từ CP1** | **ĐỦ — 2/2 người đã thử đều nằm trong danh sách CP1** (`canvas.md` dòng 6 · `spec.md` §8) |
| **Quote nguyên văn** | Có — 2 quote, chép đúng từ form |
| **Bảng nhật ký** (người thử · nhiệm vụ · điểm tắc nghẽn · quote · quyết định) | Có — bảng dưới |
| **≥1 thay đổi**, ghi vào §9 Changelog của `spec.md` | Có — 1 thay đổi đã làm + 1 đã quyết chưa làm + 1 quyết định giữ nguyên có lý do |

**Hai lượt thử này chạy lúc 19:32 và 19:35 ngày 18/9/2026**, trên bản mẫu đúng cấu hình đang dùng để đo ở §7.

---

## 1 · Bảng nhật ký

| Người thử | Nhiệm vụ giao | Điểm tắc nghẽn | Trích dẫn nguyên văn | Quyết định xử lý của nhóm |
|---|---|---|---|---|
| **Ngô Văn Giáp** · `2A202602644` · willing user khai từ CP1 · 19:32:28 · 18/9 | **T2 — hai nguồn mâu thuẫn** (“XP bắt đầu được tính từ lúc nào”) *(xem ghi chú ⚠️ bên dưới bảng)* | *“Không gặp vấn đề gì — chạy trơn tru”* — không khựng, không hỏi lại, không bỏ dở | *“Phòng E402 mở cửa từ lúc mấy giờ?”* | **Giữ nguyên nhánh từ chối, không nới ngưỡng.** Câu này gần như trùng nguyên văn câu thử `G16` (*“phòng E402 mở cửa từ mấy giờ?”*) — nằm **ngoài** kho nguồn 7 mẩu, nên **theo thiết kế phải rơi nhánh `NOGROUND`** (`G16` đạt cả 3 lượt chạy). ⚠️ **Đây là suy ra từ thiết kế, không phải quan sát**: biên bản không ghi nhãn hiện trên màn hình. Người thử vẫn trả lời *“Tin, nhưng có nêu lý do / điều kiện”* và *“Có — tự tra cứu lại dễ dàng”* → **một câu từ chối có nêu điểm khớp + mở ticket vẫn được người thật coi là đáng tin**. Đây là thứ bộ 24 câu không đo được, và nó ủng hộ quyết định **không hạ `τ_thấp` 0,45 → 0,55** ở `spec.md` §10 mục 5. |
| **Mai Văn Trung** · `2A202602513` · willing user khai từ CP1 · 19:35:25 · 18/9 | **T1 — happy path** (“nộp daily standup thế nào cho đúng”) *(xem ghi chú ⚠️)* | *“Ngồi đợi vài giây (chờ tải)”* — có dừng lại chờ máy, không bỏ dở | *“VinUni đóng cửa lúc mấy giờ?”* | **Sửa chỉ báo chờ** (thay đổi #2 ở §3). Bản mẫu **đã có** dòng *“Trợ lý đang hỏi mô hình + đối chiếu nguồn chính thức…”* nhưng đó là chữ tĩnh, không cho biết còn bao lâu hay đang ở bước nào — nên 8 giây vẫn bị cảm nhận là “chờ tải”. Độ trễ đo được ở lượt 3 là **8041 ms/câu trung bình**, phụ thuộc API Groq nên **không sửa được**; thứ sửa được là **cho người dùng biết máy đang chạy tới đâu**. Câu người thử gõ cũng nằm ngoài kho nguồn → **suy ra** cùng nhánh `NOGROUND` như trên; biên bản không ghi nhãn nên chưa xác nhận được. |

> ⚠️ **Một chỗ hở của chính biên bản này, khai luôn:** với cả hai người, cột *nhiệm vụ* ghi T2/T1 nhưng câu ghi ở cột
> *trích dẫn nguyên văn* lại là **câu hỏi kiểu T3 (người thử tự gõ)**, không phải câu của T1/T2. Có hai cách đọc:
> (a) người thử làm T1/T2 rồi ghi lại câu T3 của mình vào ô quote, hoặc (b) họ bỏ qua kịch bản và gõ thẳng câu của
> mình. **Biên bản hiện tại không phân biệt được hai khả năng đó**, nên nhóm **không** dám khẳng định hai người này
> đã thực sự đi qua nhánh low-confidence (T2). Cách xử lý: xem thay đổi **#1** ở §3, và hỏi lại đúng hai người này
> nếu còn kịp trước 22:30.

---

## 2 · Hai câu hỏi sau task

**(a) “Bạn có tin câu trả lời này không — vì sao?”**

| Người thử | Trả lời (nguyên văn lựa chọn trên form) |
|---|---|
| Ngô Văn Giáp | *“Tin, nhưng có nêu lý do / điều kiện”* |
| Mai Văn Trung | *“Tin, nhưng có nêu lý do / điều kiện”* |

**(b) “Bạn kiểm chứng lại được không — bằng cách nào?”**

| Người thử | Trả lời (nguyên văn lựa chọn trên form) |
|---|---|
| Ngô Văn Giáp | *“Có — tự tra cứu lại dễ dàng”* |
| Mai Văn Trung | *“Có — tự tra cứu lại dễ dàng”* |

**Đọc được gì (n = 2, không suy rộng):** cả hai đều **không** tin vô điều kiện — họ tin *vì có nêu lý do / điều kiện*.
Đây đúng là thứ lát cắt nhắm tới ở §1: vấn đề không phải “bot im lặng” mà là “câu trả lời không có căn cứ để
kiểm chứng”. Nhưng **n = 2, và theo thiết kế thì cả hai câu đều rơi vào nhánh từ chối**, nên chưa có bằng chứng nào về việc phần
**trích nguồn ở nhánh happy path** có đủ làm người thật yên tâm hay không — đó vẫn là câu hỏi mở.

---

## 3 · Thay đổi rút ra từ vòng này

| # | Thay đổi | Vì quote / quan sát nào | Trạng thái |
|---|---|---|---|
| **1** | **Sửa cách thu biên bản trước khi chạy 3 người còn lại:** tách hẳn ô *“câu bạn vừa gõ — chép đúng”* khỏi ô *“lời người thử nói”*, thêm ô *“đường đi bot rơi vào”* (nhãn hiện trên câu trả lời: *Độ tin cậy cao / Chưa đủ chắc / Không tìm thấy căn cứ*), và yêu cầu **1 ảnh chụp màn hình** mỗi task | Ghi chú ⚠️ ở §1 — hai biên bản đầu **không truy được** người thử đã đi qua nhánh nào, nên không dùng để kết luận về nhánh low-confidence được | **Đã làm** — cập nhật trong [`README.md`](README.md) §3 |
| **2** | **Chỉ báo chờ có bước + đếm giây** thay cho dòng chữ tĩnh: hiện *“đang phân loại câu hỏi… → đang tra nguồn chính thức… (n giây)”* | *“Ngồi đợi vài giây (chờ tải)”* — Mai Văn Trung, T1 | **Đã quyết, chưa làm.** Người làm: Đinh Bảo Hưng (`index.html`, hàm `send()`). Nếu không kịp trước 22:30 thì **khai là chưa làm**, không ghi khống |
| **3** | **Giữ nguyên** nhánh `NOGROUND` và **giữ nguyên `τ_thấp` = 0,45** — không nới ngưỡng để bot “cố trả lời” những câu ngoài kho nguồn | Cả **2/2** câu người thật tự gõ đều ngoài kho nguồn → theo thiết kế là nhánh từ chối, mà cả hai vẫn nói *“Tin, nhưng có nêu lý do / điều kiện”* + *“Có — tự tra cứu lại dễ dàng”* | **Đã quyết — giữ nguyên có lý do.** Quality bar ở §7 đã khoá tại CP4, vòng này **không** được dùng để sửa thước đo |

---

## 4 · Bốn dòng chốt

1. **Chủ đề lặp nhiều nhất:** **2/2** câu người thử **tự gõ** đều là câu logistics **ngoài kho nguồn 7 mẩu giả lập**
   (giờ mở cửa phòng E402, giờ đóng cửa VinUni) → theo thiết kế là nhánh từ chối. Vòng dùng thử **xác nhận đúng giới hạn
   nhóm đã tự khai ở `spec.md` §10 mục 3**: kho nguồn mock quá nhỏ so với thứ học viên thật hỏi.
2. **Sẽ sửa gì trước demo:** chỉ báo chờ có bước + đếm giây (thay đổi #2) · sửa biên bản và chạy nốt **3 người còn
   lại** để đủ điều kiện 5 người của R6.
3. **Giữ nguyên gì và vì sao:** nhánh từ chối và ngưỡng `τ_thấp` = 0,45 — người thật **không** khó chịu vì bị từ
   chối, miễn là câu từ chối nêu rõ lý do và chỉ được đường tiếp theo. Sửa ngưỡng lúc này còn là **sửa thước đo sau
   khi đã thấy kết quả**, đúng thứ nhóm đã cam kết không làm.
4. **Gì để dành sau:** đo riêng **nhánh happy path** — cần task ép người thử đi vào câu **có nguồn** rồi mới hỏi
   được “phần trích nguồn có đủ để bạn tin không”. Hai lượt đầu chưa chạm tới nhánh này.

---

## 5 · Còn phải làm để đủ R6

- [ ] Chạy nốt **3 người**: Trần Anh Đăng `2A202602992` · Bùi Gia Huy `2A202602607` · Nguyễn Khánh Đô `2A202602687`
      (dùng form đã sửa theo thay đổi #1 — mỗi người ~8 phút).
- [ ] Hỏi lại Ngô Văn Giáp và Mai Văn Trung: **có làm T1/T2 không, hay gõ thẳng câu của mình** — rồi sửa cột
      *nhiệm vụ* của hai dòng đầu cho đúng sự thật.
- [ ] Làm thay đổi #2 trên bản mẫu, hoặc khai là chưa làm.
- [ ] Chép một dòng vào **§9 Changelog** của `spec.md` *(đã làm — xem dòng `18/9 · CP5 · sau vòng dùng thử`)*.

> **Người dùng chê cũng được tính đủ điểm** — và ở đây họ không chê. Điều đáng ghi là **họ không chạm được vào chỗ
> nhóm muốn kiểm nhất**, nên biên bản này ghi đúng chừng đó, không nhiều hơn.
