// CA JS Social & Leaderboard Module
import { State } from '../state.js';

export const SocialModule = {
  leaderboardMode: 'points', // points, streaks
  searchQuery: '',

  render(container) {
    // 1. Gather all users list
    const list = [...State.friends];
    const userInList = list.find(u => u.id === State.user.userId);
    
    if (!userInList) {
      list.push({
        id: State.user.userId,
        name: State.user.fullName + " (You)",
        points: State.studyStats.points,
        streak: State.studyStats.streak,
        level: State.user.examLevel,
        progress: this.calculateUserProgress(),
        tests: State.papers.length,
        isFollowed: false
      });
    } else {
      userInList.points = State.studyStats.points;
      userInList.streak = State.studyStats.streak;
      userInList.name = State.user.fullName + " (You)";
      userInList.progress = this.calculateUserProgress();
      userInList.tests = State.papers.length;
    }

    // 2. Sort depending on active mode
    if (this.leaderboardMode === 'points') {
      list.sort((a, b) => b.points - a.points);
    } else {
      list.sort((a, b) => b.streak - a.streak);
    }

    // Render ranks listing
    const rankRows = list.map((u, idx) => {
      const isMe = u.id === State.user.userId;
      const medals = ["🥇", "🥈", "🥉"];
      const rankBadge = idx < 3 ? `<span style="font-size:18px;">${medals[idx]}</span>` : `<span class="rank-number">${idx + 1}</span>`;
      
      const valueText = this.leaderboardMode === 'points' ? `${u.points} pts` : `${u.streak} days`;

      return `
        <div class="leaderboard-row ${isMe ? 'me' : ''}">
          ${rankBadge}
          <div class="leaderboard-details">
            <div>
              <span class="leaderboard-name">${u.name}</span>
              <span style="font-size:10px; color:var(--text-muted); margin-left: 8px;">CA ${u.level}</span>
            </div>
            <span class="leaderboard-points">${valueText}</span>
          </div>
        </div>
      `;
    }).join('');

    // Followed Friends comparisons cards
    const followedFriends = list.filter(u => u.isFollowed && u.id !== State.user.userId);
    const comparisonCards = followedFriends.length > 0 ? followedFriends.map(friend => `
      <div class="glass-card" style="margin-bottom:15px; display:flex; flex-direction:column; gap:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h4 style="font-size:15px; font-weight:bold;">${friend.name}</h4>
          <button class="btn btn-danger" style="padding: 4px 8px; font-size:10px;" onclick="window.cajsUnfollow('${friend.id}')">Unfollow</button>
        </div>
        
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:12px;">
          <div style="background:rgba(0,0,0,0.02); padding:8px; border-radius:8px; display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Syllabus:</span>
            <strong>${friend.progress}%</strong>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:8px; border-radius:8px; display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Tests:</span>
            <strong>${friend.tests} Solved</strong>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:8px; border-radius:8px; display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Streak:</span>
            <strong>${friend.streak} Days</strong>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:8px; border-radius:8px; display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Points:</span>
            <strong>${friend.points} PTS</strong>
          </div>
        </div>
      </div>
    `).join('') : `
      <div class="glass-card" style="text-align:center; padding:30px; color:var(--text-muted); font-size:13px; font-style:italic;">
        You are not following any study friends yet. Search and follow them below!
      </div>
    `;

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Network & Friends</h1>
          <span class="header-subtitle">Follow friends, build study groups, and compare progress</span>
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
          <div class="glass-card">
            <h3 class="header-branding" style="font-size:16px; margin-bottom:12px;">Add Study Partner</h3>
            <form id="friend-search-form" style="display:flex; gap:8px;">
              <input class="form-input" type="text" id="friend-id-input" placeholder="Search User ID (e.g. CA-48210)" required style="padding:10px; flex-grow:1;">
              <button type="submit" class="btn btn-primary" style="padding: 10px 14px; font-size:12px;">Follow</button>
            </form>
            <span style="font-size:10px; color:var(--text-muted); display:block; margin-top:6px; font-style:italic;">Tip: Try searching for "CA-48210" or "CA-95281"!</span>
          </div>

          <!-- Friends Comparison Deck -->
          <div>
            <h3 class="header-branding" style="font-size:16px; margin-bottom:10px; padding-left: 5px;">Following (Your Friends)</h3>
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
      
      const searchVal = container.querySelector('#friend-id-input').value.trim();
      if (searchVal === State.user.userId) {
        alert("You cannot follow yourself!");
        return;
      }

      try {
        State.followFriend(searchVal);
        alert(`Successfully followed partner: ${searchVal}!`);
        this.render(container);
      } catch (err) {
        alert(err.message);
      }
    });

    // Globals
    window.cajsUnfollow = (fId) => {
      State.followFriend(fId);
      this.render(container);
    };
  },

  calculateUserProgress() {
    // Repeated from dashboard logic for sync
    const level = State.user.examLevel;
    const subjects = State.completedChapters;
    // Mock simple percent estimation for seed user equivalence
    let count = Object.keys(subjects).length;
    if (level === 'Intermediate') return Math.round((count / 9) * 100);
    if (level === 'Final') return Math.round((count / 4) * 100);
    return Math.round((count / 7) * 100);
  }
};
