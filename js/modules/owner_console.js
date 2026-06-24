// CA JS Platform Owner Database Management Console
import { State } from '../state.js';
import { CONFIG } from '../config.js';

export const OwnerConsoleModule = {
  searchQuery: '',
  levelFilter: 'all',
  sortBy: 'date-desc',
  datePreset: 'all',
  startDateFilter: '',
  endDateFilter: '',
  hasShownWelcomePopup: false,
  revealedPasswords: {},
  liveUsers: null,
  isLoadingLive: false,

  async loadLiveUsers() {
    const syncUrl = localStorage.getItem('cajs_database_sync_url') || CONFIG.DEFAULT_SYNC_URL;
    if (!syncUrl) return null;
    try {
      const response = await fetch(syncUrl);
      const data = await response.json();
      return Array.isArray(data) ? data : null;
    } catch (e) {
      console.error("Failed to fetch live users from Google Sheet:", e);
      return null;
    }
  },

  render(container) {
    const syncUrl = localStorage.getItem('cajs_database_sync_url') || CONFIG.DEFAULT_SYNC_URL;
    if (syncUrl && !this.liveUsers && !this.isLoadingLive) {
      this.isLoadingLive = true;
      this.loadLiveUsers().then(users => {
        this.liveUsers = users;
        this.isLoadingLive = false;
        this.render(container);
      });
    }

    // Reload users from localStorage
    try {
      const rawUsers = localStorage.getItem('cajs_users_db');
      if (rawUsers) State.users = JSON.parse(rawUsers);
    } catch (e) {
      console.error("Failed to reload users:", e);
    }

    const allUsers = { ...State.users };

    // Merge live Google Sheets users
    if (this.liveUsers && this.liveUsers.length > 0) {
      this.liveUsers.forEach(u => {
        if (u.email && !allUsers[u.email]) {
          allUsers[u.email] = {
            fullName: u.fullName, email: u.email, phone: u.phone,
            examLevel: u.examLevel, password: u.password,
            userId: u.userId, registeredAt: u.registeredAt, role: 'student'
          };
        }
      });
    }

    const formatTimeSpent = (mins) => {
      if (!mins) return '0 mins';
      if (mins < 60) return `${Math.round(mins)} mins`;
      const hrs = Math.floor(mins / 60);
      const rem = Math.round(mins % 60);
      return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
    };

    // Build enriched user list
    const userList = [];
    for (const email in allUsers) {
      const u = allUsers[email];
      let points = 100, streak = 0, completedCount = 0, totalMinutes = 0;
      try {
        const rawStats = localStorage.getItem(`cajs_study_stats_${email}`);
        if (rawStats) {
          const stats = JSON.parse(rawStats);
          points = stats.points || 100;
          streak = stats.streak || 0;
          totalMinutes = stats.totalMinutes || 0;
        }
        const rawChapters = localStorage.getItem(`cajs_completed_chapters_${email}`);
        if (rawChapters) completedCount = Object.keys(JSON.parse(rawChapters)).length;
      } catch (e) { console.error("Stats read error for", email, e); }

      userList.push({
        fullName: u.fullName || 'Anonymous',
        email: u.email,
        phone: u.phone || 'N/A',
        examLevel: u.examLevel || 'Intermediate',
        password: u.password || '••••••',
        userId: u.userId || 'CA-STUDENT',
        role: u.role || 'student',
        registeredAt: u.registeredAt || new Date().toISOString(),
        points, streak, completedCount, totalMinutes
      });
    }

    // Filter
    let filteredList = userList.filter(u => {
      const q = this.searchQuery.toLowerCase();
      const matchesSearch = u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q) ||
        u.userId.toLowerCase().includes(q);
      const matchesLevel = this.levelFilter === 'all' ||
        u.examLevel.toLowerCase() === this.levelFilter.toLowerCase();
      let matchesDate = true;
      if (this.datePreset !== 'all') {
        const reg = u.registeredAt.split('T')[0];
        const today = new Date().toISOString().split('T')[0];
        if (this.datePreset === 'today') matchesDate = reg === today;
        else if (this.datePreset === 'yesterday') {
          const y = new Date(); y.setDate(y.getDate() - 1);
          matchesDate = reg === y.toISOString().split('T')[0];
        } else if (this.datePreset === '7days') {
          const d = new Date(); d.setDate(d.getDate() - 7);
          matchesDate = reg >= d.toISOString().split('T')[0];
        } else if (this.datePreset === '30days') {
          const d = new Date(); d.setDate(d.getDate() - 30);
          matchesDate = reg >= d.toISOString().split('T')[0];
        } else if (this.datePreset === 'custom') {
          if (this.startDateFilter) matchesDate = matchesDate && reg >= this.startDateFilter;
          if (this.endDateFilter) matchesDate = matchesDate && reg <= this.endDateFilter;
        }
      }
      return matchesSearch && matchesLevel && matchesDate;
    });

    // Sort
    if (this.sortBy === 'date-desc') filteredList.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
    else if (this.sortBy === 'date-asc') filteredList.sort((a, b) => new Date(a.registeredAt) - new Date(b.registeredAt));
    else if (this.sortBy === 'name-asc') filteredList.sort((a, b) => a.fullName.localeCompare(b.fullName));
    else if (this.sortBy === 'points-desc') filteredList.sort((a, b) => b.points - a.points);

    // Stats
    const studentUsersCount = userList.filter(u => u.role !== 'owner').length;
    const avgPoints = userList.length > 0 ? Math.round(userList.reduce((s, u) => s + u.points, 0) / userList.length) : 0;
    const maxStreak = userList.length > 0 ? Math.max(...userList.map(u => u.streak)) : 0;
    const finalCount = userList.filter(u => u.examLevel === 'Final').length;
    const interCount = userList.filter(u => u.examLevel === 'Intermediate').length;
    const foundCount = userList.filter(u => u.examLevel === 'Foundation').length;

    if (!this.hasShownWelcomePopup) {
      this.hasShownWelcomePopup = true;
      setTimeout(() => {
        window.cajsShowAlert?.("👥 Student Registrations",
          `Welcome back! There are currently <strong>${studentUsersCount}</strong> registered students.`, "success");
      }, 500);
    }

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">👑 Platform Owner Console</h1>
          <span class="header-subtitle">Administrative dashboard to monitor all registered student accounts and statistics.</span>
        </div>
      </header>

      <!-- Live Sync Card -->
      <div class="glass-card" style="padding:20px;margin-bottom:25px;border-color:rgba(16,185,129,0.15);display:flex;flex-direction:column;gap:12px;animation:fadeIn 0.3s ease-out;">
        <h4 style="font-size:14px;font-weight:700;color:var(--pastel-green-dark);margin:0;">🌐 Live Database Sync (Google Sheets)</h4>
        <p style="font-size:12.5px;color:var(--text-main);line-height:1.5;margin:0;">Connect a Google Sheet to collect all student registrations in one place.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
          <input class="form-input" type="text" id="admin-sync-url-input"
            placeholder="Paste your Google Apps Script Web App URL..."
            value="${localStorage.getItem('cajs_database_sync_url') || CONFIG.DEFAULT_SYNC_URL || ''}"
            style="padding:8px 12px;font-size:12.5px;flex-grow:1;min-width:280px;height:38px;">
          <button class="btn btn-primary" id="btn-save-sync-url" style="padding:8px 16px;font-size:12px;height:38px;background:var(--pastel-green-dark);border-color:var(--pastel-green-dark);color:white;font-weight:700;border-radius:10px;">Save Sync URL</button>
          <button class="btn btn-secondary" id="btn-show-sync-instructions" style="padding:8px 16px;font-size:12px;height:38px;font-weight:700;border-radius:10px;">Setup Instructions 📋</button>
          ${this.isLoadingLive ? `<span style="font-size:12px;color:var(--pastel-green-dark);font-weight:600;">🔄 Loading live data...</span>` : ''}
          ${syncUrl && !this.isLoadingLive ? `<button class="btn btn-secondary" id="btn-refresh-live" style="padding:6px 12px;font-size:11px;height:32px;border-radius:8px;font-weight:600;">🔄 Refresh</button>` : ''}
        </div>
      </div>

      <!-- Stats Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:30px;">
        <div class="glass-card" id="btn-stats-students-popup" style="display:flex;align-items:center;gap:16px;padding:20px;cursor:pointer;">
          <div style="font-size:32px;background:rgba(124,58,237,0.08);padding:12px;border-radius:16px;">👥</div>
          <div>
            <h4 style="font-size:20px;font-weight:800;color:var(--pastel-purple-dark);margin:0;">${studentUsersCount}</h4>
            <span style="font-size:11px;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Registered Students</span>
          </div>
        </div>

        <div class="glass-card" style="display:flex;align-items:center;gap:16px;padding:20px;">
          <div style="font-size:32px;background:rgba(59,130,246,0.08);padding:12px;border-radius:16px;">⚡</div>
          <div>
            <h4 style="font-size:20px;font-weight:800;color:var(--pastel-blue-dark);margin:0;">${avgPoints} pts</h4>
            <span style="font-size:11px;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Average Points</span>
          </div>
        </div>

        <div class="glass-card" style="display:flex;align-items:center;gap:16px;padding:20px;">
          <div style="font-size:32px;background:rgba(249,115,22,0.08);padding:12px;border-radius:16px;">🔥</div>
          <div>
            <h4 style="font-size:20px;font-weight:800;color:var(--pastel-peach-dark);margin:0;">${maxStreak} Days</h4>
            <span style="font-size:11px;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Highest Streak</span>
          </div>
        </div>

        <div class="glass-card" style="display:flex;flex-direction:column;gap:6px;padding:16px;justify-content:center;">
          <span style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Grade Distribution</span>
          <div style="font-size:11px;display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:var(--pastel-rose-dark);font-weight:600;">CA Final:</span><strong>${finalCount}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:var(--pastel-purple-dark);font-weight:600;">CA Inter:</span><strong>${interCount}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:var(--pastel-green-dark);font-weight:600;">CA Foundation:</span><strong>${foundCount}</strong></div>
          </div>
        </div>

        <!-- ✅ Send to Telegram Card -->
        <div class="glass-card" id="btn-send-telegram" style="display:flex;align-items:center;gap:16px;padding:20px;cursor:pointer;border-color:rgba(0,136,204,0.2);background:rgba(0,136,204,0.02);">
          <div style="font-size:32px;background:rgba(0,136,204,0.08);padding:12px;border-radius:16px;">✈️</div>
          <div>
            <h4 style="font-size:14px;font-weight:800;color:#0088cc;margin:0;">Send List to Telegram</h4>
            <span style="font-size:11px;color:var(--text-muted);font-weight:600;">Export ${studentUsersCount} students</span>
          </div>
        </div>

        <!-- ✅ Download CSV Card -->
        <div class="glass-card" id="btn-download-csv" style="display:flex;align-items:center;gap:16px;padding:20px;cursor:pointer;border-color:rgba(16,185,129,0.2);background:rgba(16,185,129,0.02);">
          <div style="font-size:32px;background:rgba(16,185,129,0.08);padding:12px;border-radius:16px;">📥</div>
          <div>
            <h4 style="font-size:14px;font-weight:800;color:var(--pastel-green-dark);margin:0;">Download CSV</h4>
            <span style="font-size:11px;color:var(--text-muted);font-weight:600;">Export as spreadsheet</span>
          </div>
        </div>
      </div>

      <!-- Search & Filter Controls -->
      <div class="glass-card" style="padding:20px;margin-bottom:25px;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;">
        <input class="form-input" type="text" id="admin-search-input"
          placeholder="🔍 Search by Name, Email, Phone, or CA-ID..."
          value="${this.searchQuery}"
          style="padding:10px 14px;font-size:13px;flex-grow:1;min-width:280px;">

        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:12px;font-weight:700;color:var(--text-muted);">Grade:</span>
            <select class="form-select" id="admin-filter-level" style="padding:8px 12px;font-size:12.5px;border-radius:10px;">
              <option value="all" ${this.levelFilter === 'all' ? 'selected' : ''}>All Levels</option>
              <option value="final" ${this.levelFilter === 'final' ? 'selected' : ''}>CA Final</option>
              <option value="intermediate" ${this.levelFilter === 'intermediate' ? 'selected' : ''}>CA Intermediate</option>
              <option value="foundation" ${this.levelFilter === 'foundation' ? 'selected' : ''}>CA Foundation</option>
            </select>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:12px;font-weight:700;color:var(--text-muted);">Registered:</span>
            <select class="form-select" id="admin-filter-date" style="padding:8px 12px;font-size:12.5px;border-radius:10px;">
              <option value="all" ${this.datePreset === 'all' ? 'selected' : ''}>All Time</option>
              <option value="today" ${this.datePreset === 'today' ? 'selected' : ''}>Today</option>
              <option value="yesterday" ${this.datePreset === 'yesterday' ? 'selected' : ''}>Yesterday</option>
              <option value="7days" ${this.datePreset === '7days' ? 'selected' : ''}>Last 7 Days</option>
              <option value="30days" ${this.datePreset === '30days' ? 'selected' : ''}>Last 30 Days</option>
              <option value="custom" ${this.datePreset === 'custom' ? 'selected' : ''}>Custom Range...</option>
            </select>
          </div>
          <div id="admin-custom-date-container" style="display:${this.datePreset === 'custom' ? 'flex' : 'none'};align-items:center;gap:8px;">
            <input class="form-input" type="date" id="admin-start-date" value="${this.startDateFilter}" style="padding:6px 10px;font-size:12px;border-radius:10px;width:130px;height:35px;">
            <span style="font-size:11px;color:var(--text-muted);">to</span>
            <input class="form-input" type="date" id="admin-end-date" value="${this.endDateFilter}" style="padding:6px 10px;font-size:12px;border-radius:10px;width:130px;height:35px;">
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:12px;font-weight:700;color:var(--text-muted);">Sort:</span>
            <select class="form-select" id="admin-sort-by" style="padding:8px 12px;font-size:12.5px;border-radius:10px;">
              <option value="date-desc" ${this.sortBy === 'date-desc' ? 'selected' : ''}>Newest First</option>
              <option value="date-asc" ${this.sortBy === 'date-asc' ? 'selected' : ''}>Oldest First</option>
              <option value="name-asc" ${this.sortBy === 'name-asc' ? 'selected' : ''}>Name A-Z</option>
              <option value="points-desc" ${this.sortBy === 'points-desc' ? 'selected' : ''}>Points High-Low</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="glass-card" style="padding:0;overflow:hidden;border-radius:20px;">
        <div style="overflow-x:auto;width:100%;">
          <table style="width:100%;border-collapse:collapse;text-align:left;font-size:13px;">
            <thead>
              <tr style="background:rgba(108,93,211,0.05);border-bottom:1px solid rgba(0,0,0,0.06);font-family:var(--font-display);font-weight:700;">
                <th style="padding:16px 20px;">Student Profile</th>
                <th style="padding:16px 20px;">Contact</th>
                <th style="padding:16px 20px;">Password</th>
                <th style="padding:16px 20px;text-align:center;">Points</th>
                <th style="padding:16px 20px;text-align:center;">Progress</th>
                <th style="padding:16px 20px;">Registered</th>
                <th style="padding:16px 20px;text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody id="admin-users-table-body">
              ${filteredList.length === 0 ? `
                <tr><td colspan="7" style="padding:40px;text-align:center;color:var(--text-muted);font-style:italic;">
                  No users match your filters.
                </td></tr>
              ` : filteredList.map(u => {
      const isOwner = u.role === 'owner';
      const regDate = new Date(u.registeredAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const levelColor = u.examLevel === 'Final' ? 'var(--pastel-rose-dark)' : u.examLevel === 'Intermediate' ? 'var(--pastel-purple-dark)' : 'var(--pastel-blue-dark)';
      const levelBg = u.examLevel === 'Final' ? 'var(--pastel-rose)' : u.examLevel === 'Intermediate' ? 'var(--pastel-purple)' : 'var(--pastel-blue)';
      const pwText = this.revealedPasswords[u.email] ? u.password : '••••••';
      return `
                  <tr style="border-bottom:1px solid rgba(0,0,0,0.04);vertical-align:middle;" class="admin-table-row">
                    <td style="padding:16px 20px;">
                      <div style="display:flex;align-items:center;gap:12px;">
                        <div style="width:36px;height:36px;border-radius:50%;background:${isOwner ? 'var(--pastel-purple)' : 'var(--pastel-blue)'};color:${isOwner ? 'var(--pastel-purple-dark)' : 'var(--pastel-blue-dark)'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;">${u.fullName.charAt(0).toUpperCase()}</div>
                        <div>
                          <strong style="color:var(--text-main);font-size:13.5px;">${u.fullName}</strong>
                          <div style="display:flex;align-items:center;gap:6px;margin-top:3px;">
                            <span style="font-size:9px;font-weight:800;background:${levelBg};color:${levelColor};padding:2px 8px;border-radius:12px;text-transform:uppercase;">${u.examLevel}</span>
                            <span style="font-size:10px;color:var(--text-muted);font-family:monospace;">${u.userId}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style="padding:16px 20px;">
                      <div style="font-size:12px;display:flex;flex-direction:column;gap:2px;">
                        <span>✉️ ${u.email}</span>
                        <span style="color:var(--text-muted);">📞 ${u.phone}</span>
                      </div>
                    </td>
                    <td style="padding:16px 20px;">
                      <div style="display:inline-flex;align-items:center;gap:8px;font-family:monospace;font-size:13px;background:rgba(0,0,0,0.03);padding:4px 8px;border-radius:6px;">
                        <span>${pwText}</span>
                        <button style="border:none;background:transparent;font-size:12px;cursor:pointer;" onclick="window.cajsToggleAdminPassword('${u.email}')">${this.revealedPasswords[u.email] ? '👁️' : '👁️‍🗨️'}</button>
                      </div>
                    </td>
                    <td style="padding:16px 20px;text-align:center;">
                      <strong style="color:var(--pastel-blue-dark);">⚡ ${u.points}</strong>
                    </td>
                    <td style="padding:16px 20px;text-align:center;">
                      <div style="font-size:12px;display:flex;flex-direction:column;gap:3px;align-items:center;">
                        <span style="color:var(--pastel-purple-dark);font-weight:600;">📖 ${u.completedCount} chapters</span>
                        <span style="color:var(--pastel-peach-dark);font-weight:700;">🔥 ${u.streak} days</span>
                        <span style="color:var(--pastel-blue-dark);font-weight:600;">⏱️ ${formatTimeSpent(u.totalMinutes)}</span>
                      </div>
                    </td>
                    <td style="padding:16px 20px;color:var(--text-muted);font-size:11.5px;">${regDate}</td>
                    <td style="padding:16px 20px;text-align:right;">
                      <div style="display:inline-flex;gap:8px;align-items:center;">
                        <button class="btn btn-success" style="padding:6px 12px;font-size:11px;border-radius:8px;" onclick="window.cajsAdminRewardPoints('${u.email}')">⚡ +500</button>
                        <button class="btn btn-danger" style="padding:6px 12px;font-size:11px;border-radius:8px;${isOwner ? 'opacity:0.3;cursor:not-allowed;' : ''}" ${isOwner ? 'disabled' : ''} onclick="window.cajsAdminDeleteUser('${u.email}')">❌ Delete</button>
                      </div>
                    </td>
                  </tr>
                `;
    }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // ── EVENT BINDINGS ────────────────────────────────────────────────────────

    container.querySelector('#admin-search-input')?.addEventListener('input', e => {
      this.searchQuery = e.target.value.trim();
      this.reactiveFilterRows(container);
    });

    container.querySelector('#admin-filter-level')?.addEventListener('change', e => {
      this.levelFilter = e.target.value;
      this.render(container);
    });

    container.querySelector('#admin-filter-date')?.addEventListener('change', e => {
      this.datePreset = e.target.value;
      this.render(container);
    });

    container.querySelector('#admin-start-date')?.addEventListener('change', e => {
      this.startDateFilter = e.target.value;
      this.render(container);
    });

    container.querySelector('#admin-end-date')?.addEventListener('change', e => {
      this.endDateFilter = e.target.value;
      this.render(container);
    });

    container.querySelector('#admin-sort-by')?.addEventListener('change', e => {
      this.sortBy = e.target.value;
      this.render(container);
    });

    container.querySelector('#btn-refresh-live')?.addEventListener('click', () => {
      this.liveUsers = null;
      this.render(container);
    });

    container.querySelector('#btn-stats-students-popup')?.addEventListener('click', () => {
      window.cajsShowAlert?.("👥 Students", `<strong>${studentUsersCount}</strong> registered students.`, "success");
    });

    // Save Sync URL
    container.querySelector('#btn-save-sync-url')?.addEventListener('click', () => {
      const urlVal = container.querySelector('#admin-sync-url-input')?.value.trim();
      if (urlVal) {
        if (!urlVal.startsWith('https://script.google.com/')) {
          alert("Invalid URL. Please enter a valid Google Apps Script Web App URL.");
          return;
        }
        localStorage.setItem('cajs_database_sync_url', urlVal);
        this.liveUsers = null;
        window.cajsShowAlert("✅ Saved", "Sync URL saved!", "success", () => this.render(container));
      } else {
        localStorage.removeItem('cajs_database_sync_url');
        this.liveUsers = null;
        window.cajsShowAlert("Removed", "Sync URL removed.", "info", () => this.render(container));
      }
    });

    // Setup Instructions
    container.querySelector('#btn-show-sync-instructions')?.addEventListener('click', () => {
      const scriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  if (data.action === 'register') {
    sheet.appendRow([data.user.registeredAt, data.user.fullName, data.user.email, data.user.phone, data.user.examLevel, data.user.userId]);
    return ContentService.createTextOutput(JSON.stringify({status:'success'})).setMimeType(ContentService.MimeType.JSON);
  }
}
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var users = [];
  for (var i = 1; i < rows.length; i++) {
    users.push({registeredAt:rows[i][0],fullName:rows[i][1],email:rows[i][2],phone:rows[i][3],examLevel:rows[i][4],userId:rows[i][5]});
  }
  return ContentService.createTextOutput(JSON.stringify(users)).setMimeType(ContentService.MimeType.JSON);
}`;
      const modal = document.createElement('div');
      modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;z-index:10009;padding:20px;`;
      modal.innerHTML = `
        <div class="glass-card" style="width:100%;max-width:560px;max-height:90vh;overflow-y:auto;padding:28px;border-radius:24px;background:white;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid rgba(0,0,0,0.06);padding-bottom:12px;">
            <h3 style="font-size:16px;font-weight:700;margin:0;color:var(--pastel-green-dark);">📊 Google Sheets Setup</h3>
            <button id="close-instr" style="background:none;border:none;font-size:22px;cursor:pointer;">&times;</button>
          </div>
          <ol style="font-size:12.5px;line-height:1.7;padding-left:18px;color:var(--text-main);">
            <li>Create a new <strong>Google Sheet</strong></li>
            <li>Add headers: Registered At, Full Name, Email, Phone, Exam Level, User ID</li>
            <li>Go to <strong>Extensions → Apps Script</strong></li>
            <li>Paste the code below</li>
            <li>Click <strong>Deploy → New Deployment → Web App</strong></li>
            <li>Set access to <strong>"Anyone"</strong> → Deploy → Copy URL</li>
            <li>Paste URL in the Sync URL field above</li>
          </ol>
          <div style="position:relative;margin-top:12px;">
            <textarea readonly id="script-code-ta" style="width:100%;height:150px;font-family:monospace;font-size:11px;padding:10px;border-radius:10px;border:1px solid rgba(0,0,0,0.1);background:rgba(0,0,0,0.02);resize:none;box-sizing:border-box;">${scriptCode}</textarea>
            <button id="copy-script" class="btn btn-secondary" style="position:absolute;bottom:10px;right:10px;padding:4px 10px;font-size:11px;border-radius:8px;">Copy 📋</button>
          </div>
          <button id="close-instr-ok" class="btn btn-primary" style="width:100%;margin-top:14px;padding:10px;border-radius:12px;font-weight:700;">Got it!</button>
        </div>`;
      document.body.appendChild(modal);
      modal.querySelector('#close-instr').addEventListener('click', () => modal.remove());
      modal.querySelector('#close-instr-ok').addEventListener('click', () => modal.remove());
      modal.querySelector('#copy-script').addEventListener('click', () => {
        modal.querySelector('#script-code-ta').select();
        document.execCommand('copy');
        modal.querySelector('#copy-script').textContent = 'Copied ✓';
      });
    });

    // ✅ Send to Telegram
    container.querySelector('#btn-send-telegram')?.addEventListener('click', async () => {
      const token = CONFIG.TELEGRAM_TOKEN;
      const chatId = CONFIG.TELEGRAM_CHAT_ID;
      const students = userList.filter(u => u.role !== 'owner');

      if (!token || !chatId) {
        window.cajsShowAlert("❌ Error", "Telegram token or chat ID missing in config.js", "error");
        return;
      }
      if (students.length === 0) {
        window.cajsShowAlert("No Students", "No registered students found.", "info");
        return;
      }

      window.cajsShowAlert("📤 Sending...", "Sending student list to Telegram...", "info");

      // Send in chunks of 20 to avoid Telegram message limit
      const chunkSize = 20;
      for (let i = 0; i < students.length; i += chunkSize) {
        const chunk = students.slice(i, i + chunkSize);
        let msg = `📋 <b>CA TUTOR JS — Students (${i + 1}-${Math.min(i + chunkSize, students.length)} of ${students.length})</b>\n━━━━━━━━━━━━━━━\n\n`;
        chunk.forEach((u, j) => {
          msg += `${i + j + 1}. <b>${u.fullName}</b>\n`;
          msg += `📧 ${u.email}\n`;
          msg += `📞 ${u.phone}\n`;
          msg += `🎓 CA ${u.examLevel} | 🆔 ${u.userId}\n`;
          msg += `📅 ${new Date(u.registeredAt).toLocaleDateString('en-IN')}\n\n`;
        });

        try {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'HTML' })
          });
        } catch (err) {
          console.error('Telegram send failed:', err);
        }
      }

      window.cajsShowAlert("✅ Sent!", `Full student list (${students.length} students) sent to your Telegram!`, "success");
    });

    // ✅ Download CSV
    container.querySelector('#btn-download-csv')?.addEventListener('click', () => {
      const students = userList.filter(u => u.role !== 'owner');
      if (students.length === 0) {
        window.cajsShowAlert("No Data", "No students to export.", "info");
        return;
      }
      const rows = [['Name', 'Email', 'Phone', 'Level', 'UserID', 'Registered', 'Points', 'Streak', 'Chapters']];
      students.forEach(u => {
        rows.push([u.fullName, u.email, u.phone, u.examLevel, u.userId,
        new Date(u.registeredAt).toLocaleDateString('en-IN'),
        u.points, u.streak, u.completedCount]);
      });
      const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `CA_TUTOR_JS_Students_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.cajsShowAlert("✅ Downloaded", `${students.length} students exported as CSV!`, "success");
    });

    // Global handlers
    window.cajsToggleAdminPassword = (email) => {
      this.revealedPasswords[email] = !this.revealedPasswords[email];
      this.render(container);
    };

    window.cajsAdminRewardPoints = (email) => {
      const u = State.users[email];
      if (!u) return;
      State.adminAddPointsToUser(email, 500);
      window.cajsShowAlert("✅ Rewarded", `+500 points added to <strong>${u.fullName}</strong>!`, "success");
      this.render(container);
    };

    window.cajsAdminDeleteUser = (email) => {
      const u = State.users[email];
      if (!u) return;
      if (email === 'owner@cajs.com') { alert("Cannot delete owner account!"); return; }
      window.cajsShowConfirm(
        "⚠️ Delete Student",
        `Permanently delete <strong>${u.fullName}</strong> (${email})? This cannot be undone!`,
        () => {
          State.adminDeleteUser(email);
          window.cajsShowAlert("🚨 Deleted", `<strong>${u.fullName}</strong> removed from platform.`, "error");
          this.render(container);
        }
      );
    };
  },

  reactiveFilterRows(container) {
    const q = this.searchQuery.toLowerCase();
    container.querySelectorAll('.admin-table-row').forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
  }
};