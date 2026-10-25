const app = document.querySelector("#app");
const path = location.pathname.replace(/\/+$/, "") || "/";

const nav = `
<header class="site-header">
  <div class="container nav">
    <a class="brand" href="/"><img src="/assets/logo.svg" alt="Ayesha's logo"></a>
    <button class="menu" aria-label="Menu">☰</button>
    <nav class="nav-links">
      <a href="/">Home</a><a href="/about">About</a><a href="/services">Services</a>
      <a href="/bridal">Bridal</a><a href="/academy">Academy</a><a href="/work">Our Work</a>
      <a href="/gallery">Gallery</a><a href="/contact">Contact</a>
      <a class="btn btn-dark" href="/book">Book Now</a>
    </nav>
  </div>
</header>`;

const footer = `
<footer class="footer">
  <div class="container footer-grid">
    <div><div class="footer-brand"><img src="/assets/logo-light.svg" alt="Ayesha's logo"></div><p class="muted">Beauty, makeup artistry and professional training — crafted with care.</p></div>
    <div><b>Explore</b><a href="/about">About</a><a href="/services">Services</a><a href="/work">Our Work</a><a href="/gallery">Gallery</a></div>
    <div><b>Specialties</b><a href="/bridal">Bridal Makeup</a><a href="/academy">Academy</a><a href="/book">Appointments</a></div>
    <div><b>Connect</b><a id="instagramLink" href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="/contact">WhatsApp & Contact</a><a href="/book">Book Appointment</a></div>
  </div>
  <div class="container footer-bottom">© ${new Date().getFullYear()} Ayesha's. All rights reserved.</div>
</footer>
<a class="wa" id="waFloat" href="#" aria-label="WhatsApp">WA</a>`;

const image = (url, alt="") => `<img src="${url}" alt="${alt}" loading="lazy">`;
const MEDIA = "/assets/media/";
const PHOTO = "https://images.unsplash.com/";
const photos = {
  hero: PHOTO + "photo-1781187009755-0cbc0c4cd2b3?auto=format&fit=crop&w=1400&q=88",
  artist: PHOTO + "photo-1771254240529-dbe324f0a401?auto=format&fit=crop&w=1200&q=88",
  bridal: PHOTO + "photo-1742891602815-fa2a195f0ab3?auto=format&fit=crop&w=1200&q=88",
  brideRed: PHOTO + "photo-1779475534697-008594eecd87?auto=format&fit=crop&w=1200&q=88",
  sari: PHOTO + "photo-1722422284857-19f000fc194b?auto=format&fit=crop&w=1200&q=88",
  sariPortrait: PHOTO + "photo-1722422284910-e4e569164b4b?auto=format&fit=crop&w=1200&q=88"
};
const heroImg = photos.hero;
const portrait = photos.artist;
const bridalImg = photos.bridal;

const servicePicsHome = [photos.bridal, photos.sari, photos.brideRed];

const serviceData = [
 ["✦","Bridal Makeup","Timeless, camera-ready bridal looks designed around your features, outfit and personality."],
 ["◌","Party Makeup","Soft glam to statement evening makeup for celebrations, events and special occasions."],
 ["✧","Engagement Makeup","Polished, luminous looks that photograph beautifully from every angle."],
 ["♢","Hair Styling","Elegant buns, waves, braids and complete hair finishing to complement your look."],
 ["♡","Beauty Services","Thoughtful beauty prep and finishing services for a fresh, confident appearance."],
 ["✺","Makeup Training","Practical, professional training for aspiring artists through our academy."]
];

function layout(content){
  app.innerHTML = nav + `<main>${content}</main>` + footer;
  document.querySelector(".menu")?.addEventListener("click",()=>document.querySelector(".nav-links").classList.toggle("open"));
  window.addEventListener("scroll",()=>document.querySelector(".site-header")?.classList.toggle("scrolled",scrollY>20),{passive:true});
  document.querySelectorAll(".reveal").forEach(el=>new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.1}).observe(el));
  setupWhatsApp();
}

async function setupWhatsApp(){
  try{
    const r=await fetch("/api/config"); const c=await r.json();
    const link=`https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent("Hello Ayesha's ✨ I'd like to enquire about an appointment.")}`;
    const w=document.querySelector("#waFloat"); if(w) w.href=link;
    const ig=document.querySelector("#instagramLink"); if(ig) ig.href=`https://instagram.com/${c.instagramUsername}`;
  }catch{}
}

function home(){
layout(`
<section class="container hero">
  <div class="hero-copy reveal"><div class="eyebrow">Beauty • Makeup • Artistry</div>
  <h1>Your Beauty,<br><em>Perfected.</em></h1>
  <p>Premium bridal makeup, occasion glam and beauty artistry created to feel like the most beautiful version of you.</p>
  <div class="actions"><a class="btn btn-dark" href="/book">Book Appointment</a><a class="btn btn-light" href="/work">Explore Our Work</a></div></div>
  <div class="hero-visual reveal">${image(heroImg,"Ayesha's makeup artistry")}<div class="floating float-top"><b>500+</b><br><span class="muted">Happy clients</span></div><div class="floating float-bottom"><b>Bridal • Glam • Academy</b><br><span class="muted">Personalized artistry</span></div></div>
</section>
<section class="container stats reveal"><div class="stat"><strong>500+</strong><span class="muted">Happy Clients</span></div><div class="stat"><strong>100+</strong><span class="muted">Bridal Looks</span></div><div class="stat"><strong>5+</strong><span class="muted">Years Experience</span></div><div class="stat"><strong>1:1</strong><span class="muted">Personal Attention</span></div></section>

<section class="section"><div class="container about-grid">
  <div class="reveal">${image(portrait,"Professional makeup artist")}</div>
  <div class="copy reveal"><div class="eyebrow">Meet Ayasha</div><h2>Where beauty meets artistry.</h2><p>Every face has its own story. Our approach is to enhance what already makes you beautiful — with thoughtful consultation, premium techniques and a finish that feels effortless.</p><p>From your first consultation to the final touch, your experience is designed around you.</p><a class="btn btn-dark" href="/about">Discover Our Story</a></div>
</div></section>

<section class="section dark-section"><div class="container"><div class="section-head reveal"><div><div class="eyebrow">Signature Services</div><h2 class="serif">Made for your moment.</h2></div><a class="btn btn-light" href="/services">View All Services</a></div>
<div class="cards service-cards home-service-cards">${serviceData.slice(0,3).map((s,i)=>`<article class="card service-card reveal"><img class="service-image" src="${servicePicsHome[i]}" alt="${s[1]}" loading="lazy"><div class="service-content"><div class="icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></div></article>`).join("")}</div></div></section>

<section class="section"><div class="container split"><div class="copy reveal"><div class="eyebrow">The Bridal Experience</div><h2>For the day you'll remember forever.</h2><p>Your bridal look should feel personal, luxurious and completely you. We plan the details with your outfit, jewellery, skin finish, photography and ceremony in mind.</p><div class="actions"><a class="btn btn-gold" href="/bridal">Explore Bridal</a><a class="btn btn-light" href="/book">Book Consultation</a></div></div><div class="reveal">${image(bridalImg,"Indian bridal makeup")} </div></div></section>

<section class="section dark-section"><div class="container"><div class="section-head reveal"><div><div class="eyebrow">Latest Work</div><h2 class="serif">See the transformation.</h2></div><a class="btn btn-light" href="/work">View All Work</a></div><div id="homeWork" class="work-grid"></div></div></section>

<section class="section"><div class="container"><div class="cta reveal"><div class="eyebrow">Ayesha's Academy</div><h2>Turn your passion into your profession.</h2><p class="muted">Learn practical makeup and beauty skills through structured, hands-on training.</p><a class="btn btn-dark" href="/academy">Explore Academy</a></div></div></section>

<section class="section"><div class="container"><div class="section-head reveal"><div><div class="eyebrow">Client Love</div><h2>Beautiful words.</h2></div></div><div class="cards"><article class="card reveal"><div class="stars">★★★★★</div><p class="testimonial">“My bridal look felt elegant, comfortable and completely me. The attention to detail was incredible.”</p><b>— Bridal Client</b></article><article class="card reveal"><div class="stars">★★★★★</div><p class="testimonial">“Professional from consultation to the final look. I felt so confident.”</p><b>— Occasion Client</b></article><article class="card reveal"><div class="stars">★★★★★</div><p class="testimonial">“The academy is practical and easy to follow. Every class feels personal.”</p><b>— Academy Student</b></article></div></div></section>
`);
loadWork("homeWork",3);
}

function innerPage(title, eyebrow, desc, body){
layout(`<section class="page-hero"><div class="container reveal"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div></section>${body}`);
}

function about(){
innerPage("The artist behind the glow.","About Ayasha","A beauty experience built around artistry, confidence and personal attention.",`
<section class="section"><div class="container about-grid"><div class="reveal">${image(portrait,"Ayesha's artist")}</div><div class="copy reveal"><div class="eyebrow">Our Philosophy</div><h2>Enhance. Never hide.</h2><p>Ayesha's is built on one simple belief: makeup should make you feel more like yourself, not less. We combine refined technique with a calm, personal experience.</p><p>Whether you're a bride, attending an event or learning the craft, every detail is considered with care.</p><a class="btn btn-dark" href="/book">Work With Us</a></div></div></section>
<section class="section dark-section"><div class="container"><div class="cards">${["Personalized Consultation","Premium Techniques","Hygiene First"].map((x,i)=>`<article class="card reveal"><div class="icon">${["✦","◇","♡"][i]}</div><h3>${x}</h3><p class="muted">${["Your features, outfit, event and comfort guide the final look.","Modern techniques with a timeless, photograph-friendly finish.","A clean, professional setup is part of every appointment."][i]}</p></article>`).join("")}</div></div></section>`);
}

function services(){
const servicePics=[
 photos.bridal,photos.sari,photos.brideRed,
 photos.artist,photos.sariPortrait,photos.hero
];
innerPage("Services that feel like you.","Services","Choose your occasion. We'll create the look.",`<section class="section"><div class="container"><div class="cards service-cards">${serviceData.map((s,i)=>`<article class="card service-card reveal"><img class="service-image" src="${servicePics[i]}" alt="${s[1]}" loading="lazy"><div class="service-content"><div class="icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p><a class="btn btn-light" href="/book?service=${encodeURIComponent(s[1])}">Enquire</a></div></article>`).join("")}</div></div></section>`);
}
function bridal(){
innerPage("Bridal, beautifully personal.","Bridal","From consultation to the final photograph, your bridal look is planned around you.",`
<section class="section"><div class="container split"><div class="reveal">${image(bridalImg,"Bridal beauty")} </div><div class="copy reveal"><div class="eyebrow">Bridal Signature</div><h2>Soft, timeless, unforgettable.</h2><p>We create bridal looks with long-wear comfort, balanced skin, expressive eyes and details that complement your outfit and jewellery.</p><ul><li>Bridal makeup consultation</li><li>Wedding-day makeup</li><li>Engagement & reception looks</li><li>Hair styling & finishing</li><li>Personalized look planning</li></ul><a class="btn btn-gold" href="/book?service=Bridal%20Makeup">Book Bridal Consultation</a></div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Bridal Gallery</div><h2>Moments in the making.</h2></div></div><div class="gallery">${[photos.bridal,photos.hero,photos.sari,photos.brideRed,photos.sariPortrait,photos.artist].map((x,i)=>image(x,`Bridal look ${i+1}`)).join("")}</div></div></section>`);
}

function academy(){
innerPage("Learn the craft. Build the career.","Academy","Hands-on beauty and makeup training for aspiring artists.",`
<section class="section"><div class="container split"><div class="reveal"><img class="academy-image" src="${photos.artist}" alt="Makeup training and bridal artistry" loading="lazy"></div><div class="copy reveal"><div class="eyebrow">Hands-on Learning</div><h2>Learn with a real artist's eye.</h2><p>Practice the techniques, consultation skills and professional workflow that turn beauty knowledge into client-ready artistry.</p></div></div></section>
<section class="section"><div class="container"><div class="cards">${[
["Professional Makeup Foundation","Build strong fundamentals: skin prep, base, colour, eye looks and finishing."],
["Bridal Makeup Mastery","Learn bridal consultation, long-wear techniques, face mapping and complete look planning."],
["Advanced Beauty Skills","Level up your speed, precision, client communication and professional workflow."]
].map(s=>`<article class="card reveal"><div class="eyebrow">Course</div><h3>${s[0]}</h3><p>${s[1]}</p><a class="btn btn-dark" href="/book?service=${encodeURIComponent(s[0])}">Enquire About Course</a></article>`).join("")}</div></div></section>
<section class="section dark-section"><div class="container split"><div class="copy reveal"><div class="eyebrow">Why Learn With Us</div><h2>Less theory. More doing.</h2><p class="muted">Training is designed around practice, feedback and repeatable professional techniques so students can build confidence while they learn.</p></div><div class="card reveal"><h3>Academy Enquiry</h3><p class="muted">Tell us which course interests you and your preferred start date.</p><a class="btn btn-light" href="/book?service=Academy%20Enquiry">Send Enquiry</a></div></div></section>`);
}

async function loadWork(target="workGrid", limit=20){
const box=document.getElementById(target); if(!box)return;
box.innerHTML="<p class='muted'>Loading latest work…</p>";
try{
 const r=await fetch("/api/work"); const data=await r.json();
 box.innerHTML=data.items.slice(0,limit).map(item=>`
 <article class="work-card reveal" data-video="${item.videoUrl}" data-link="${item.permalink}">
   ${image(item.thumbnail,item.title)}
   <div class="play"><span>▶</span></div>
   <div class="work-label"><strong>${item.title}</strong><span>${item.caption}</span></div>
 </article>`).join("");
 box.querySelectorAll(".work-card").forEach(card=>card.addEventListener("click",()=>openVideo(card.dataset.video,card.dataset.link)));
}catch(e){box.innerHTML="<div class='notice'>Work feed could not be loaded right now.</div>"}
}

function work(){
innerPage("Our work, in motion.","Portfolio • Social Feed","Real looks, real transformations and the latest beauty content in one place.",`
<section class="section dark-section"><div class="container"><div class="notice" style="margin-bottom:25px">The Work feed is API-ready. Add the professional Instagram/Meta credentials in <b>.env</b> and connect the current Graph API endpoint in <b>server.js</b>. Until then, the included demo feed keeps the page working.</div><div id="workGrid" class="work-grid"></div></div></section>
<section class="section"><div class="container cta"><div class="eyebrow">Follow the journey</div><h2>More looks. More behind the scenes.</h2><p class="muted">Follow Ayesha's on Instagram for new reels and daily updates.</p><a id="igCta" class="btn btn-dark" target="_blank" rel="noreferrer" href="https://instagram.com/">Open Instagram</a></div></section>
<div class="modal" id="videoModal"><div class="modal-box"><button class="close" id="closeVideo">×</button><video id="videoPlayer" controls playsinline></video></div></div>`);
loadWork("workGrid",20);
fetch("/api/config").then(r=>r.json()).then(c=>{document.getElementById("igCta").href=`https://instagram.com/${c.instagramUsername}`}).catch(()=>{});
document.getElementById("closeVideo")?.addEventListener("click",closeVideo);
document.getElementById("videoModal")?.addEventListener("click",e=>{if(e.target.id==="videoModal")closeVideo()});
}

function openVideo(src,link){
const m=document.getElementById("videoModal"); const v=document.getElementById("videoPlayer");
if(!src){window.open(link,"_blank","noopener");return}
v.src=src;m.classList.add("open");v.play().catch(()=>{});
}
function closeVideo(){const m=document.getElementById("videoModal"),v=document.getElementById("videoPlayer");v.pause();v.removeAttribute("src");m?.classList.remove("open")}

function gallery(){
const pics=[photos.bridal,photos.sari,photos.brideRed,photos.sariPortrait,photos.artist,photos.hero];
innerPage("A gallery of beauty.","Gallery","A visual collection of bridal, glam and artistry.",`<section class="section"><div class="container gallery">${pics.map((p,i)=>image(p,`Ayesha's gallery ${i+1}`)).join("")}</div></section>`);
}
function reviews(){
innerPage("Beautiful words.","Reviews","The experience matters as much as the final look.",`<section class="section"><div class="container cards">${["“My bridal look felt elegant, comfortable and completely me. I received so many compliments.”","“The consultation made everything easy. The final look photographed beautifully and lasted all evening.”","“The academy gave me confidence and practical skills I could actually use with clients.”","“Professional, calm and incredibly detail-oriented. I would book again in a heartbeat.”","“I wanted natural glam and that's exactly what I got — polished without feeling heavy.”","“The whole experience felt personal from start to finish.”"].map((x,i)=>`<article class="card reveal"><div class="stars">★★★★★</div><p class="testimonial">${x}</p><b>— Verified Client</b></article>`).join("")}</div></section>`);
}

function contact(){
innerPage("Let's create something beautiful.","Contact","For appointments, bridal enquiries, academy information or collaborations.",`
<section class="section"><div class="container split"><div class="reveal"><img class="contact-image" src="${photos.sariPortrait}" alt="Elegant bridal beauty" loading="lazy"></div><div class="copy"><div class="eyebrow">Get in touch</div><h2>We'd love to hear from you.</h2><p>For the fastest response, send us a WhatsApp message with your preferred service and date.</p><div class="actions"><a id="contactWa" class="btn btn-gold" href="#">WhatsApp Us</a><a class="btn btn-light" href="/book">Book Appointment</a></div></div><div class="card"><h3>Opening Hours</h3><p>Monday – Saturday<br>10:00 AM – 7:00 PM</p><hr><h3>Services</h3><p>Bridal • Occasion • Hair • Beauty • Academy</p><hr><h3>Social</h3><p><a id="contactIg" href="#" target="_blank" rel="noreferrer">@ayashasvanity</a></p></div></div></section>`);
fetch("/api/config").then(r=>r.json()).then(c=>{document.getElementById("contactWa").href=`https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent("Hello Ayesha's ✨ I'd like to enquire about an appointment.")}`;document.getElementById("contactIg").href=`https://instagram.com/${c.instagramUsername}`}).catch(()=>{});
}

function book(){
innerPage("Book your beauty experience.","Appointment","Send your preferred details. We'll confirm availability with you on WhatsApp.",`
<section class="section"><div class="container split"><div class="copy"><img class="booking-image" src="${photos.artist}" alt="Bridal makeup consultation" loading="lazy"><div class="eyebrow">Easy booking</div><h2>One message away.</h2><p>Fill the form and we'll prepare a WhatsApp message with your appointment details. Your booking is confirmed only after availability is checked with the studio.</p><div class="notice">Tip: For bridal bookings, include your wedding date, event location and preferred look in the message.</div></div>
<form id="bookingForm" class="card form"><div class="form-grid"><div class="field"><label>Name *</label><input name="name" required placeholder="Your name"></div><div class="field"><label>Phone *</label><input name="phone" required placeholder="+91..."></div></div>
<div class="field"><label>Service *</label><select name="service" required><option value="">Select a service</option>${serviceData.map(s=>`<option>${s[1]}</option>`).join("")}</select></div>
<div class="form-grid"><div class="field"><label>Preferred date *</label><input name="date" type="date" required></div><div class="field"><label>Preferred time</label><input name="time" type="time"></div></div>
<div class="field"><label>Message</label><textarea name="message" placeholder="Tell us anything important..."></textarea></div>
<button class="btn btn-dark" type="submit">Continue on WhatsApp →</button><div id="bookingMsg"></div></form></div></section>`);
const params=new URLSearchParams(location.search);const pre=params.get("service");if(pre){const s=document.querySelector('[name="service"]');if(s)s.value=pre}
document.getElementById("bookingForm").addEventListener("submit",async e=>{
e.preventDefault();const msg=document.getElementById("bookingMsg");msg.className="notice";msg.textContent="Preparing your WhatsApp booking…";
const data=Object.fromEntries(new FormData(e.target).entries());
try{const r=await fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const out=await r.json();if(!r.ok)throw new Error(out.error);msg.textContent="Opening WhatsApp…";window.open(out.whatsappUrl,"_blank","noopener")}catch(err){msg.textContent=err.message||"Something went wrong."}
});
}

if(path==="/"||path==="/index.html")home();
else if(path==="/about")about();
else if(path==="/services")services();
else if(path==="/bridal")bridal();
else if(path==="/academy")academy();
else if(path==="/work")work();
else if(path==="/gallery")gallery();
else if(path==="/reviews")reviews();
else if(path==="/contact")contact();
else if(path==="/book"||path==="/booking")book();
else home();
