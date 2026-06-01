// CA JS Platform Owner Database Management Console
import { State } from '../state.js';

export const OwnerConsoleModule = {
  searchQuery: '',
  levelFilter: 'all',
  sortBy: 'date-desc', // date-desc, date-asc, name-asc, points-desc
  revealedPasswords: {}, // Format: { email: true }

  render(container) {
    const allUsers = { ...State.users };
    const userList = [];

    const formatTimeSpent = (mins) => {
      if (!mins) return '0 mins';
      if (mins < 60) return `${Math.round(mins)} mins`;
      const hrs = Math.floor(mins / 60);
      const remainingMins = Math.round(mins % 60);
      return remainingMins > 0 ? `${hrs}h ${remainingMins}m` : `${hrs}h`;
    };

    // Construct enriched user list with real study stats from localStorage
    for (const email in allUsers) {
      const u = allUsers[email];
      
      // Default fallback values
      let points = 100;
      let streak = 0;
      let completedCount = 0;
      let totalMinutes = 0;

      // Extract stats from local storage for each user prefix
      try {
        const rawStats = localStorage.getItem(`cajs_study_stats_${email}`);
        if (rawStats) {
          const stats = JSON.parse(rawStats);
          points = stats.points || 100;
          streak = stats.streak || 0;
          totalMinutes = stats.totalMinutes || 0;
        }

        const rawChapters = localStorage.getItem(`cajs_completed_chapters_${email}`);
        if (rawChapters) {
          const chapters = JSON.parse(rawChapters);
          completedCount = Object.keys(chapters).length;
        }
      } catch (e) {
        console.error("Failed to read user stats for", email, e);
      }

      userList.push({
        fullName: u.fullName || 'Anonymous student',
        email: u.email,
        phone: u.phone || 'N/A',
        examLevel: u.examLevel || 'Intermediate',
        password: u.password || '••••••',
        userId: u.userId || 'CA-STUDENT',
        role: u.role || 'student',
        registeredAt: u.registeredAt || new Date().toISOString(),
        points,
        streak,
        completedCount,
        totalMinutes
      });
    }

    // Apply filters
    let filteredList = userList.filter(u => {
      // Search term match
      const query = this.searchQuery.toLowerCase();
      const nameMatch = u.fullName.toLowerCase().includes(query);
      const emailMatch = u.email.toLowerCase().includes(query);
      const phoneMatch = u.phone.toLowerCase().includes(query);
      const idMatch = u.userId.toLowerCase().includes(query);
      
      const matchesSearch = nameMatch || emailMatch || phoneMatch || idMatch;

      // Level match
      const matchesLevel = this.levelFilter === 'all' || u.examLevel.toLowerCase() === this.levelFilter.toLowerCase();

      return matchesSearch && matchesLevel;
    });

    // Apply sorting
    if (this.sortBy === 'date-desc') {
      filteredList.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
    } else if (this.sortBy === 'date-asc') {
      filteredList.sort((a, b) => new Date(a.registeredAt) - new Date(b.registeredAt));
    } else if (this.sortBy === 'name-asc') {
      filteredList.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (this.sortBy === 'points-desc') {
      filteredList.sort((a, b) => b.points - a.points);
    }

    // Compute administrative database stats
    const totalUsersCount = userList.length;
    const studentUsersCount = userList.filter(u => u.role !== 'owner').length;
    const avgPoints = userList.length > 0 ? Math.round(userList.reduce((sum, u) => sum + u.points, 0) / userList.length) : 0;
    const maxStreak = userList.length > 0 ? Math.max(...userList.map(u => u.streak)) : 0;

    // Level distribution percentages
    const finalCount = userList.filter(u => u.examLevel === 'Final').length;
    const interCount = userList.filter(u => u.examLevel === 'Intermediate').length;
    const foundCount = userList.filter(u => u.examLevel === 'Foundation').length;

    // Render HTML structure
    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">👑 Platform Owner Console</h1>
          <span class="header-subtitle">Administrative dashboard to monitor all registered student accounts, streaks, and database statistics.</span>
        </div>
      </header>

      <!-- 1. Stats Panels -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <div class="glass-card" style="display: flex; align-items: center; gap: 16px; padding: 20px;">
          <div style="font-size: 32px; background: rgba(124, 58, 237, 0.08); padding: 12px; border-radius: 16px;">👥</div>
          <div>
            <h4 style="font-size: 20px; font-weight: 800; color: var(--pastel-purple-dark); margin: 0;">${studentUsersCount}</h4>
            <span style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Registered Students</span>
          </div>
        </div>

        <div class="glass-card" style="display: flex; align-items: center; gap: 16px; padding: 20px;">
          <div style="font-size: 32px; background: rgba(59, 130, 246, 0.08); padding: 12px; border-radius: 16px;">⚡</div>
          <div>
            <h4 style="font-size: 20px; font-weight: 800; color: var(--pastel-blue-dark); margin: 0;">${avgPoints} pts</h4>
            <span style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Average Points</span>
          </div>
        </div>

        <div class="glass-card" style="display: flex; align-items: center; gap: 16px; padding: 20px;">
          <div style="font-size: 32px; background: rgba(249, 115, 22, 0.08); padding: 12px; border-radius: 16px;">🔥</div>
          <div>
            <h4 style="font-size: 20px; font-weight: 800; color: var(--pastel-peach-dark); margin: 0;">${maxStreak} Days</h4>
            <span style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Highest active streak</span>
          </div>
        </div>

        <div class="glass-card" style="display: flex; flex-direction: column; gap: 6px; padding: 16px; justify-content: center;">
          <span style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Grade Distribution</span>
          <div style="display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--pastel-purple-dark); font-weight: 600;">CA Final:</span>
              <strong>${finalCount} students</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--pastel-blue-dark); font-weight: 600;">CA Inter:</span>
              <strong>${interCount} students</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--pastel-green-dark); font-weight: 600;">CA Foundation:</span>
              <strong>${foundCount} students</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Controls and Search -->
      <div class="glass-card" style="padding: 20px; margin-bottom: 25px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
        <div style="display: flex; flex-grow: 1; min-width: 280px; gap: 8px;">
          <input class="form-input" type="text" id="admin-search-input" placeholder="🔍 Search by Name, Email, Phone, or CA-ID..." value="${this.searchQuery}" style="padding: 10px 14px; font-size: 13px; flex-grow: 1;">
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 12px; font-weight: 700; color: var(--text-muted);">Grade:</span>
            <select class="form-select" id="admin-filter-level" style="padding: 8px 12px; font-size: 12.5px; border-radius: 10px;">
              <option value="all" ${this.levelFilter === 'all' ? 'selected' : ''}>All Levels</option>
              <option value="final" ${this.levelFilter === 'final' ? 'selected' : ''}>CA Final</option>
              <option value="intermediate" ${this.levelFilter === 'intermediate' ? 'selected' : ''}>CA Intermediate</option>
              <option value="foundation" ${this.levelFilter === 'foundation' ? 'selected' : ''}>CA Foundation</option>
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 12px; font-weight: 700; color: var(--text-muted);">Sort By:</span>
            <select class="form-select" id="admin-sort-by" style="padding: 8px 12px; font-size: 12.5px; border-radius: 10px;">
              <option value="date-desc" ${this.sortBy === 'date-desc' ? 'selected' : ''}>Date: Newest First</option>
              <option value="date-asc" ${this.sortBy === 'date-asc' ? 'selected' : ''}>Date: Oldest First</option>
              <option value="name-asc" ${this.sortBy === 'name-asc' ? 'selected' : ''}>Name: A-Z</option>
              <option value="points-desc" ${this.sortBy === 'points-desc' ? 'selected' : ''}>Points: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. Users Table list -->
      <div class="glass-card" style="padding: 0; overflow: hidden; border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.06);">
        <div style="overflow-x: auto; width: 100%;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
            <thead>
              <tr style="background: rgba(108, 93, 211, 0.05); border-bottom: 1px solid rgba(0,0,0,0.06); font-family: var(--font-display); font-weight: 700;">
                <th style="padding: 16px 20px;">Student Profile</th>
                <th style="padding: 16px 20px;">Contact Details</th>
                <th style="padding: 16px 20px;">Secure Password</th>
                <th style="padding: 16px 20px; text-align: center;">Study Points</th>
                <th style="padding: 16px 20px; text-align: center;">Chapters / Streak / Time</th>
                <th style="padding: 16px 20px;">Registered Date</th>
                <th style="padding: 16px 20px; text-align: right;">Manage Actions</th>
              </tr>
            </thead>
            <tbody id="admin-users-table-body">
              ${filteredList.length === 0 ? `
                <tr>
                  <td colspan="7" style="padding: 40px; text-align: center; color: var(--text-muted); font-style: italic;">
                    No registered user accounts match your active search terms or filters.
                  </td>
                </tr>
              ` : filteredList.map(u => {
                const isOwner = u.role === 'owner';
                const regDate = new Date(u.registeredAt).toLocaleDateString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });
                
                const levelColor = u.examLevel === 'Final' ? 'var(--pastel-rose-dark)' : (u.examLevel === 'Intermediate' ? 'var(--pastel-purple-dark)' : 'var(--pastel-blue-dark)');
                const levelBg = u.examLevel === 'Final' ? 'var(--pastel-rose)' : (u.examLevel === 'Intermediate' ? 'var(--pastel-purple)' : 'var(--pastel-blue)');
                
                const passwordRevealed = this.revealedPasswords[u.email];
                const passwordText = passwordRevealed ? u.password : '••••••';

                return `
                  <tr style="border-bottom: 1px solid rgba(0,0,0,0.04); transition: all 0.2s; vertical-align: middle;" class="admin-table-row">
                    <!-- Student Profile -->
                    <td style="padding: 16px 20px;">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: ${isOwner ? 'var(--pastel-purple)' : 'var(--pastel-blue)'}; color: ${isOwner ? 'var(--pastel-purple-dark)' : 'var(--pastel-blue-dark)'}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
                          ${u.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div style="display: flex; flex-direction: column;">
                          <strong style="color: var(--text-main); font-size: 13.5px;">${u.fullName}</strong>
                          <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px;">
                            <span style="font-size: 9px; font-weight: 800; background: ${levelBg}; color: ${levelColor}; padding: 2px 8px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                              ${u.examLevel}
                            </span>
                            <span style="font-size: 10px; color: var(--text-muted); font-family: monospace;">${u.userId}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Contact Details -->
                    <td style="padding: 16px 20px;">
                      <div style="display: flex; flex-direction: column; font-size: 12px; gap: 2px;">
                        <span style="color: var(--text-main); font-weight: 500;">✉️ ${u.email}</span>
                        <span style="color: var(--text-muted);">📞 ${u.phone}</span>
                      </div>
                    </td>

                    <!-- Secure Password Toggle -->
                    <td style="padding: 16px 20px;">
                      <div style="display: inline-flex; align-items: center; gap: 8px; font-family: monospace; font-size: 13px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 6px;">
                        <span>${passwordText}</span>
                        <button class="password-reveal-btn" style="border: none; background: transparent; font-size: 12px; cursor: pointer; padding: 2px; outline: none; line-height: 1;" onclick="window.cajsToggleAdminPassword('${u.email}')" title="Toggle Password Visibility">
                          ${passwordRevealed ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                    </td>

                    <!-- Study Points -->
                    <td style="padding: 16px 20px; text-align: center;">
                      <strong style="color: var(--pastel-blue-dark); font-size: 14px;">⚡ ${u.points}</strong>
                    </td>

                    <!-- Chapters Completed / Streak / Time -->
                    <td style="padding: 16px 20px; text-align: center;">
                      <div style="display: flex; flex-direction: column; font-size: 12px; gap: 3px; align-items: center;">
                        <span style="font-weight: 600; color: var(--pastel-purple-dark);">📖 ${u.completedCount} chapters</span>
                        <span style="color: var(--pastel-peach-dark); font-weight: 700;">🔥 ${u.streak} Days streak</span>
                        <span style="color: var(--pastel-blue-dark); font-weight: 600;">⏱️ ${formatTimeSpent(u.totalMinutes)} study</span>
                      </div>
                    </td>

                    <!-- Registration Date -->
                    <td style="padding: 16px 20px; color: var(--text-muted); font-size: 11.5px;">
                      ${regDate}
                    </td>

                    <!-- Actions -->
                    <td style="padding: 16px 20px; text-align: right;">
                      <div style="display: inline-flex; gap: 8px; align-items: center;">
                        <button class="btn btn-success" style="padding: 6px 12px; font-size: 11px; border-radius: 8px;" onclick="window.cajsAdminRewardPoints('${u.email}')">
                          ⚡ +500 Pts
                        </button>
                        <span style="padding: 6px 12px; font-size: 11px; border-radius: 8px; background: var(--pastel-blue); color: var(--pastel-blue-dark); font-weight: 700; display: inline-flex; align-items: center; gap: 4px; font-family: var(--font-display);" title="Total Study Time">
                          ⏱️ ${formatTimeSpent(u.totalMinutes)}
                        </span>
                        <button class="btn btn-danger" style="padding: 6px 12px; font-size: 11px; border-radius: 8px; ${isOwner ? 'opacity: 0.3; cursor: not-allowed;' : ''}" ${isOwner ? 'disabled' : ''} onclick="window.cajsAdminDeleteUser('${u.email}')">
                          ❌ Delete
                        </button>
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

    // Inject hover row highlight helper style
    if (!document.getElementById('cajs-admin-table-styles')) {
      const style = document.createElement('style');
      style.id = 'cajs-admin-table-styles';
      style.innerHTML = `
        .admin-table-row:hover {
          background: rgba(108, 93, 211, 0.02) !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Bind Search Input
    const searchInput = container.querySelector('#admin-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        // Dynamic keypress table filter for instant reactivity (without full re-render!)
        this.reactiveFilterRows(container);
      });
    }

    // Bind Filter Dropdown
    const filterLevel = container.querySelector('#admin-filter-level');
    if (filterLevel) {
      filterLevel.addEventListener('change', (e) => {
        this.levelFilter = e.target.value;
        this.render(container);
      });
    }

    // Bind Sort Dropdown
    const sortDropdown = container.querySelector('#admin-sort-by');
    if (sortDropdown) {
      sortDropdown.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.render(container);
      });
    }

    // --- BIND GLOBALS FOR ONCLICK DELEGATIONS ---
    
    // 1. Toggle Password Visibility
    window.cajsToggleAdminPassword = (email) => {
      this.revealedPasswords[email] = !this.revealedPasswords[email];
      this.render(container);
    };

    // 2. Reward +500 points
    window.cajsAdminRewardPoints = (email) => {
      const u = State.users[email];
      if (!u) return;
      State.adminAddPointsToUser(email, 500);
      window.cajsShowAlert(
        "✨ Reward Successful",
        `Successfully rewarded +500 study points to <strong>${u.fullName}</strong>!`,
        "success"
      );
      this.render(container);
    };

    // 3. Edit Student Exam Grade Level
    window.cajsAdminEditLevel = (email, currentLevel) => {
      const u = State.users[email];
      if (!u) return;
      
      const newLevel = prompt(`Edit Exam Grade Level for ${u.fullName}:\n\nEnter "Foundation", "Intermediate", or "Final":`, currentLevel);
      if (newLevel === null) return; // cancelled
      
      const normalizedLevel = newLevel.trim().charAt(0).toUpperCase() + newLevel.trim().slice(1).toLowerCase();
      if (['Foundation', 'Intermediate', 'Final'].includes(normalizedLevel)) {
        State.adminChangeUserLevel(email, normalizedLevel);
        window.cajsShowAlert(
          "✨ Level Updated",
          `Successfully updated exam level for <strong>${u.fullName}</strong> to <strong>CA ${normalizedLevel}</strong>!`,
          "success"
        );
        this.render(container);
      } else {
        alert("Invalid exam level entered! Must be exactly 'Foundation', 'Intermediate', or 'Final'.");
      }
    };

    // 4. Delete Student Account completely
    window.cajsAdminDeleteUser = (email) => {
      const u = State.users[email];
      if (!u) return;
      if (email === 'owner@cajs.com') {
        alert("Cannot delete the platform owner admin account!");
        return;
      }
      
      const confirmDelete = confirm(`⚠️ DANGER ZONE ⚠️\n\nAre you absolutely sure you want to permanently delete student "${u.fullName}" (${email}) from the platform database?\n\nThis will completely purge all their chapter revisions, evaluations, points, and stored custom papers. This action CANNOT be undone!`);
      if (confirmDelete) {
        State.adminDeleteUser(email);
        window.cajsShowAlert(
          "🚨 Account Purged",
          `Student account <strong>${u.fullName}</strong> was successfully deleted and completely removed from the platform database.`,
          "error"
        );
        this.render(container);
      }
    };
  },

  reactiveFilterRows(container) {
    const query = this.searchQuery.toLowerCase();
    const rows = container.querySelectorAll('.admin-table-row');
    
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      if (text.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
};
