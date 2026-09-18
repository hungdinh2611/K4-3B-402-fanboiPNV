# eval/ — Bộ câu thử và số đo CP3

> Nhóm **fanboiPNV** · Lớp 3B · Phòng E402 · Cụm 4 · **Track B — đề B1**
> Chấm cho khối **R4 · Kiểm thử (15 điểm)** cùng với `spec.md` §7.

## Có gì trong thư mục này

| File | Nội dung |
|---|---|
| [`golden-set.md`](golden-set.md) | **24 câu thử**, mỗi câu ghi rõ đường đi mong đợi · intent mong đợi · nguồn bắt buộc phải dẫn · nguồn gốc bằng chứng |
| [`results/`](results/) | Bảng kết quả **từng lượt chạy** + **log thô** + kiểm chéo. Một lượt một file, không ghi đè |
| [`run-golden.mjs`](run-golden.mjs) | Chạy cả bộ trong terminal khi không muốn ngồi chờ trong trình duyệt — **cùng một hàm `callAI()`**, nạp thẳng từ `index.html`. Ghi log thô `*-raw.jsonl` |
| [`check-grounding.mjs`](check-grounding.mjs) | **Kiểm chéo độc lập** trên log thô: phần chữ bot nói ra có truy được về nguyên văn nguồn không |
| [`selftest/`](selftest/) | Hai file kiểm **cỗ máy đo**, chạy bằng Node, không cần key và không gọi mạng |

Bộ câu thử **chạy được**, không phải danh sách chết: nó nằm sẵn trong
[`../codebase/prototype/index.html`](../codebase/prototype/index.html) (tab **📏 Số đo CP3**) và chạy qua
**đúng hàm `callAI()` đang gọi mô hình thật** — không có đường riêng nào dựng cho việc đo.

## Thế nào là một câu “đạt”

Một câu tính là **đạt** khi hội đủ **cả ba** điều kiện:

| # | Điều kiện | Vì sao đưa vào chuẩn |
|---|---|---|
| 1 | **Đúng intent** — mô hình phân loại đúng nhóm câu hỏi (`logistics` / `logistics_personal` / `academic` / `blocked`) | Phân loại sai là sai ngay từ cửa: câu dữ liệu cá nhân bị coi là logistics thì bot sẽ đi trả lời thay vì từ chối |
| 2 | **Đúng đường đi** — máy trạng thái rơi vào đúng nhánh mong đợi (`HAPPY` / `LOWCONF` / `NOGROUND` / `PERSONAL` / `OUTSCOPE` / `INJECTION`) | Đây là thứ người dùng thật sự nhận được. Trả lời thẳng một câu đang mâu thuẫn nguồn là lỗi nặng nhất theo §4 |
| 3 | **Đúng căn cứ** — mọi nguồn ghi ở cột *nguồn bắt buộc* đều nằm trong nhóm vượt ngưỡng $\tau_{thấp}=0.45$ | Trả lời đúng nhưng **dẫn sai nguồn** vẫn tính **chưa đạt**: đúng do may thì lần sau sẽ sai |

Ngoài ba mức trên, bảng kết quả còn cột **lỗi**: câu bị lỗi gọi API, hoặc câu chạy bằng
kịch bản mock. **Câu chạy mock không được tính là đạt** — kể cả khi nó ra đúng đường đi.

> Chuẩn này chốt **trước** lượt chạy đầu tiên và không sửa sau khi thấy kết quả. Quality bar
> (ngưỡng % để coi là “sản phẩm dùng được”) chốt ở **CP4** trong `spec.md` §7.

## Kết quả đến lúc này

| Lượt | Cấu hình | Thử | Đạt | Chưa đạt | Lỗi | Tỉ lệ | Bằng chứng |
|---|---|---|---|---|---|---|---|
| 0 | `low` · `max_tokens: 900` | 24 | 14 | 4 | **6** | **huỷ** | [`run-0-da-huy.md`](results/run-0-da-huy.md) — run hỏng vì lỗi cấu hình, **không tính là phép đo** |
| 1 | `reasoning: low` | 24 | 19 | 5 | 0 | 79% | [`run-1.md`](results/run-1.md) · console |
| 2 | `medium` + clause "1 nguồn" | 24 | 20 | 4 | 0 | 83% | [`run-2.md`](results/run-2.md) · console |
| 3 | **y nguyên cấu hình lượt 2** | 24 | 19 | 5 | 0 | 79% | [`run-3.md`](results/run-3.md) · **log thô** · kiểm chéo căn cứ |

> Thử **24** câu hỏi logistics thật của học viên qua **3 lượt**. Cấu hình hiện tại đạt
> **19–20/24 câu (79–83%)**, **0 câu lỗi**. Kiểm chéo trên log thô: **0/24** câu bot phát minh
> dữ kiện không có trong kho nguồn.

**Vì sao khai theo khoảng chứ không lấy 83%:** lượt 2 và lượt 3 chạy **y nguyên một cấu hình** mà ra
20/24 rồi 19/24 (câu `G11` lật kết quả) — `temperature: 0` không cho kết quả tất định. Một lượt đơn
lẻ có sai số **±1 câu ≈ ±4 điểm phần trăm**, nên lấy lượt tốt nhất làm con số chính là làm đẹp số
liệu. Từ đây, mọi thay đổi phải chạy **≥3 lượt** mới kết luận được.

Không lượt nào bị xoá. Lượt 1 thấp hơn nhưng **giữ nguyên** vì nó là chỗ lộ ra một lỗi trong code
của nhóm (`G11` — `decide()` chưa cài clause "1 nguồn" của §4). Lượt 0 bị **huỷ** nhưng vẫn khai, kèm
nguyên văn thông báo lỗi của Groq: 6/24 câu chết vì giới hạn token/phút và vì `max_tokens` quá thấp
làm JSON bị cắt — **run hỏng khác với số xấu**, và nhóm nói rõ sự khác nhau đó thay vì im lặng.

## Số đo có gì chứng minh

Tỉ lệ % không kèm log chỉ là lời khai. Mỗi lượt từ lượt 3 sinh ra:

| File | Nội dung |
|---|---|
| `run-N.md` | Bảng từng câu + phân tích câu trượt (xuất từ phép đo, không gõ tay) |
| `run-N-raw.jsonl` | **Log thô**: một dòng JSON mỗi câu — **nguyên văn JSON mô hình trả về** (điểm từng nguồn, cờ mâu thuẫn, chữ nó sinh ra) trước khi máy trạng thái xử lý, kèm đường đi đã chốt, kết quả chấm, độ trễ, token, timestamp |
| `run-N-grounding.txt` | Kết quả bộ kiểm chéo căn cứ chạy trên log thô đó |

Lượt 1–2 chỉ có **bản ghi console** (`run-N-console.txt`) vì tính năng ghi log thô thêm ở lượt 3 —
mức bằng chứng thấp hơn và **đã khai rõ ngay trong file của hai lượt đó**.

Log xuất từ **cả hai đường chạy** đều cùng định dạng: nút *⧉ Xuất log thô (JSONL)* trong bản mẫu, và
`node eval/run-golden.mjs`. Bộ kiểm chéo đọc được cả hai.

### Bot có bịa không — kiểm chứ không nói suông

Chuẩn "đạt" ba chiều ở trên chỉ kiểm **đường đi**, không chiều nào kiểm **phần chữ** bot nói ra. Nên
có thêm một bộ độc lập:

```
node eval/check-grounding.mjs results/run-3-raw.jsonl
```

Nó rút mọi **dữ kiện cứng** trong câu trả lời (số · giờ · ngày · tỉ lệ · lệnh `/slash`) rồi tìm lại
trong nguyên văn nguồn bot đã dẫn. Lượt 3: **9** câu đi nhánh từ chối nên bot không tự sinh chữ ·
**10** câu máy xác minh mọi dữ kiện đều truy được · **0** câu bị gắn cờ · **5** câu máy không kết
luận được (câu trả lời không chứa số/lệnh/ngày) và nhóm **đọc tay cả 5** — bảng đối chiếu trong
[`run-3.md`](results/run-3.md).

Hai điều nhóm tự khai về bộ kiểm này:

- **Nó là heuristic, không phải chứng minh.** Bắt được bịa số/lệnh/mốc thời gian; **không** bắt được
  diễn giải sai ý bằng lời văn thuần không chứa số.
- **Bản đầu của nó gắn cờ oan 4 câu** vì chỉ so với câu trích mà quên ngày ghim của nguồn — trong khi
  mô hình được cho biết ngày và hay dẫn lại ("`S4` (13/09) đính chính…"). Đã sửa, và ghi chú lại
  trong code để không ai sửa ngược.
- **Nó cố ý KHÔNG được đưa vào chuẩn "đạt".** Chuẩn chốt trước lượt chạy đầu; thêm chiều vào thước đo
  sau khi đã thấy kết quả là đổi thước giữa cuộc. Nó là phép audit báo cáo riêng.

**Và "không bịa" không đồng nghĩa "đúng":** câu `G10` trả lời **trùng nguyên văn `S3`** — một thông
báo chính thức thật **đã bị đính chính 5 ngày sau**. Bộ kiểm căn cứ không bắt được loại lỗi này;
chỉ bảng chấm đường đi bắt được (và nó đã bắt). Đây là kiểu lỗi nặng nhất còn lại của sản phẩm.

## Chạy lại số đo — 5 bước

1. Lấy một khoá Groq ở <https://console.groq.com/keys> (dạng `gsk_…`).
2. Mở [`../codebase/prototype/index.html`](../codebase/prototype/index.html) bằng trình duyệt.
3. Cột phải → mục **⑥ Chế độ AI** → dán key → **Lưu key**. Nhãn trên thanh tiêu đề phải đổi
   từ `MOCK` sang **`AI THẬT · <tên model>`**.
4. Bấm **⚡ Chạy 3 câu** để chắc key sống. Sau đó tab **📏 Số đo CP3** → **▶ Chạy cả bộ**.
5. Bấm **⧉ Xuất bảng Markdown** → dán vào một file mới `results/run-<n>.md`, rồi viết phần
   *Phân tích câu trượt* — đó mới là phần ăn điểm, không phải con số.

Không cài gì, không server, không thư viện ngoài. Key **không** đi vào repo: nó nằm trong
`localStorage` của máy bạn hoặc trong `config.local.js` — file đã bị `.gitignore`.

**Chạy cả bộ mất 3–5 phút, không phải 30 giây.** Free tier Groq giới hạn ~8000 token/phút mà mỗi câu
tốn ~1,9k token, nên máy sẽ gặp `429` vài lần giữa đường; nó chờ đúng `retry-after` rồi thử lại và
hiện dòng *"⏳ chờ Ns (giới hạn token/phút)"* ở cột phải. **Chờ vì hết quota không phải là câu trượt**
nên không bị tính vào số đo. Nếu không muốn ngồi nhìn trình duyệt:

```
node eval/run-golden.mjs         # cả 24 câu, in ra bảng markdown
node eval/run-golden.mjs 3       # 3 câu đầu, chỉ để thử key
```

Script đó **không phải phép đo thứ hai**: nó nạp thẳng đoạn JS trong `index.html`, dùng đúng prompt
và đúng luật chấm ấy. Đổi gì trong bản mẫu là tự động áp vào đây.

## Cỗ máy đo có đáng tin không

Trước khi tin con số, nhóm kiểm chính cái máy đếm. Hai file trong [`selftest/`](selftest/) chạy bằng
Node, **không cần key và không gọi mạng** (mọi phản hồi của mô hình đều giả lập):

```
node eval/selftest/check-decide.mjs      # luật chọn đường đi: ngưỡng 0.45/0.75, phạt mâu thuẫn, chốt G0 hai lớp
node eval/selftest/check-pipeline.mjs    # cả đường ống callAI(): parse JSON, retry 429, lỗi API, escape, cách chấm
```

Đáng chú ý trong `check-pipeline.mjs`:

- Cho một **mô hình giả lập trả lời hoàn hảo** thì máy phải chấm **24/24**. Con số 24/24 này
  **không phải số đo CP3** — nó chỉ nói "máy đếm không tự trượt". Số đo thật nằm trong `results/`.
- Cho mô hình **trả lời sai có chủ ý** (bỏ lỡ mâu thuẫn XP, nhầm câu dữ liệu cá nhân thành
  logistics, trả lời đúng nhưng dẫn sai nguồn) thì máy phải chấm **CHƯA ĐẠT** — kiểm rằng chuẩn
  không dễ dãi.
- Cho **key sai** thì bản mẫu tụt về mock để demo không chết, nhưng câu đó bị xếp vào cột **lỗi**,
  không được nhận vơ là đạt.

## Ghi chú trung thực về phép đo

- **Chỉ đo được phần AI làm**: phân loại intent + chấm điểm khớp nguồn + phát hiện mâu thuẫn.
  Việc chọn đường đi là luật JS trong `decide()`, cố định, không phải thứ mô hình quyết.
  Nên khi một câu trượt, nhìn cột *vì sao* là biết lỗi ở phân loại, ở điểm khớp, hay ở nhận
  diện mâu thuẫn.
- **Nhãn mong đợi do nhóm tự đặt** dựa trên kho nguồn giả lập trong `../codebase/mock/official_sources.md`.
  Hai câu được đánh dấu *CASE BIÊN* (`G08`, `G17`) là chỗ chính nhóm cũng phải tranh luận mới
  chốt được nhãn — ghi ra đây để người chấm biết chúng khó, không phải để lấy điểm dễ.
- **Kho nguồn là dữ liệu giả lập**, không phải thông báo thật của khoá. Bộ câu thử chỉ ghi
  **mã tin nhắn** (`M89326`, `M40677`…) trỏ về `../report_pain_points.md` để chứng minh câu hỏi
  có gốc thật — không dán nguyên văn dữ liệu được cấp.
- **Temperature = 0** để hai lượt chạy còn so được với nhau. Dù vậy mô hình vẫn có thể lệch
  nhẹ giữa các lượt; mỗi lượt chạy lưu thành một file riêng, không ghi đè lượt trước.
- **Đổi model là đổi phép đo.** Một bảng kết quả chỉ có nghĩa cùng với tên model ghi ở đầu bảng.
