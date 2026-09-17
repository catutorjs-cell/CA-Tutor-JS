// CA JS Social & Leaderboard Module
import { State } from '../state.js';

export const SocialModule = {
  leaderboardMode: 'points', // points, streaks
  searchQuery: '',
  isSyncing: false,

  render(container) {
    // 1. Gather all users list from State
    const list = State.getAllLeaderboardUsers();

    // Live sync all registered students from Google Sheet database
    if (!this.isSyncing) {
      this.isSyncing = true;
      State.syncUsersFromSheet().then(users => {
        this.isSyncing = false;
        if (users && users.length > 0 && container && document.body.contains(container)) {
          // Re-render leaderboard view with full 55+ students
          const newList = State.getAllLeaderboardUsers();
          if (newList.length !== list.length) {
            this.render(container);
          }
        }
      }).catch(err => {
        this.isSyncing = false;
        console.warn("Leaderboard sync note:", err);
      });
    }

    // 2. Sort depending on active mode
    if (this.leaderboardMode === 'points') {
      list.sort((a, b) => b.points - a.points);
    } else {
      list.sort((a, b) => b.streak - a.streak);
    }

    // Render ranks listing
    const rankRows = list.map((u, idx) => {
      const isMe = u.isMe || (State.user && u.id === State.user.userId);
      const medals = ["🥇", "🥈", "🥉"];
      const rankBadge = idx < 3 ? `<span style="font-size:18px;">${medals[idx]}</span>` : `<span class="rank-number" style="font-size:13px; font-weight:700; color:var(--text-muted); width:24px; text-align:center;">#${idx + 1}</span>`;
      
      const valueText = this.leaderboardMode === 'points' ? `${u.points} pts` : `${u.streak} days`;

      let followBtnHtml = '';
      if (isMe) {
        followBtnHtml = `<span style="font-size:11px; color:var(--pastel-purple-dark); font-weight:700; background:rgba(108,93,211,0.1); padding:4px 10px; border-radius:12px;">You</span>`;
      } else if (u.isFollowed) {
        followBtnHtml = `<button class="btn btn-secondary" style="padding: 4px 10px; font-size:11px; border-radius:10px; font-weight:600;" onclick="window.cajsToggleFollow('${u.id}')">✓ Following</button>`;
      } else {
        followBtnHtml = `<button class="btn btn-primary" style="padding: 4px 12px; font-size:11px; border-radius:10px; font-weight:700;" onclick="window.cajsToggleFollow('${u.id}')">+ Follow</button>`;
      }

      return `
        <div class="leaderboard-row ${isMe ? 'me' : ''}" style="display:flex; align-items:center; justify-content:space-between; padding:12px 18px; border-radius:14px; background:rgba(255,255,255,0.3); border:1px solid rgba(0,0,0,0.03); margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:12px; flex-grow:1;">
            ${rankBadge}
            <div class="leaderboard-details" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <div>
                <span class="leaderboard-name" style="font-weight:700; font-size:14px; font-family:var(--font-display);">${u.name}</span>
                <span class="badge badge-low" style="font-size:10px; padding:2px 8px; border-radius:10px; font-family:monospace; margin-left:6px; background:rgba(66,133,244,0.1); color:var(--pastel-blue-dark); font-weight:700;">${u.id}</span>
                <span style="font-size:11px; color:var(--text-muted); margin-left: 6px;">CA ${u.level}</span>
              </div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:16px;">
            <span class="leaderboard-points" style="font-weight:800; font-size:13.5px; font-family:var(--font-display); color:var(--pastel-purple-dark);">${valueText}</span>
            ${followBtnHtml}
          </div>
        </div>
      `;
    }).join('');

    // Followed Friends comparisons cards
    const followedFriends = list.filter(u => u.isFollowed && !u.isMe);
    const comparisonCards = followedFriends.length > 0 ? followedFriends.map(friend => `
      <div class="glass-card" style="margin-bottom:15px; display:flex; flex-direction:column; gap:12px; padding:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h4 style="font-size:15px; font-weight:700; margin:0; font-family:var(--font-display);">${friend.name}</h4>
            <span style="font-size:10px; color:var(--pastel-blue-dark); font-family:monospace; font-weight:700;">${friend.id} &bull; CA ${friend.level}</span>
          </div>
          <button class="btn btn-danger" style="padding: 4px 10px; font-size:10.5px; border-radius:8px;" onclick="window.cajsToggleFollow('${friend.id}')">Unfollow</button>
        </div>
        
        <div class="social-stats-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:12px;">
          <div style="background:rgba(0,0,0,0.02); padding:8px 12px; border-radius:8px; display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Syllabus:</span>
            <strong>${friend.progress}%</strong>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:8px 12px; border-radius:8px; display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Tests:</span>
            <strong>${friend.tests} Solved</strong>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:8px 12px; border-radius:8px; display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Streak:</span>
            <strong>${friend.streak} Days</strong>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:8px 12px; border-radius:8px; display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Points:</span>
            <strong style="color:var(--pastel-purple-dark);">${friend.points} PTS</strong>
          </div>
        </div>
      </div>
    `).join('') : `
      <div class="glass-card" style="text-align:center; padding:30px; color:var(--text-muted); font-size:13px; font-style:italic; border-radius:18px;">
        You are not following any study friends yet. Click "+ Follow" next to any student in the leaderboard to follow them!
      </div>
    `;

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Leaderboard & Friends</h1>
          <span class="header-subtitle">Follow students by sequential CA IDs, compare study stats, and climb ranks</span>
        </div>
      </header>

      <div class="social-top">
        <!-- Left: Leaderboard rankings list -->
        <div>
          <!-- Tab toggles -->
          <div class="papers-tabs">
            <button class="papers-tab-btn ${this.leaderboardMode === 'points' ? 'active' : ''}" data-mode="points">Overall Points Ranks</button>
            <button class="papers-tab-btn ${this.leaderboardMode === 'streaks' ? 'active' : ''}" data-mode="streaks">Weekly Study Streaks</button>
          </div>

          <!-- Ranks Rows list -->
          <div class="leaderboard-list">
            ${rankRows}
          </div>
        </div>

        <!-- Right: Follow search & Followed list panels -->
        <div style="display:flex; flex-direction:column; gap:20px;">
          <!-- Friend Search Card -->
          <div class="glass-card" style="padding:20px;">
            <h3 class="header-branding" style="font-size:16px; margin-bottom:12px;">Search & Follow Student</h3>
            <form id="friend-search-form" style="display:flex; gap:8px;">
              <input class="form-input" type="text" id="friend-id-input" placeholder="Enter Student CA ID (e.g. CA-1002)" required style="padding:10px 14px; flex-grow:1; font-size:13px;">
              <button type="submit" class="btn btn-primary" style="padding: 10px 16px; font-size:12px; font-weight:700;">Follow</button>
            </form>
            <span style="font-size:11px; color:var(--text-muted); display:block; margin-top:8px; font-style:italic;">Tip: Search by sequential series CA ID like <strong>CA-1001</strong>, <strong>CA-1002</strong>, <strong>CA-1003</strong>...</span>
          </div>

          <!-- Friends Comparison Deck -->
          <div>
            <h3 class="header-branding" style="font-size:16px; margin-bottom:12px; padding-left: 5px;">Following (${followedFriends.length} Friends)</h3>
            ${comparisonCards}
          </div>
        </div>
      </div>
    `;

    // Bind tab clicks
    const tabBtns = container.querySelectorAll('.papers-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.leaderboardMode = e.target.getAttribute('data-mode');
        this.render(container);
      });
    });

    // Bind Friend Search form
    container.querySelector('#friend-search-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const searchVal = container.querySelector('#friend-id-input').value.trim().toUpperCase();
      if (searchVal === State.user.userId) {
        alert("You cannot follow yourself!");
        return;
      }

      const match = list.find(u => u.id.toUpperCase() === searchVal || u.name.toUpperCase().includes(searchVal));
      if (!match) {
        alert(`No student found matching "${searchVal}". Check the CA ID series number in the leaderboard list.`);
        return;
      }

      try {
        State.toggleFollowUser(match.id);
        if (window.cajsShowAlert) {
          window.cajsShowAlert("✨ Student Followed", `Now following ${match.name} (${match.id})!`, "success");
        } else {
          alert(`Now following ${match.name} (${match.id})!`);
        }
        this.render(container);
      } catch (err) {
        alert(err.message);
      }
    });

    // Globals
    window.cajsToggleFollow = (fId) => {
      try {
        State.toggleFollowUser(fId);
        this.render(container);
      } catch (err) {
        alert(err.message);
      }
    };
  }
};
