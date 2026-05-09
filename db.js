// =============================================
// KaisarTV Content-to-Inbound System — DB Layer
// All data stored in localStorage
// =============================================

const DB = {
  // ---- CONTENT ----
  getContents() { return JSON.parse(localStorage.getItem('ktv_contents') || '[]'); },
  saveContents(data) { localStorage.setItem('ktv_contents', JSON.stringify(data)); },
  addContent(item) {
    const list = this.getContents();
    item.id = 'c' + Date.now();
    item.createdAt = new Date().toISOString();
    list.unshift(item);
    this.saveContents(list);
    return item;
  },
  updateContent(id, updates) {
    const list = this.getContents().map(c => c.id === id ? {...c, ...updates} : c);
    this.saveContents(list);
  },
  deleteContent(id) { this.saveContents(this.getContents().filter(c => c.id !== id)); },
  getContent(id) { return this.getContents().find(c => c.id === id); },

  // ---- CLIPS ----
  getClips() { return JSON.parse(localStorage.getItem('ktv_clips') || '[]'); },
  saveClips(data) { localStorage.setItem('ktv_clips', JSON.stringify(data)); },
  addClip(item) {
    const list = this.getClips();
    item.id = 'cl' + Date.now();
    item.createdAt = new Date().toISOString();
    list.unshift(item);
    this.saveClips(list);
    return item;
  },
  updateClip(id, updates) {
    const list = this.getClips().map(c => c.id === id ? {...c, ...updates} : c);
    this.saveClips(list);
  },
  deleteClip(id) { this.saveClips(this.getClips().filter(c => c.id !== id)); },
  getClipsByContent(contentId) { return this.getClips().filter(c => c.contentId === contentId); },

  // ---- DISTRIBUTION ----
  getDists() { return JSON.parse(localStorage.getItem('ktv_dists') || '[]'); },
  saveDists(data) { localStorage.setItem('ktv_dists', JSON.stringify(data)); },
  addDist(item) {
    const list = this.getDists();
    item.id = 'd' + Date.now();
    item.createdAt = new Date().toISOString();
    list.unshift(item);
    this.saveDists(list);
    return item;
  },
  updateDist(id, updates) {
    const list = this.getDists().map(d => d.id === id ? {...d, ...updates} : d);
    this.saveDists(list);
  },
  deleteDist(id) { this.saveDists(this.getDists().filter(d => d.id !== id)); },
  getDistsByClip(clipId) { return this.getDists().filter(d => d.clipId === clipId); },

  // ---- INBOUND ----
  getInbounds() { return JSON.parse(localStorage.getItem('ktv_inbounds') || '[]'); },
  saveInbounds(data) { localStorage.setItem('ktv_inbounds', JSON.stringify(data)); },
  addInbound(item) {
    const list = this.getInbounds();
    item.id = 'i' + Date.now();
    item.createdAt = new Date().toISOString();
    list.unshift(item);
    this.saveInbounds(list);
    return item;
  },
  updateInbound(id, updates) {
    const list = this.getInbounds().map(i => i.id === id ? {...i, ...updates} : i);
    this.saveInbounds(list);
  },
  deleteInbound(id) { this.saveInbounds(this.getInbounds().filter(i => i.id !== id)); },

  // ---- SEED DATA (run once) ----
  seed() {
    if (localStorage.getItem('ktv_seeded')) return;
    const c1 = this.addContent({ title: 'Strategi Monetisasi Media Digital 2025', link: 'https://youtube.com/watch?v=example1', duration: '45:22', uploadDate: '2026-04-15', status: 'active', notes: 'Konten evergreen, cocok untuk B2B decision makers' });
    const c2 = this.addContent({ title: 'Behind the Camera: Cara Kaisar TV Produksi Konten', link: 'https://youtube.com/watch?v=example2', duration: '32:10', uploadDate: '2026-04-28', status: 'active', notes: 'Behind the scenes, bagus untuk positioning' });

    const cl1 = this.addClip({ contentId: c1.id, contentTitle: c1.title, tsStart: '00:02:10', tsEnd: '00:03:45', angle: 'Problem yang sering diabaikan brand soal monetisasi', hook: '"Kebanyakan brand salah ukur ROI konten mereka..."', objective: 'awareness', audience: 'Marketing Manager, Brand Manager', status: 'distributed' });
    const cl2 = this.addClip({ contentId: c1.id, contentTitle: c1.title, tsStart: '00:12:30', tsEnd: '00:14:00', angle: 'Solusi konkret: content-to-inbound framework', hook: '"Ini sistem yang kita pakai untuk convert viewers jadi leads..."', objective: 'lead', audience: 'CEO, Founder startup', status: 'ready' });
    const cl3 = this.addClip({ contentId: c2.id, contentTitle: c2.title, tsStart: '00:04:00', tsEnd: '00:05:30', angle: 'Positioning Kaisar TV sebagai ekosistem distribusi', hook: '"Kami bukan hanya channel — kami distribusi network..."', objective: 'positioning', audience: 'Brand partnership team', status: 'draft' });

    this.addDist({ clipId: cl1.id, clipAngle: cl1.angle, contentTitle: c1.title, platform: 'linkedin', date: '2026-05-05', caption: 'Kebanyakan brand mengukur kesuksesan konten dari views. Padahal metric yang benar adalah siapa yang engage, bukan berapa banyak.\n\nKaisar TV baru saja breakdown framework yang kami gunakan.', cta: 'DM kata "FRAMEWORK" untuk akses full deck', status: 'posted' });
    this.addDist({ clipId: cl1.id, clipAngle: cl1.angle, contentTitle: c1.title, platform: 'tiktok', date: '2026-05-06', caption: 'Brand yang masih ukur sukses dari views bakal ketinggalan di 2025', cta: 'Follow untuk insight B2B tiap minggu', status: 'posted' });
    this.addDist({ clipId: cl2.id, clipAngle: cl2.angle, contentTitle: c1.title, platform: 'linkedin', date: '2026-05-12', caption: 'Sistem ini yang kami gunakan untuk convert konten jadi inbound bisnis nyata.', cta: 'Comment "PILOT" untuk diskusi 30 menit', status: 'scheduled' });

    this.addInbound({ name: 'Budi Santoso', company: 'PT Maju Bersama', platform: 'linkedin', contentId: c1.id, contentTitle: c1.title, clipId: cl1.id, clipAngle: cl1.angle, date: '2026-05-06', quality: 'hot', status: 'contacted', notes: 'CEO startup fintech, tertarik partnership distribusi konten. Sudah follow up via WA.' });
    this.addInbound({ name: 'Sarah Wijaya', company: 'Brand XYZ', platform: 'tiktok', contentId: c1.id, contentTitle: c1.title, clipId: cl1.id, clipAngle: cl1.angle, date: '2026-05-07', quality: 'warm', status: 'new', notes: 'Marketing manager, tanya soal paket partnership' });
    this.addInbound({ name: 'Rizky Pratama', company: 'Agency Digital ABC', platform: 'linkedin', contentId: c1.id, contentTitle: c1.title, clipId: cl2.id, clipAngle: cl2.angle, date: '2026-05-08', quality: 'hot', status: 'deal', notes: 'Deal closed! Pilot 4 minggu, mulai Mei 2026.' });

    localStorage.setItem('ktv_seeded', '1');
  },

  // ---- ANALYTICS ----
  getStats() {
    const contents = this.getContents();
    const clips = this.getClips();
    const dists = this.getDists();
    const inbounds = this.getInbounds();
    const hot = inbounds.filter(i => i.quality === 'hot').length;
    const deals = inbounds.filter(i => i.status === 'deal').length;
    const posted = dists.filter(d => d.status === 'posted').length;
    const scheduled = dists.filter(d => d.status === 'scheduled').length;
    return { contents: contents.length, clips: clips.length, dists: dists.length, inbounds: inbounds.length, hot, deals, posted, scheduled };
  },

  getInboundByPlatform() {
    const inbounds = this.getInbounds();
    const map = {};
    inbounds.forEach(i => { map[i.platform] = (map[i.platform] || 0) + 1; });
    return map;
  },

  getInboundByContent() {
    const inbounds = this.getInbounds();
    const map = {};
    inbounds.forEach(i => {
      const key = i.contentTitle || i.contentId;
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  },

  getInboundByAngle() {
    const inbounds = this.getInbounds();
    const map = {};
    inbounds.forEach(i => {
      const key = i.clipAngle || 'Unknown';
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).sort((a,b) => b[1]-a[1]);
  },

  getScheduledThisWeek() {
    const now = new Date();
    const weekEnd = new Date(now); weekEnd.setDate(weekEnd.getDate() + 7);
    return this.getDists().filter(d => {
      const dd = new Date(d.date);
      return dd >= now && dd <= weekEnd && d.status === 'scheduled';
    });
  }
};
