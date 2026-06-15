// One-off QR generator. Usage: node scripts/qr.mjs "<url>" "<out.png>"
import QRCode from "qrcode";

const url = process.argv[2] || "https://avaelishealth.com.au/talk-summary?utm_source=talk";
const out = process.argv[3] || "talk-qr.png";

await QRCode.toFile(out, url, {
  width: 1000,
  margin: 2,
  errorCorrectionLevel: "M",
  color: { dark: "#111111", light: "#FFFFFF" },
});
console.log("QR written:", out, "->", url);
