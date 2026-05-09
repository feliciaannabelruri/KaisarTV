// =====================
// STICKY NAV
// =====================
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// =====================
// SECTION DOTS
// =====================
const sections = document.querySelectorAll('section[id], footer[id]');
const dots = document.querySelectorAll('.sdot');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      dots.forEach(d => d.classList.toggle('active', d.dataset.section === id));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => io.observe(s));

dots.forEach(d => {
  d.addEventListener('click', () => {
    document.getElementById(d.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
  });
});

// =====================
// SCROLL REVEAL
// =====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.comp-card, .tl-card, .metric-card, .scope-card, .check-item, .problem-card, .sim-card, .flow-node, .dash-card, .cta-closing').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// =====================
// CHECKLIST + PROGRESS
// =====================
function toggleCheck(id) {
  const box = document.getElementById(id);
  box.classList.toggle('checked');
  updateProgress();
}

function updateProgress() {
  const total = document.querySelectorAll('.check-box').length;
  const done = document.querySelectorAll('.check-box.checked').length;
  const bar = document.getElementById('check-progress-bar');
  const label = document.getElementById('check-progress-label');
  if (bar) bar.style.width = (done / total * 100) + '%';
  if (label) label.textContent = done + ' dari ' + total + ' siap';
  if (done === total) triggerConfetti();
}

function triggerConfetti() {
  const colors = ['#FF6B35', '#FF3D6B', '#00E5A0', '#fff'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*0.5}s;animation-duration:${0.8+Math.random()*0.8}s;width:${6+Math.random()*6}px;height:${6+Math.random()*6}px;border-radius:${Math.random()>0.5?'50%':'2px'}`;
    document.getElementById('confetti-container').appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

// =====================
// COMP CARD EXPAND
// =====================
document.querySelectorAll('.comp-card').forEach(card => {
  card.addEventListener('click', () => {
    const isOpen = card.classList.contains('expanded');
    document.querySelectorAll('.comp-card').forEach(c => c.classList.remove('expanded'));
    if (!isOpen) card.classList.add('expanded');
  });
});

// =====================
// TIMELINE WEEK SELECT
// =====================
document.querySelectorAll('.tl-week-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tl-week-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tl-row').forEach(r => r.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('tl-' + btn.dataset.week);
    if (target) target.classList.add('active');
  });
});

// =====================
// DISTRIBUTION SIMULATOR
// =====================
const templates = {
  tiktok: {
    awareness: {
      hook: '"Ini yang belum banyak orang tahu tentang [topik]..."',
      caption: 'Kaisar TV ngomongin hal yang sering dilewatin brand besar. Tonton sampai habis — ada 1 insight yang bisa langsung kamu apply.',
      cta: 'Follow untuk konten B2B insight tiap minggu 🔔',
      hashtag: '#B2BIndonesia #MediaMarketing #KaisarTV #ContentStrategy'
    },
    lead: {
      hook: '"Brand yang belum paham ini bakal ketinggalan di 2025..."',
      caption: 'Kaisar TV buka sesi diskusi gratis untuk brand yang mau masuk ke ekosistem media kami. Slot terbatas.',
      cta: 'Komen "INFO" atau DM langsung untuk jadwal diskusi →',
      hashtag: '#Partnership #MediaPartner #KaisarTV #B2BBrand'
    },
    positioning: {
      hook: '"Kenapa Kaisar TV bukan sekadar channel media..."',
      caption: 'Kami bukan cuma media — kami ekosistem distribusi konten yang bantu brand masuk ke audience yang tepat.',
      cta: 'DM kami untuk lihat deck partnership →',
      hashtag: '#MediaEkosistem #KaisarTV #ContentDistribution'
    }
  },
  linkedin: {
    awareness: {
      hook: 'Satu hal yang membedakan brand yang tumbuh dengan yang stagnan di era konten ini:',
      caption: 'Mereka tidak hanya memproduksi konten — mereka mendistribusikannya dengan intent yang jelas ke decision maker yang tepat. Kaisar TV sedang membangun sistem ini. Berikut cara kerjanya...',
      cta: 'Follow Kaisar TV untuk update tentang content-to-business strategy →',
      hashtag: '#ContentMarketing #B2BStrategy #MediaPartnership #KaisarTV'
    },
    lead: {
      hook: 'Kami membuka 3 slot pilot partnership untuk brand yang serius tentang inbound B2B melalui konten.',
      caption: 'Bersama Worklight.id, Kaisar TV membangun sistem distribusi konten berbasis objective yang menghasilkan inbound terukur — bukan sekadar views.\n\nJika Anda decision maker di sektor [industri], ini relevan untuk Anda.',
      cta: 'Comment "PILOT" atau DM langsung. Diskusi 30 menit, no commitment.',
      hashtag: '#B2BMarketing #ContentStrategy #MediaPartner #InboundMarketing'
    },
    positioning: {
      hook: 'Kaisar TV bukan channel YouTube biasa. Ini adalah ekosistem distribusi konten B2B.',
      caption: 'Kami bekerja dengan brand dan creator untuk mendistribusikan konten secara strategis ke segmen B2B yang relevan — dengan sistem tracking dan feedback loop yang terukur.',
      cta: 'Tertarik bermitra? Let\'s connect →',
      hashtag: '#MediaEkosistem #B2BContent #StrategicPartnership'
    }
  },
  reels: {
    awareness: {
      hook: '"POV: kamu baru sadar kontenmu selama ini salah distribusi 👀"',
      caption: 'Bukan masalah produksinya — masalahnya di distribusinya. Kaisar TV lagi ngomongin ini.',
      cta: 'Save post ini kalau kamu brand/creator yang mau scale 📌',
      hashtag: '#ContentCreator #BrandMarketing #KaisarTV #MediaStrategy'
    },
    lead: {
      hook: '"Kami kasih 1 sesi analisis konten gratis untuk 5 brand minggu ini"',
      caption: 'Kalau kamu brand yang sudah produksi konten tapi belum dapat inbound B2B — kita perlu ngobrol.',
      cta: 'DM kata "ANALISIS" sekarang. 5 slot. First come first served.',
      hashtag: '#FreeAudit #ContentAnalysis #B2BMarketing #KaisarTV'
    },
    positioning: {
      hook: '"Worklight.id × Kaisar TV — sistem distribusi konten yang beda"',
      caption: 'Bukan agency biasa. Bukan media biasa. Kami bangun pipeline dari konten ke inbound bisnis yang nyata.',
      cta: 'Swipe untuk lihat cara kerjanya →',
      hashtag: '#ContentToInbound #MediaPartner #KaisarTV'
    }
  },
  shorts: {
    awareness: {
      hook: '"1 hal ini yang bikin konten Kaisar TV beda dari channel lain..."',
      caption: 'Distribusi berbasis objective. Tiap video punya tujuan spesifik ke segmen spesifik.',
      cta: 'Subscribe untuk strategi konten B2B mingguan 🔔',
      hashtag: '#YouTubeShorts #ContentStrategy #B2BMarketing #KaisarTV'
    },
    lead: {
      hook: '"Mau jadi partner distribusi Kaisar TV? Ini syaratnya..."',
      caption: 'Kami buka kemitraan dengan brand yang punya visi jangka panjang di media digital.',
      cta: 'Link di deskripsi untuk apply →',
      hashtag: '#MediaPartner #Partnership #KaisarTV #B2BBrand'
    },
    positioning: {
      hook: '"Dari konten ke bisnis — sistem yang Kaisar TV bangun bersama Worklight.id"',
      caption: 'Full content-to-inbound pipeline. Bukan hanya media, tapi ekosistem.',
      cta: 'Tonton video panjangnya di channel utama →',
      hashtag: '#ContentEcosystem #B2BMedia #KaisarTV'
    }
  }
};

document.getElementById('sim-generate')?.addEventListener('click', () => {
  const platform = document.getElementById('sim-platform').value;
  const objective = document.getElementById('sim-objective').value;
  const topic = document.getElementById('sim-topic').value || '[topik konten]';
  const tpl = templates[platform]?.[objective];
  if (!tpl) return;

  const fill = (str) => str.replace(/\[topik\]/g, topic).replace(/\[topik konten\]/g, topic);

  document.getElementById('out-hook').textContent = fill(tpl.hook);
  document.getElementById('out-caption').textContent = fill(tpl.caption);
  document.getElementById('out-cta').textContent = fill(tpl.cta);
  document.getElementById('out-hashtag').textContent = fill(tpl.hashtag);

  const result = document.getElementById('sim-result');
  result.classList.add('visible');

  // typewriter effect on hook
  const hookEl = document.getElementById('out-hook');
  const text = hookEl.textContent;
  hookEl.textContent = '';
  let i = 0;
  const tw = setInterval(() => {
    hookEl.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(tw);
  }, 18);
});

document.getElementById('sim-copy')?.addEventListener('click', () => {
  const hook = document.getElementById('out-hook').textContent;
  const caption = document.getElementById('out-caption').textContent;
  const cta = document.getElementById('out-cta').textContent;
  const hashtag = document.getElementById('out-hashtag').textContent;
  const full = `${hook}\n\n${caption}\n\n${cta}\n\n${hashtag}`;
  navigator.clipboard.writeText(full).then(() => {
    const btn = document.getElementById('sim-copy');
    btn.textContent = '✓ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy Caption', 1800);
  });
});

// =====================
// ROADMAP HOVER
// =====================
document.querySelectorAll('.rm-step').forEach((step, i) => {
  step.addEventListener('mouseenter', () => {
    document.querySelectorAll('.rm-step').forEach((s, j) => {
      s.querySelector('.rm-dot').style.background = j <= i ? 'linear-gradient(135deg,#FF6B35,#FF3D6B)' : '';
    });
  });
  step.addEventListener('mouseleave', () => {
    document.querySelectorAll('.rm-step').forEach((s, j) => {
      s.querySelector('.rm-dot').style.background = j === 0 ? 'linear-gradient(135deg,#FF6B35,#FF3D6B)' : '';
    });
  });
});

// =====================
// METRIC BARS ANIMATE
// =====================
const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.mbar-fill').forEach(bar => {
        bar.style.width = bar.dataset.val + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.metrics-grid')?.forEach(g => metricObserver.observe(g));

// =====================
// MODAL
// =====================
document.getElementById('open-modal')?.addEventListener('click', () => {
  document.getElementById('align-modal').classList.add('visible');
});
document.getElementById('close-modal')?.addEventListener('click', () => {
  document.getElementById('align-modal').classList.remove('visible');
});
document.getElementById('align-modal')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('visible');
});

document.getElementById('modal-submit')?.addEventListener('click', () => {
  const name = document.getElementById('modal-name').value;
  const wa = document.getElementById('modal-wa').value;
  const time = document.getElementById('modal-time').value;
  if (!name || !wa) { alert('Isi nama dan nomor WA dulu ya!'); return; }
  const msg = encodeURIComponent(`Halo Worklight.id! Saya ${name} ingin jadwalkan sesi alignment untuk pilot Content-to-Inbound System Kaisar TV.\nNomor WA: ${wa}\nPreferensi waktu: ${time || 'Fleksibel'}`);
  window.open(`https://wa.me/62XXXXXXXXXX?text=${msg}`, '_blank');
});
