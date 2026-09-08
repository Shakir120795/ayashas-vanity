# Ayasha's Vanity — Premium Beauty Website

A multi-page, responsive beautician / makeup artist website with:
- Premium editorial hero and visual design
- Home, About, Services, Bridal, Academy, Our Work, Gallery, Reviews, Contact and Booking pages
- WhatsApp booking flow with pre-filled appointment message
- Floating WhatsApp button
- Work / social-feed API hook
- Video modal for work content
- Responsive mobile navigation
- Scroll reveal animations
- Easy deployment to a Node-compatible host

## Run locally

1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Put the real WhatsApp number in international format without `+`.
4. Put the Instagram username in `INSTAGRAM_USERNAME`.
5. Optional: add your Instagram/Meta API credentials later.
6. Run:

```bash
npm install
npm start
```

Open http://localhost:3000

## Important: Instagram / social videos

The project does **not scrape Instagram HTML**. Scraping is brittle and can break. The `/api/work` endpoint is deliberately structured so the current Meta/Instagram Graph API for the connected professional account can be wired into one place.

Until API credentials and the current Graph API endpoint are configured, the Work page uses demo content so the website remains fully usable.

For production, replace the demo branch in `server.js` with the official API response mapping:

```js
[
  {
    id,
    type: "video",
    title,
    caption,
    thumbnail,
    videoUrl,
    permalink
  }
]
```

Then the existing Work UI will render the real feed and play returned video URLs.

## Deploy

Because this is an Express app, deploy it to a Node-compatible service (Render, Railway, VPS, etc.). If using a static-only host, move the booking endpoint to a serverless function and configure the Work API endpoint similarly.

## Replace before launch

- `WHATSAPP_NUMBER` in `.env`
- `INSTAGRAM_USERNAME` in `.env`
- Demo images with the client's actual work
- Demo testimonials with real reviews
- Demo video feed with the official social/API feed
- Opening hours and course names if different

## Demo media
The latest package includes local, self-contained demo visual assets in `public/assets/media/`, so pages do not depend on external image URLs. The Work page also includes four small local demo videos. Replace these demo assets with the client's real Indian bridal/makeup photos and social videos before production launch.


## Demo photography

The current demo photography uses free-to-use Unsplash images so the site has realistic Indian bridal/beauty visuals during development. Replace these URLs with the client's own/licensed photos before final commercial launch if preferred.
