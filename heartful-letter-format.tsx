import { useState } from "react";

const defaultValues = {
  customerLastName: "",
  customerFirstName: "",
  storeName: "TOD'S 御殿場プレミアムアウトレット",
  productName: "",
  productComment: "",
  episode1: "",
  episode2: "",
  staffName: "",
};

export default function HeartfulLetterFormat() {
  const [form, setForm] = useState(defaultValues);
  const [copied, setCopied] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const customerName = `${form.customerLastName} ${form.customerFirstName}`.trim();

  const subject = form.storeName
    ? `ご来店ありがとうございました。（${form.storeName}）`
    : "ご来店ありがとうございました。";

  const body = `${customerName ? customerName + "様" : "○○ ○○様"}

この度は${form.storeName || "○○店"}をご利用いただき誠にありがとうございます。

${form.productName ? `お買い上げいただきました${form.productName}は、${form.productComment || `${form.customerLastName || "○○"}様にとてもよくお似合いでした。`}` : "お買い上げいただきました商品は、○○様にとてもよくお似合いでした。"}
${form.episode1 || "また、○○からお越しいただき、本当にありがとうございました。"}
${form.episode2 || "○○のが印象的でした。"}
末永くご愛用いただけることを願っております。

ご不明な点や気になる点がございましたら、私、${form.staffName || "○○"}までお気軽にお問い合わせください。

また、${form.customerLastName || "○○"}様にお会いできることを心よりお待ち申し上げております。


${form.storeName || "TOD'S ○○店"}`;

  const fullText = `件名：${subject}\n\n\n${body}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setForm(defaultValues);
  };

  const fields = [
    { label: "お客様 姓", key: "customerLastName", placeholder: "山本" },
    { label: "お客様 名", key: "customerFirstName", placeholder: "真由香" },
    { label: "店舗名", key: "storeName", placeholder: "TOD'S 御殿場プレミアムアウトレット" },
    { label: "購入商品名", key: "productName", placeholder: "タイムレスショッピングバッグ" },
    {
      label: "商品コメント（お客様の印象と合わせて）",
      key: "productComment",
      placeholder: "山本様の柔らかな雰囲気にもお似合いでした。",
      multiline: true,
    },
    {
      label: "来店エピソード①",
      key: "episode1",
      placeholder: "また、浜松からお二人でご来店いただき、本当にありがとうございました。",
      multiline: true,
    },
    {
      label: "来店エピソード②",
      key: "episode2",
      placeholder: "お二人で仲良くお買い物されていたのが印象的でした。",
      multiline: true,
    },
    { label: "担当スタッフ名", key: "staffName", placeholder: "石川" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0eb", fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#1a1a1a", padding: "20px 0", textAlign: "center" }}>
        <p style={{ color: "#c9a96e", letterSpacing: "0.3em", fontSize: "10px", margin: "0 0 6px 0" }}>
          TOD'S
        </p>
        <h1 style={{ color: "#fff", fontSize: "15px", fontWeight: 400, letterSpacing: "0.2em", margin: 0 }}>
          ハートフルレター　作成フォーム
        </h1>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 40px" }}>
        {/* Input Section */}
        <div style={{ background: "#fff", borderRadius: 2, padding: "28px 24px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: "11px", color: "#888", letterSpacing: "0.15em", marginBottom: 22, marginTop: 0 }}>
            　入力項目
          </p>
          {fields.map((f) => (
            <div key={f.key} style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: "12px", color: "#444", marginBottom: 6, letterSpacing: "0.05em" }}>
                {f.label}
              </label>
              {f.multiline ? (
                <textarea
                  value={form[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  rows={2}
                  style={{
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    padding: "9px 12px",
                    fontSize: "13px",
                    color: "#222",
                    resize: "vertical",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    background: "#fafafa",
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={form[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  style={{
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    padding: "9px 12px",
                    fontSize: "13px",
                    color: "#222",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    background: "#fafafa",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <div style={{ background: "#fff", borderRadius: 2, padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <p style={{ fontSize: "11px", color: "#888", letterSpacing: "0.15em", margin: 0 }}>
              　プレビュー
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleReset}
                style={{
                  background: "none",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  padding: "6px 14px",
                  fontSize: "11px",
                  color: "#777",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                }}
              >
                リセット
              </button>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? "#4a7c59" : "#1a1a1a",
                  border: "none",
                  borderRadius: 2,
                  padding: "6px 16px",
                  fontSize: "11px",
                  color: "#fff",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  transition: "background 0.2s",
                }}
              >
                {copied ? "コピーしました ✓" : "コピー"}
              </button>
            </div>
          </div>

          {/* Email preview */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: 20 }}>
            <div style={{ background: "#f9f9f9", border: "1px solid #e8e8e8", borderRadius: 2, padding: "14px 16px", marginBottom: 16 }}>
              <span style={{ fontSize: "11px", color: "#aaa", marginRight: 8 }}>件名</span>
              <span style={{ fontSize: "13px", color: "#333" }}>{subject}</span>
            </div>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "2",
                color: "#333",
                whiteSpace: "pre-wrap",
                padding: "4px 0",
              }}
            >
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
