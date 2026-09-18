# Lượt chạy 0 — **ĐÃ HUỶ, không tính là phép đo**

> Ghi lại để không ai phải hỏi "sao đánh số từ lượt 1?". Lượt này **bị bỏ** vì 6/24 câu không
> chạy được do **lỗi cấu hình của nhóm**, không phải do chất lượng sản phẩm. Bỏ một run hỏng
> khác hoàn toàn với bỏ một con số xấu: lượt 1 và 3 đều có số thấp hơn lượt 2 và **vẫn được giữ**.

## Vì sao huỷ

| Lỗi | Số câu chết | Nguyên nhân | Đã sửa thế nào |
|---|---|---|---|
| `HTTP 429 · rate limit ... tokens per minute` | 4 (`G05`, `G08`, `G13`, `G18`) | Free tier Groq giới hạn ~8000 token/phút; code lúc đó chỉ thử lại **1 lần** rồi bỏ | `RETRIES: 4`, chờ đúng `retry-after`, giãn nhịp 1,2s giữa các câu |
| `HTTP 400 · Failed to validate JSON` | 2 (`G09`, `G11`) | `gpt-oss` là model reasoning, token suy luận cũng tính vào `max_tokens: 900` → JSON bị cắt giữa dòng | `MAX_TOKENS: 2600` |

Sáu câu đó tụt về kịch bản mock. Máy chấm **không** nhận vơ chúng là đạt — nó xếp vào cột *lỗi*
(đúng như bộ tự kiểm `check-pipeline.mjs` mục 3 kiểm). Nhưng một lượt mà 1/4 số câu không gọi được
mô hình thì không nói lên điều gì về sản phẩm, nên nhóm sửa hai lỗi cấu hình rồi chạy lại từ đầu.

## Số của lượt đã huỷ

Nếu tính cả 6 câu lỗi: **thử 24 · đạt 14 · chưa đạt 4 · lỗi 6 → 58%**.

## Bằng chứng còn giữ được

**Không có log máy cho lượt này** — tính năng ghi log thô (`*-raw.jsonl`) mới thêm ở lượt 3, sau
lượt này. Thứ còn lại là bản dán từ console lúc chạy, với nguyên văn thông báo lỗi của Groq:

```
 5/24  G05  LỖI  HAPPY  0.88  0ms  ← HTTP 429 · Rate limit reached for model
       `openai/gpt-oss-120b` ... on tokens per minute (TPM): Limit 8000, Used 6054,
       Requested 1978. Please try again in 240ms.
 8/24  G08  LỖI  PERSONAL  0.00  0ms  ← HTTP 429 · ... Limit 8000, Used 5964, Requested 2054.
 9/24  G09  LỖI  LOWCONF   0.58  0ms  ← HTTP 400 · Failed to validate JSON.
11/24  G11  LỖI  LOWCONF   0.61  0ms  ← HTTP 400 · Failed to validate JSON.
13/24  G13  LỖI  HAPPY     0.91  0ms  ← HTTP 429 · ... Limit 8000, Used 6313, Requested 2118.
18/24  G18  LỖI  PERSONAL  0.00  0ms  ← HTTP 429 · ... Limit 8000, Used 6031, Requested 2114.
```

Nhóm khai rõ đây là **bản dán tay từ console**, không phải log máy sinh ra — vì lượt này chưa có
tính năng đó. Từ lượt 3 trở đi mọi lượt đều có `*-raw.jsonl` ghi nguyên văn JSON mô hình trả về.

## Hai lượt kế tiếp

[`run-1.md`](run-1.md) · [`run-2.md`](run-2.md) — cùng chỉ có bản ghi console
([`run-1-console.txt`](run-1-console.txt), [`run-2-console.txt`](run-2-console.txt)), chưa có log thô.
[`run-3.md`](run-3.md) là lượt đầu tiên có đủ log thô + kiểm chéo căn cứ.
