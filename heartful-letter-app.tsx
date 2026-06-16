import { useState } from "react";

const STORE_NAME = "TOD'S 御殿場プレミアムアウトレット店";
const SUBJECT_STORE = "TOD'S 御殿場プレミアムアウトレット";

export default function HeartfulLetterApp() {
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    purchaseDate: "",
    product: "",
    impression: "",
    episode: "",
    staffName: "",
  });
  const [copied, setCopied] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  // 経過日数の判定
  const getDaysPassed = () => {
    if (!form.purchaseDate) return null;
    const purchase = new Date(form.purchaseDate);
    const today = new Date();
    purchase.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diff = Math.floor((today - purchase) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysPassed = getDaysPassed();

  // 冒頭文の切り替え（3日以内 or 4日以上）
  const getGreeting = () => {
    if (daysPassed === null) return null;
    if (daysPassed <= 3) {
      return `この度は${STORE_NAME}をご利用いただき誠にありがとうございます。`;
    }
    return `先日は${STORE_NAME}をご利用いただき誠にありがとうございました。`;
  };

  const name = `${form.lastName} ${form.firstName}`.trim();
  const greeting = getGreeting();

  const buildLetter = () => {
    const customerName = name ? `${name}様` : "○○ ○○様";
    const greet = greeting || "（購入日を入力してください）";
    const productLine = form.product
      ? `お買い上げいただきました${form.product}は、${form.lastName || "○○"}様の${form.impression || "雰囲気"}にとてもよくお似合いでした。`
      : "お買い上げいただきました商品は、○○様の雰囲気にとてもよくお似合いでした。";
    const episodeLine = form.episode
      ? form.episode
      : "また、ご来店いただき、本当にありがとうございました。";
    const staff = form.staffName || "○○";
    const lastN = form.lastName || "○○";

    return `${customerName}

${greet}

${productLine}
${episodeLine}
末永くご愛用いただけることを願っております。

ご不明な点や気になる点がございましたら、私、${staff}までお気軽にお問い合わせください。

また、${lastN}様にお会いできることを心よりお待ち申し上げております。


${STORE_NAME}`;
  };

  const subject = `ご来店ありがとうございました。（${SUBJECT_STORE}）`;
  const letter = buildLetter();
  const fullText = `件名：${subject}\n\n\n${letter}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () =>
    setForm({
      lastName: "",
      firstName: "",
      purchaseDate: "",
      product: "",
      impression: "",
      episode: "",
      staffName: "",
    });

  const inputStyle = {
    width: "100%",
    border: "1px solid #d8d2c8",
    borderRadius: 2,
    padding: "10px 12px",
    fontSize: "13px",
    color: "#222",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    background: "#fcfbf9",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#efe9e1",
        fontFamily:
          "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
      }}
    >
      {/* Header */}
      <div style={{ background: "#16130f", padding: "22px 0", textAlign: "center" }}>
        <p
          style={{
            color: "#c0a16b",
            letterSpacing: "0.45em",
            fontSize: "11px",
            margin: "0 0 8px 0",
            paddingLeft: "0.45em",
          }}
        >
          TOD'S
        </p>
        <h1
          style={{
            color: "#f5f0e8",
            fontSize: "16px",
            fontWeight: 400,
            letterSpacing: "0.18em",
            margin: 0,
          }}
        >
          ハートフルレター 作成
        </h1>
        <p
          style={{
            color: "#8a8175",
            fontSize: "10px",
            letterSpacing: "0.1em",
            margin: "8px 0 0 0",
          }}
        >
          御殿場プレミアムアウトレット店
        </p>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "22px 16px 48px" }}>
        {/* Input */}
        <div
          style={{
            background: "#fff",
            borderRadius: 2,
            padding: "26px 22px",
            marginBottom: 18,
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#a99",
              letterSpacing: "0.2em",
              margin: "0 0 20px 0",
              color: "#9a8f7d",
            }}
          >
            お客様情報
          </p>

          {/* Name */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>姓</label>
              <input
                style={inputStyle}
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                placeholder="田中"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>名</label>
              <input
                style={inputStyle}
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder="さくら"
              />
            </div>
          </div>

          {/* Purchase date */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>購入日</label>
            <input
              type="date"
              style={inputStyle}
              value={form.purchaseDate}
              onChange={(e) => update("purchaseDate", e.target.value)}
            />
            {daysPassed !== null && (
              <p
                style={{
                  fontSize: "11px",
                  margin: "6px 0 0 0",
                  color: daysPassed <= 3 ? "#5a8a5a" : "#a8743a",
                }}
              >
                購入から{daysPassed}日経過 →{" "}
                {daysPassed <= 3
                  ? "「この度は〜ございます」"
                  : "「先日は〜ございました」"}
              </p>
            )}
          </div>

          {/* Product */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>購入商品名</label>
            <input
              style={inputStyle}
              value={form.product}
              onChange={(e) => update("product", e.target.value)}
              placeholder="ディーババッグ"
            />
          </div>

          {/* Impression */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>お客様の印象・雰囲気</label>
            <input
              style={inputStyle}
              value={form.impression}
              onChange={(e) => update("impression", e.target.value)}
              placeholder="華やかでありながら品のある雰囲気"
            />
          </div>

          {/* Episode */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>来店エピソード（その日の様子）</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical" }}
              rows={3}
              value={form.episode}
              onChange={(e) => update("episode", e.target.value)}
              placeholder="また、結婚記念日のご旅行の途中にお立ち寄りいただき、本当にありがとうございました。ご夫婦で楽しそうにご覧いただいていたのが印象的でした。"
            />
          </div>

          {/* Staff */}
          <div>
            <label style={labelStyle}>担当スタッフ名</label>
            <input
              style={inputStyle}
              value={form.staffName}
              onChange={(e) => update("staffName", e.target.value)}
              placeholder="佐藤"
            />
          </div>
        </div>

        {/* Preview */}
        <div
          style={{
            background: "#fff",
            borderRadius: 2,
            padding: "26px 22px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#9a8f7d",
                letterSpacing: "0.2em",
                margin: 0,
              }}
            >
              プレビュー
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleReset} style={resetBtn}>
                リセット
              </button>
              <button
                onClick={handleCopy}
                style={{
                  ...copyBtn,
                  background: copied ? "#5a8a5a" : "#16130f",
                }}
              >
                {copied ? "コピーしました ✓" : "全文コピー"}
              </button>
            </div>
          </div>

          <div
            style={{
              background: "#faf8f4",
              border: "1px solid #ece6dc",
              borderRadius: 2,
              padding: "12px 14px",
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: "10px", color: "#b3a892", marginRight: 8 }}>
              件名
            </span>
            <span style={{ fontSize: "12px", color: "#333" }}>{subject}</span>
          </div>

          <div
            style={{
              fontSize: "13px",
              lineHeight: "2.1",
              color: "#2a2620",
              whiteSpace: "pre-wrap",
            }}
          >
            {letter}
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "11px",
  color: "#5a5045",
  marginBottom: 6,
  letterSpacing: "0.05em",
};

const resetBtn = {
  background: "none",
  border: "1px solid #d0c8ba",
  borderRadius: 2,
  padding: "7px 14px",
  fontSize: "11px",
  color: "#8a8175",
  cursor: "pointer",
  fontFamily: "inherit",
};

const copyBtn = {
  border: "none",
  borderRadius: 2,
  padding: "7px 16px",
  fontSize: "11px",
  color: "#fff",
  cursor: "pointer",
  letterSpacing: "0.05em",
  transition: "background 0.2s",
  fontFamily: "inherit",
};
