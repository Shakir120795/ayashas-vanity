import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const demoWork = [
  { id:"demo-1", type:"video", title:"Bridal Glow", caption:"Soft glam bridal transformation", thumbnail:"https://images.unsplash.com/photo-1779475534697-008594eecd87?auto=format&fit=crop&w=900&q=85", videoUrl:"/assets/media/work-1.mp4", permalink:"https://instagram.com/" },
  { id:"demo-2", type:"video", title:"Makeup Detail", caption:"The details behind the finish", thumbnail:"https://images.unsplash.com/photo-1771254240529-dbe324f0a401?auto=format&fit=crop&w=900&q=85", videoUrl:"/assets/media/work-2.mp4", permalink:"https://instagram.com/" },
  { id:"demo-3", type:"video", title:"Reception Glam", caption:"Elegant evening makeup look", thumbnail:"https://images.unsplash.com/photo-1722422284857-19f000fc194b?auto=format&fit=crop&w=900&q=85", videoUrl:"/assets/media/work-3.mp4", permalink:"https://instagram.com/" },
  { id:"demo-4", type:"video", title:"Beauty Prep", caption:"Professional prep & finishing", thumbnail:"https://images.unsplash.com/photo-1722422284910-e4e569164b4b?auto=format&fit=crop&w=900&q=85", videoUrl:"/assets/media/work-4.mp4", permalink:"https://instagram.com/" }
];

app.get("/api/config", (_req, res) => {
  res.json({
    whatsappNumber: process.env.WHATSAPP_NUMBER || "919999999999",
    instagramUsername: process.env.INSTAGRAM_USERNAME || "ayashasvanity"
  });
});

/*
  Production social-feed hook:
  Add your Instagram Graph API token in .env and replace this function
  with the current Meta API endpoint/fields for the connected professional account.
  We intentionally do not scrape Instagram pages because scraping is brittle
  and can violate platform rules.
*/
app.get("/api/work", async (_req, res) => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return res.json({ source: "demo", items: demoWork });
  }

  // Keep the server usable even before the API credentials are configured.
  // The frontend can switch to real items once this endpoint is connected.
  return res.json({
    source: "demo",
    note: "Instagram token detected. Connect the professional-account Graph API endpoint in server.js.",
    items: demoWork
  });
});

app.post("/api/booking", (req, res) => {
  const { name, phone, service, date, time, message } = req.body || {};
  if (!name || !phone || !service || !date) {
    return res.status(400).json({ error: "Please fill all required booking fields." });
  }

  const number = process.env.WHATSAPP_NUMBER || "919999999999";
  const text = [
    "Hello Ayasha's Vanity ✨",
    "",
    "I'd like to book an appointment.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Preferred date: ${date}`,
    `Preferred time: ${time || "Flexible"}`,
    `Message: ${message || "—"}`
  ].join("\n");

  res.json({
    ok: true,
    whatsappUrl: `https://wa.me/${number}?text=${encodeURIComponent(text)}`
  });
});

app.get("*splat", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Ayasha's Vanity running at http://localhost:${PORT}`);
});
