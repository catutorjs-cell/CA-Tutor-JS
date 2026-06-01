// CA JS Profile Editor Module
import { State } from '../state.js';

export const ProfileModule = {
  generatedOtp: null,
  isOtpVerified: false,
  otpCountdown: 0,
  otpInterval: null,
  passGeneratedOtp: null,
  isPassOtpVerified: false,
  passOtpCountdown: 0,
  passOtpInterval: null,
  activeNetworkTab: 'following',

  render(container) {
    const user = State.user;
    if (!user) {
      container.innerHTML = `
        <div class="glass-card" style="text-align:center; padding:50px; color:var(--text-muted);">
          Please login to edit your student profile.
        </div>
      `;
      return;
    }

    this.resetOtpState();

    this.activeNetworkTab = this.activeNetworkTab || 'following';

    // Gather Following & Followers list
    const following = State.friends.filter(f => f.isFollowed);
    const followers = State.friends.filter(f => f.isFollower);
    const followingCount = following.length;
    const followersCount = followers.length;

    const followingRows = following.length > 0 ? following.map(f => `
      <div class="room-tile" style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:rgba(255,255,255,0.4); border:1px solid rgba(0,0,0,0.03); border-radius:10px; font-size:12px; margin-bottom:6px; transition: var(--transition-smooth); text-align:left;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:16px;">🎓</span>
          <div style="display:flex; flex-direction:column; text-align:left;">
            <strong style="color:var(--text-main); font-size:13px;">${f.name}</strong>
            <span style="font-size:10px; color:var(--text-muted);">CA ${f.level} • ID: ${f.id}</span>
          </div>
        </div>
        <button class="btn btn-danger" style="padding:4px 8px; font-size:10px; border-radius:6px; border:none; cursor:pointer;" onclick="window.cajsProfileFollowToggle('${f.id}')">Unfollow</button>
      </div>
    `).join('') : `<p style="font-size:11px; color:var(--text-muted); font-style:italic; text-align:center; padding:15px 0;">You aren't following anyone yet.</p>`;

    const followersRows = followers.length > 0 ? followers.map(f => {
      const isFollowedBack = f.isFollowed;
      const actionBtn = isFollowedBack 
        ? `<span style="font-size:10px; color:var(--pastel-green-dark); font-weight:bold; background:rgba(179,240,201,0.3); padding:3px 6px; border-radius:6px; display:inline-flex; align-items:center; gap:3px;">Friends 🤝</span>`
        : `<button class="btn btn-primary" style="padding:4px 8px; font-size:10px; border-radius:6px; border:none; cursor:pointer;" onclick="window.cajsProfileFollowToggle('${f.id}')">+ Follow Back</button>`;

      return `
        <div class="room-tile" style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:rgba(255,255,255,0.4); border:1px solid rgba(0,0,0,0.03); border-radius:10px; font-size:12px; margin-bottom:6px; transition: var(--transition-smooth); text-align:left;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:16px;">👩‍🎓</span>
            <div style="display:flex; flex-direction:column; text-align:left;">
              <strong style="color:var(--text-main); font-size:13px;">${f.name}</strong>
              <span style="font-size:10px; color:var(--text-muted);">CA ${f.level} • ID: ${f.id}</span>
            </div>
          </div>
          ${actionBtn}
        </div>
      `;
    }).join('') : `<p style="font-size:11px; color:var(--text-muted); font-style:italic; text-align:center; padding:15px 0;">No followers yet.</p>`;

    const networkCardHtml = `
      <div class="glass-card" style="padding: 24px; display:flex; flex-direction:column; gap:12px; border: var(--glass-border); box-shadow: 0 8px 32px rgba(0,0,0,0.03);">
        <h3 class="header-branding" style="font-size: 16px; margin-bottom: 2px; display:flex; align-items:center; gap:8px; text-align:left; color: var(--pastel-purple-dark);">
          <span>👥</span> Study Network & Followers
        </h3>
        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 5px; text-align:left; line-height:1.4;">
          Manage your CA study circle. Follow friends back to study together in Custom Pomodoro rooms!
        </p>

        <!-- Network Tabs -->
        <div class="papers-tabs" style="gap: 5px; margin-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 5px; display:flex; justify-content:flex-start;">
          <button class="papers-tab-btn ${this.activeNetworkTab === 'following' ? 'active' : ''}" id="btn-net-tab-following" style="font-size:12px; padding:6px 12px; border:none; background:transparent; cursor:pointer;">
            Following (${followingCount})
          </button>
          <button class="papers-tab-btn ${this.activeNetworkTab === 'followers' ? 'active' : ''}" id="btn-net-tab-followers" style="font-size:12px; padding:6px 12px; border:none; background:transparent; cursor:pointer;">
            Followers (${followersCount})
          </button>
        </div>

        <!-- Network List Area -->
        <div style="max-height: 180px; overflow-y: auto; padding-right: 2px;">
          ${this.activeNetworkTab === 'following' ? followingRows : followersRows}
        </div>

        <!-- Add Friend Form -->
        <form id="profile-net-add-form" style="display:flex; gap:6px; margin-top:10px; border-top:1px solid rgba(0,0,0,0.05); padding-top:12px;">
          <input class="form-input" type="text" id="net-add-id" placeholder="Enter User ID (e.g. CA-74921)" required style="padding:8px; font-size:11px; flex-grow:1; border-radius:8px; border:1px solid rgba(0,0,0,0.1); background:rgba(0,0,0,0.02); outline:none; box-sizing:border-box;">
          <button type="submit" class="btn btn-primary" style="padding:8px 14px; font-size:11px; border-radius:8px; border:none; cursor:pointer;">Follow</button>
        </form>
        <span style="font-size:10px; color:var(--text-muted); display:block; margin-top:2px; font-style:italic; text-align:left;">Tip: Try following "CA-74921" or "CA-48210"!</span>
      </div>
    `;

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Edit Student Profile</h1>
          <span class="header-subtitle">Update your personal credentials, manage security verification, and set your CA Exam Level</span>
        </div>
      </header>

      <div class="profile-container" style="display:grid; grid-template-columns: 1.5fr 1fr; gap: 24px; align-items: start; animation: fadeIn 0.3s ease-out;">
        <!-- Left Column: Main Editor Form -->
        <div class="glass-card" style="padding: 28px;">
          <h3 class="header-branding" style="font-size: 18px; margin-bottom: 20px; display:flex; align-items:center; gap:8px;">
            <span>👤</span> Personal Details
          </h3>
          
          <form id="profile-editor-form">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" for="prof-name">Full Name</label>
                <input class="form-input" type="text" id="prof-name" value="${user.fullName}" required placeholder="Your Name">
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-level">CA Exam Level</label>
                <select class="form-select" id="prof-level" required>
                  <option value="Foundation" ${user.examLevel === 'Foundation' ? 'selected' : ''}>Foundation</option>
                  <option value="Intermediate" ${user.examLevel === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                  <option value="Final" ${user.examLevel === 'Final' ? 'selected' : ''}>Final</option>
                </select>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div class="form-group">
                <label class="form-label" for="prof-email">Email ID (Username)</label>
                <input class="form-input" type="email" id="prof-email" value="${user.email}" required placeholder="name@domain.com">
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-phone">Phone Number</label>
                <input class="form-input" type="tel" id="prof-phone" value="${user.phone}" required placeholder="9876543210">
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" for="prof-gender">Gender Identity</label>
                <select class="form-select" id="prof-gender" required>
                  <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Female 👩‍🎓</option>
                  <option value="male" ${user.gender === 'male' ? 'selected' : ''}>Male 👨‍🎓</option>
                </select>
                <p style="font-size: 11px; color: var(--text-muted); margin-top: 5px;">This determines your study avatar and background themes.</p>
              </div>
            </div>

            <!-- OTP Verification Section (Hidden by default, shown if Phone or Email changes) -->
            <div id="prof-otp-section" style="display: none; background: rgba(0,0,0,0.02); border: 1px dashed var(--pastel-purple-dark); padding: 16px; border-radius: 16px; margin: 15px 0; animation: fadeIn 0.3s ease-out;">
              <span style="font-size: 12px; font-weight: 700; color: var(--pastel-purple-dark); display: block; margin-bottom: 8px;">
                🔐 Profile Security Verification Required
              </span>
              <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
                You are updating critical contact details (Phone/Email). Verify your identity.
              </p>
              <div style="display: flex; gap: 12px; align-items: end;">
                <div class="form-group" style="margin-bottom: 0; flex-grow: 1;">
                  <label class="form-label" for="prof-otp">Enter 4-Digit OTP</label>
                  <input class="form-input" type="text" id="prof-otp" placeholder="Code" maxlength="4" disabled>
                </div>
                <button type="button" class="btn btn-secondary" id="btn-prof-send-otp" style="padding: 11px 18px; font-size: 12px; height: 43px;">
                  Send OTP
                </button>
              </div>
              <span id="prof-otp-feedback" style="font-size: 11px; margin-top: 4px; display: block;"></span>
            </div>

            <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.05); margin: 25px 0;">

            <h3 class="header-branding" style="font-size: 16px; margin-bottom: 15px; display:flex; align-items:center; gap:8px;">
              <span>🖼️</span> Profile Picture Selection
            </h3>
            
            <div class="avatar-selector-section" style="margin-bottom: 25px;">
              <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
                Choose how you want to represent yourself in the study portal. You can pick the initials color fallback, select a premium 3D avatar, or upload your own photo!
              </p>
              
              <div class="avatar-types" style="display: flex; gap: 12px; margin-bottom: 16px;">
                <label style="flex: 1; padding: 10px 14px; background: rgba(255,255,255,0.4); border: var(--glass-border); border-radius: 12px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: var(--transition-smooth); user-select: none;">
                  <input type="radio" name="avatar-type" value="letter" style="accent-color: var(--pastel-purple-dark);">
                  <span>🔤 Initials</span>
                </label>
                <label style="flex: 1; padding: 10px 14px; background: rgba(255,255,255,0.4); border: var(--glass-border); border-radius: 12px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: var(--transition-smooth); user-select: none;">
                  <input type="radio" name="avatar-type" value="preset" style="accent-color: var(--pastel-purple-dark);">
                  <span>✨ Premium 3D</span>
                </label>
                <label style="flex: 1; padding: 10px 14px; background: rgba(255,255,255,0.4); border: var(--glass-border); border-radius: 12px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: var(--transition-smooth); user-select: none;">
                  <input type="radio" name="avatar-type" value="upload" style="accent-color: var(--pastel-purple-dark);">
                  <span>📷 Custom Upload</span>
                </label>
              </div>

              <!-- Preset Grid Panel -->
              <div id="avatar-presets-panel" style="display: none; background: rgba(255,255,255,0.2); padding: 16px; border-radius: 16px; border: var(--glass-border); margin-top: 12px; animation: fadeIn 0.3s ease-out;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 10px;">Select Premium Avatar</span>
                <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;">
                  <div class="preset-avatar-option" data-path="./assets/avatars/avatar_dev_f.jpg" style="aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: var(--transition-smooth); position: relative; background: white;">
                    <img src="./assets/avatars/avatar_dev_f.jpg" style="width:100%; height:100%; object-fit:cover;" title="Developer Female">
                  </div>
                  <div class="preset-avatar-option" data-path="./assets/avatars/avatar_dev_m.jpg" style="aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: var(--transition-smooth); position: relative; background: white;">
                    <img src="./assets/avatars/avatar_dev_m.jpg" style="width:100%; height:100%; object-fit:cover;" title="Developer Male">
                  </div>
                  <div class="preset-avatar-option" data-path="./assets/avatars/avatar_prof_f.jpg" style="aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: var(--transition-smooth); position: relative; background: white;">
                    <img src="./assets/avatars/avatar_prof_f.jpg" style="width:100%; height:100%; object-fit:cover;" title="Corporate Female">
                  </div>
                  <div class="preset-avatar-option" data-path="./assets/avatars/avatar_prof_m.jpg" style="aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: var(--transition-smooth); position: relative; background: white;">
                    <img src="./assets/avatars/avatar_prof_m.jpg" style="width:100%; height:100%; object-fit:cover;" title="Corporate Male">
                  </div>
                  <div class="preset-avatar-option" data-path="./assets/avatars/avatar_grad_f.jpg" style="aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: var(--transition-smooth); position: relative; background: white;">
                    <img src="./assets/avatars/avatar_grad_f.jpg" style="width:100%; height:100%; object-fit:cover;" title="Graduate Female">
                  </div>
                  <div class="preset-avatar-option" data-path="./assets/avatars/avatar_grad_m.jpg" style="aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: var(--transition-smooth); position: relative; background: white;">
                    <img src="./assets/avatars/avatar_grad_m.jpg" style="width:100%; height:100%; object-fit:cover;" title="Graduate Male">
                  </div>
                </div>
              </div>

              <!-- Upload Panel -->
              <div id="avatar-upload-panel" style="display: none; background: rgba(255,255,255,0.2); padding: 16px; border-radius: 16px; border: var(--glass-border); margin-top: 12px; text-align: center; animation: fadeIn 0.3s ease-out;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 10px;">Upload Custom Image</span>
                
                <div id="avatar-drop-zone" style="border: 2px dashed rgba(0,0,0,0.1); border-radius: 12px; padding: 20px; cursor: pointer; transition: var(--transition-smooth); background: rgba(255,255,255,0.3); display: flex; flex-direction: column; align-items: center; gap: 8px;">
                  <span style="font-size: 24px;">📤</span>
                  <span style="font-size: 12px; font-weight: 600; color: var(--text-main);">Click or Drag Image Here</span>
                  <span style="font-size: 10px; color: var(--text-muted);">PNG, JPG, or GIF. Max 1MB.</span>
                  <input type="file" id="avatar-file-input" accept="image/*" style="display: none;">
                </div>
              </div>
            </div>

            <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.05); margin: 25px 0;">

            <h3 class="header-branding" style="font-size: 16px; margin-bottom: 15px; display:flex; align-items:center; gap:8px;">
              <span>🔑</span> Change Password (Optional)
            </h3>

            <div class="form-group">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
                <label class="form-label" style="margin-bottom:0;" for="prof-current-pass">Current Password (Required for updates)</label>
                <a href="#" id="btn-prof-forgot-pass-otp" style="font-size:11px; font-weight:600; color:var(--pastel-purple-dark); text-decoration:none;">Reset via Email OTP</a>
              </div>
              <input class="form-input" type="password" id="prof-current-pass" value="${user.password}" required placeholder="••••••••">
            </div>

            <!-- Profile Password OTP Reset Section (Hidden by default, shown if Reset via Email OTP clicked) -->
            <div id="prof-pass-otp-section" style="display: none; background: rgba(0,0,0,0.02); border: 1px dashed var(--pastel-purple-dark); padding: 16px; border-radius: 16px; margin: 15px 0; animation: fadeIn 0.3s ease-out;">
              <span style="font-size: 12px; font-weight: 700; color: var(--pastel-purple-dark); display: block; margin-bottom: 8px;">
                🔐 Password Reset OTP Verification Required
              </span>
              <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
                Verify your identity using the OTP code sent to your registered email <strong>${user.email.charAt(0)}***@${user.email.split('@')[1]}</strong>.
              </p>
              <div style="display: flex; gap: 12px; align-items: end;">
                <div class="form-group" style="margin-bottom: 0; flex-grow: 1;">
                  <label class="form-label" for="prof-pass-otp">Enter 6-Digit OTP</label>
                  <input class="form-input" type="text" id="prof-pass-otp" placeholder="6-digit Code" maxlength="6" disabled>
                </div>
                <button type="button" class="btn btn-secondary" id="btn-prof-pass-send-otp" style="padding: 11px 18px; font-size: 12px; height: 43px; white-space: nowrap;">
                  Send OTP
                </button>
              </div>
              <span id="prof-pass-otp-feedback" style="font-size: 11px; margin-top: 4px; display: block;"></span>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" for="prof-new-pass">New Password</label>
                <div class="password-input-wrapper">
                  <span class="password-prefix-emoji">🔒</span>
                  <input class="form-input" type="password" id="prof-new-pass" placeholder="••••••••">
                  <button type="button" class="password-toggle-btn" tabindex="-1" onclick="const input = this.closest('.password-input-wrapper').querySelector('input'); const prefix = this.closest('.password-input-wrapper').querySelector('.password-prefix-emoji'); if (input.type === 'password') { input.type = 'text'; this.textContent = '🐵'; if (prefix) prefix.textContent = '🔓'; } else { input.type = 'password'; this.textContent = '🙈'; if (prefix) prefix.textContent = '🔒'; } if (typeof event !== 'undefined') event.stopPropagation();">🙈</button>
                </div>
                <ul class="password-requirements" style="margin-top: 8px;">
                  <li class="req-item" id="prof-req-len">
                    <svg viewBox="0 0 24 24"><path fill="none" d="M20 6L9 17l-5-5"/></svg> 8+ characters
                  </li>
                  <li class="req-item" id="prof-req-num">
                    <svg viewBox="0 0 24 24"><path fill="none" d="M20 6L9 17l-5-5"/></svg> 1+ number
                  </li>
                </ul>
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-confirm-pass">Confirm New Password</label>
                <div class="password-input-wrapper">
                  <span class="password-prefix-emoji">🔒</span>
                  <input class="form-input" type="password" id="prof-confirm-pass" placeholder="••••••••">
                  <button type="button" class="password-toggle-btn" tabindex="-1" onclick="const input = this.closest('.password-input-wrapper').querySelector('input'); const prefix = this.closest('.password-input-wrapper').querySelector('.password-prefix-emoji'); if (input.type === 'password') { input.type = 'text'; this.textContent = '🐵'; if (prefix) prefix.textContent = '🔓'; } else { input.type = 'password'; this.textContent = '🙈'; if (prefix) prefix.textContent = '🔒'; } if (typeof event !== 'undefined') event.stopPropagation();">🙈</button>
                </div>
                <span id="prof-pass-match-label" style="font-size: 11px; margin-top: 4px; display: none;"></span>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 15px; font-size: 13px;">
              Save Profile Changes
            </button>
          </form>

          <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.05); margin: 25px 0;">

          <div class="danger-zone" style="background: rgba(239, 68, 68, 0.04); border: 1px dashed rgba(239, 68, 68, 0.2); padding: 20px; border-radius: 18px; text-align: left; animation: fadeIn 0.3s ease-out;">
            <h4 style="font-size: 14px; font-weight: 700; color: var(--pastel-rose-dark); margin: 0 0 6px 0; display:flex; align-items:center; gap:6px;">
              <span>⚠️</span> Danger Zone
            </h4>
            <p style="font-size: 12px; color: var(--text-muted); line-height: 1.5; margin: 0 0 15px 0;">
              Deleting your account will permanently purge all your study history, pomodoro milestones, syllabus progress, revision calendars, and active student session. This action is irreversible.
            </p>
            <button type="button" class="btn btn-danger" id="btn-prof-delete-account" style="width: 100%; padding: 12px; font-size: 13px; font-weight: 700; border-radius: 12px; background: var(--pastel-rose-dark); border-color: var(--pastel-rose-dark); color: white; cursor: pointer; transition: var(--transition-smooth);">
              Delete My Student Account
            </button>
          </div>
        </div>

        <!-- Right Column: Profile Summary & Stats Preview -->
        <div style="display:flex; flex-direction:column; gap:24px;">
          <!-- Flippable Summary & ID Card -->
          <div class="profile-flip-card" id="prof-flip-card">
            <div class="flip-card-inner">
              
              <!-- FRONT: Study Stats Summary -->
              <div class="flip-card-front glass-card" style="text-align: center; padding: 30px; justify-content: space-between; display: flex; flex-direction: column;">
                <div>
                  <div id="prof-summary-avatar" style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--pastel-purple), var(--pastel-blue)); display: flex; align-items: center; justify-content: center; font-size: 32px; font-family: var(--font-display); font-weight: 700; color: var(--text-main); margin: 0 auto 16px auto; border: 2px solid white; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden;">
                    ${user.avatar && user.avatar !== 'letter' 
                      ? `<img src="${user.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`
                      : user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <h2 class="header-branding" style="font-size: 22px; margin-bottom: 4px;">${user.fullName}</h2>
                  <span class="badge" style="background: rgba(179,212,240,0.4); color: var(--pastel-blue-dark); font-size: 11px; font-weight: bold;">
                    CA ${user.examLevel} Candidate
                  </span>
                  <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">
                    ID: <strong>${user.userId}</strong>
                  </div>

                  <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.05); margin: 20px 0;">

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div style="background: rgba(0,0,0,0.015); border: 1px solid rgba(0,0,0,0.03); border-radius: 12px; padding: 10px;">
                      <span style="font-size: 9px; font-weight: 700; color: var(--text-muted); display: block;">STUDY STREAK</span>
                      <span style="font-size: 18px; font-family: var(--font-display); font-weight: 800; color: var(--pastel-purple-dark);">${State.studyStats.streak} Days 🔥</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.015); border: 1px solid rgba(0,0,0,0.03); border-radius: 12px; padding: 10px;">
                      <span style="font-size: 9px; font-weight: 700; color: var(--text-muted); display: block;">MEMBER SINCE</span>
                      <span style="font-size: 13px; font-family: var(--font-display); font-weight: 700; color: var(--text-main); line-height: 2.2;">
                        ${new Date(user.registeredAt || Date.now()).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}
                      </span>
                    </div>
                  </div>
                </div>

                <button type="button" class="btn btn-secondary" id="btn-flip-to-back" style="width: 100%; font-size: 11px; padding: 10px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; border: var(--glass-border); background: rgba(255,255,255,0.5); cursor: pointer; transition: var(--transition-smooth);">
                  <span>💳</span> View Student ID Card (Flip)
                </button>
              </div>

              <!-- BACK: Official ICAI Student ID Card -->
              <div class="flip-card-back glass-card" style="justify-content: space-between; display: flex; flex-direction: column;">
                <div>
                  <div class="id-card-badge-header">
                    <div class="id-card-logo">CA</div>
                    <div class="id-card-header-text">
                      <span class="id-card-inst">CA TUTOR JS STUDENT ID CARD</span>
                      <span class="id-card-bos">BOARD OF STUDIES</span>
                    </div>
                  </div>

                  <div class="id-card-body-section">
                    <div class="id-card-photo-area">
                      <div id="prof-summary-avatar-back" style="width: 70px; height: 70px; border-radius: 12px; background: linear-gradient(135deg, var(--pastel-purple), var(--pastel-blue)); display: flex; align-items: center; justify-content: center; font-size: 28px; font-family: var(--font-display); font-weight: 700; color: var(--text-main); border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.05); overflow: hidden;">
                        ${user.avatar && user.avatar !== 'letter' 
                          ? `<img src="${user.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`
                          : user.fullName.charAt(0).toUpperCase()}
                      </div>
                      <span style="font-size: 7px; color: var(--pastel-green-dark); font-weight: 800; text-transform: uppercase; margin-top: 4px; display: flex; align-items: center; gap: 2px;">
                        ● ACTIVE
                      </span>
                    </div>

                    <div class="id-card-details">
                      <div class="id-card-row">
                        <span class="id-card-lbl">STUDENT ID</span>
                        <span class="id-card-val bold-val">${user.userId}</span>
                      </div>
                      <div class="id-card-row">
                        <span class="id-card-lbl">FULL NAME</span>
                        <span class="id-card-val" style="font-weight: 700;">${user.fullName}</span>
                      </div>
                      <div class="id-card-row">
                        <span class="id-card-lbl">CA LEVEL</span>
                        <span class="id-card-val">${user.examLevel}</span>
                      </div>
                      <div class="id-card-row">
                        <span class="id-card-lbl">EMAIL</span>
                        <span class="id-card-val" style="font-size: 10px;">${user.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Barcode Section -->
                  <div class="id-card-barcode-container">
                    <div class="id-card-barcode-lines"></div>
                    <span class="id-card-barcode-text">${user.userId}</span>
                  </div>
                </div>

                <button type="button" class="btn btn-secondary" id="btn-flip-to-front" style="width: 100%; font-size: 11px; padding: 10px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; border: var(--glass-border); background: rgba(255,255,255,0.5); cursor: pointer; transition: var(--transition-smooth);">
                  <span>📊</span> View Study Stats (Flip)
                </button>
              </div>

            </div>
          </div>

          <!-- Study Network Card -->
          ${networkCardHtml}

          <!-- Feedback & Suggestions Card -->
          <div class="glass-card" style="padding: 20px; border: var(--glass-border); box-shadow: 0 8px 32px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 8px; animation: fadeIn 0.3s ease-out; background: linear-gradient(135deg, rgba(217,179,255,0.05), rgba(179,212,240,0.05));">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 4px; color: var(--pastel-purple-dark); display:flex; align-items:center; gap:6px;">
              <span>📝</span> Help Us Improve!
            </h4>
            <p style="font-size: 12px; color: var(--text-main); line-height: 1.5; margin: 0 0 8px 0;">
              Your feedback helps us make CA TUTOR JS better. Share your suggestions, bugs, or feature requests with us!
            </p>
            <button id="btn-open-feedback-modal" class="btn" style="width: 100%; font-size: 12px; padding: 11px; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; border-radius: 10px; border: none; font-weight: 700; background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; transition: all 0.3s ease; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.25);">
              <span>✍️</span> Give Us Feedback
            </button>
          </div>

          <!-- Quick Tip Card -->
          <div class="glass-card" style="padding: 20px; background: linear-gradient(135deg, rgba(217,179,255,0.1), rgba(179,212,240,0.1));">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: var(--pastel-purple-dark); display:flex; align-items:center; gap:6px;">
              <span>💡</span> Exam Level Reminder
            </h4>
            <p style="font-size: 12px; color: var(--text-main); line-height: 1.5;">
              Changing your **CA Exam Level** will automatically re-scope your study portal! Your preparation gauges, subject readiness formulas, and active syllabus checklists will dynamically adapt to your new syllabus instantly.
            </p>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(container);
  },

  resetOtpState() {
    this.generatedOtp = null;
    this.isOtpVerified = false;
    clearInterval(this.otpInterval);
    this.otpInterval = null;
    this.otpCountdown = 0;
    this.passGeneratedOtp = null;
    this.isPassOtpVerified = false;
    clearInterval(this.passOtpInterval);
    this.passOtpInterval = null;
    this.passOtpCountdown = 0;
  },

  bindEvents(container) {
    // Bind Open Feedback Modal button
    const btnOpenFeedback = container.querySelector('#btn-open-feedback-modal');
    if (btnOpenFeedback) {
      btnOpenFeedback.addEventListener('click', () => {
        const modalId = 'cajs-feedback-modal';
        let modal = document.getElementById(modalId);
        if (modal) modal.remove();

        modal = document.createElement('div');
        modal.id = modalId;
        modal.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.4); backdrop-filter: blur(14px);
          display: flex; align-items: center; justify-content: center;
          z-index: 10001; animation: fadeIn 0.25s ease-out;
        `;
        modal.innerHTML = `
          <div class="glass-card" style="width: 90%; max-width: 550px; padding: 24px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); animation: scaleUp 0.3s cubic-bezier(0.34,1.56,0.64,1); background: rgba(255,255,255,0.92); border: 1px solid rgba(255,255,255,0.4); display: flex; flex-direction: column; gap: 14px; box-sizing: border-box;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 36px; height: 36px; border-radius: 12px; background: linear-gradient(135deg,#7c3aed,#3b82f6); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">📝</div>
                <div style="text-align: left;">
                  <h3 style="font-size: 16px; font-weight: 700; margin: 0; font-family: var(--font-display);">Share Your Feedback</h3>
                  <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0;">Help us make CA TUTOR JS even better</p>
                </div>
              </div>
              <button id="feedback-modal-close" style="background: none; border: none; font-size: 22px; cursor: pointer; color: var(--text-muted); font-weight: bold;">&times;</button>
            </div>
            <div style="width: 100%; height: 420px; border-radius: 12px; overflow: hidden; border: 1.5px solid rgba(0,0,0,0.06); background: white;">
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScrZ_QX06Khu_Shl3H33Wih4q4_5-05EIwV-nvIsaL0TZNoLQ/viewform?embedded=true" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" style="border: none; width: 100%; height: 100%;">Loading feedback form…</iframe>
            </div>
            <div style="display: flex; gap: 10px;">
              <button id="feedback-modal-cancel" class="btn btn-secondary" style="flex: 1; font-size: 12px; padding: 10px; cursor: pointer; border-radius: 10px; font-weight: 600;">Close</button>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScrZ_QX06Khu_Shl3H33Wih4q4_5-05EIwV-nvIsaL0TZNoLQ/viewform" target="_blank" class="btn btn-primary" style="flex: 1.5; font-size: 12px; padding: 10px; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px; border-radius: 10px; font-weight: 600;">
                <span>↗️</span> Open in New Tab
              </a>
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        const closeModal = () => modal.remove();
        modal.querySelector('#feedback-modal-close').addEventListener('click', closeModal);
        modal.querySelector('#feedback-modal-cancel').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });
      });
    }

    const user = State.user;
    const form = container.querySelector('#profile-editor-form');
    const inputPhone = container.querySelector('#prof-phone');
    const inputEmail = container.querySelector('#prof-email');
    const inputName = container.querySelector('#prof-name');
    const selectLevel = container.querySelector('#prof-level');
    const selectGender = container.querySelector('#prof-gender');
    const otpSection = container.querySelector('#prof-otp-section');
    const inputOtp = container.querySelector('#prof-otp');
    const btnSendOtp = container.querySelector('#btn-prof-send-otp');
    
    const btnProfForgotPassOtp = container.querySelector('#btn-prof-forgot-pass-otp');
    const passOtpSection = container.querySelector('#prof-pass-otp-section');
    const inputPassOtp = container.querySelector('#prof-pass-otp');
    const btnProfPassSendOtp = container.querySelector('#btn-prof-pass-send-otp');
    const passOtpFeedback = container.querySelector('#prof-pass-otp-feedback');
    const otpFeedback = container.querySelector('#prof-otp-feedback');

    const inputCurrentPass = container.querySelector('#prof-current-pass');
    const inputNewPass = container.querySelector('#prof-new-pass');
    const inputConfirmPass = container.querySelector('#prof-confirm-pass');
    const reqLen = container.querySelector('#prof-req-len');
    const reqNum = container.querySelector('#prof-req-num');
    const passMatchLabel = container.querySelector('#prof-pass-match-label');

    // Profile Picture selection system bindings
    const radioTypes = container.querySelectorAll('input[name="avatar-type"]');
    const presetsPanel = container.querySelector('#avatar-presets-panel');
    const uploadPanel = container.querySelector('#avatar-upload-panel');
    const summaryAvatar = container.querySelector('#prof-summary-avatar');
    const presetOptions = container.querySelectorAll('.preset-avatar-option');
    const fileInput = container.querySelector('#avatar-file-input');
    const dropZone = container.querySelector('#avatar-drop-zone');

    let tempSelectedAvatar = user.avatar || 'letter';

    // Highlight preset avatar option if preselected
    let initialType = 'letter';
    if (tempSelectedAvatar && tempSelectedAvatar.startsWith('./assets/avatars/')) {
      initialType = 'preset';
      presetOptions.forEach(opt => {
        if (opt.getAttribute('data-path') === tempSelectedAvatar) {
          opt.style.borderColor = 'var(--pastel-purple-dark)';
          opt.style.boxShadow = '0 0 10px var(--pastel-purple)';
        }
      });
    } else if (tempSelectedAvatar && tempSelectedAvatar.startsWith('data:image/')) {
      initialType = 'upload';
    }

    // Set initial radio choice
    const activeRadio = container.querySelector(`input[name="avatar-type"][value="${initialType}"]`);
    if (activeRadio) activeRadio.checked = true;

    // Show initial panel
    if (initialType === 'preset') {
      presetsPanel.style.display = 'block';
    } else if (initialType === 'upload') {
      uploadPanel.style.display = 'block';
    }

    // Dynamic preview update helper
    const updateSummaryPreview = (avatarVal) => {
      const summaryAvatarBack = container.querySelector('#prof-summary-avatar-back');
      [summaryAvatar, summaryAvatarBack].forEach(avatarEl => {
        if (!avatarEl) return;
        if (avatarVal && avatarVal !== 'letter') {
          avatarEl.innerHTML = `<img src="${avatarVal}" style="width: 100%; height: 100%; object-fit: cover; animation: fadeIn 0.3s ease-out;">`;
        } else {
          avatarEl.innerHTML = '';
          avatarEl.textContent = user.fullName.charAt(0).toUpperCase();
        }
      });
    };

    // Toggle panels depending on selected radio
    radioTypes.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const val = e.target.value;
        presetsPanel.style.display = 'none';
        uploadPanel.style.display = 'none';

        if (val === 'letter') {
          tempSelectedAvatar = 'letter';
          updateSummaryPreview(tempSelectedAvatar);
        } else if (val === 'preset') {
          presetsPanel.style.display = 'block';
          let highlighted = [...presetOptions].find(opt => opt.style.borderColor === 'var(--pastel-purple-dark)');
          if (!highlighted && presetOptions.length > 0) {
            highlighted = presetOptions[0];
            highlighted.style.borderColor = 'var(--pastel-purple-dark)';
            highlighted.style.boxShadow = '0 0 10px var(--pastel-purple)';
          }
          tempSelectedAvatar = highlighted ? highlighted.getAttribute('data-path') : 'letter';
          updateSummaryPreview(tempSelectedAvatar);
        } else if (val === 'upload') {
          uploadPanel.style.display = 'block';
          if (user.avatar && user.avatar.startsWith('data:image/')) {
            tempSelectedAvatar = user.avatar;
          }
          updateSummaryPreview(tempSelectedAvatar);
        }
      });
    });

    // Preset avatar click handler
    presetOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        presetOptions.forEach(o => {
          o.style.borderColor = 'transparent';
          o.style.boxShadow = 'none';
        });
        opt.style.borderColor = 'var(--pastel-purple-dark)';
        opt.style.boxShadow = '0 0 10px var(--pastel-purple)';
        tempSelectedAvatar = opt.getAttribute('data-path');
        updateSummaryPreview(tempSelectedAvatar);
      });
    });

    // Drag-and-drop / Local file upload handlers
    dropZone.addEventListener('click', () => fileInput.click());

    // Prevent default drag & drop behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    // Highlight drop zone on drag over
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.style.borderColor = 'var(--pastel-purple-dark)';
        dropZone.style.background = 'rgba(217, 179, 255, 0.1)';
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.style.borderColor = 'rgba(0,0,0,0.1)';
        dropZone.style.background = 'rgba(255,255,255,0.3)';
      }, false);
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt.files.length > 0) handleAvatarFile(dt.files[0]);
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) handleAvatarFile(fileInput.files[0]);
    });

    const handleAvatarFile = (file) => {
      if (!file.type.startsWith('image/')) {
        window.cajsShowAlert("Invalid Format", "Please select a valid image file (JPG, PNG, GIF).", "error");
        return;
      }
      if (file.size > 1024 * 1024) {
        window.cajsShowAlert("File Too Large", "Maximum image upload size limit is 1MB. Please pick a smaller image.", "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        tempSelectedAvatar = event.target.result;
        updateSummaryPreview(tempSelectedAvatar);
      };
      reader.onerror = () => {
        window.cajsShowAlert("Upload Error", "Failed to parse the selected photo.", "error");
      };
      reader.readAsDataURL(file);
    };

    // Phone / Email change listeners to prompt OTP section
    const checkContactDetailsChange = () => {
      const phoneChanged = inputPhone.value.trim() !== user.phone;
      const emailChanged = inputEmail.value.trim() !== user.email;

      if (phoneChanged || emailChanged) {
        otpSection.style.display = 'block';
        if (!this.generatedOtp && !this.isOtpVerified) {
          btnSendOtp.disabled = false;
        }
      } else {
        otpSection.style.display = 'none';
        this.resetOtpState();
      }
    };

    inputPhone.addEventListener('input', checkContactDetailsChange);
    inputEmail.addEventListener('input', checkContactDetailsChange);

    // Send OTP Simulated flow
    btnSendOtp.addEventListener('click', () => {
      const phoneVal = inputPhone.value.trim();
      const emailVal = inputEmail.value.trim();

      if (!/^\d{10}$/.test(phoneVal)) {
        window.cajsShowAlert("Invalid Input", "Please enter a valid 10-digit phone number.", "error");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        window.cajsShowAlert("Invalid Input", "Please enter a valid email address.", "error");
        return;
      }

      this.sendOtpSimulated(phoneVal, emailVal, btnSendOtp, inputOtp);
    });

    // Verify OTP input handler
    inputOtp.addEventListener('input', () => {
      const otpVal = inputOtp.value.trim();
      if (otpVal.length === 4) {
        if (otpVal === this.generatedOtp) {
          this.isOtpVerified = true;
          inputOtp.style.borderColor = 'var(--pastel-green-dark)';
          inputOtp.style.boxShadow = '0 0 0 3px var(--pastel-green)';
          inputOtp.disabled = true;
          
          btnSendOtp.textContent = 'Verified!';
          btnSendOtp.disabled = true;
          btnSendOtp.className = 'btn btn-success';
          
          otpFeedback.textContent = "Identity verified successfully. You can now save changes.";
          otpFeedback.style.color = "var(--pastel-green-dark)";
          
          clearInterval(this.otpInterval);
        } else {
          inputOtp.style.borderColor = 'var(--pastel-rose-dark)';
          inputOtp.style.boxShadow = '0 0 0 3px var(--pastel-rose)';
          otpFeedback.textContent = "Incorrect verification code. Please try again.";
          otpFeedback.style.color = "var(--pastel-rose-dark)";
        }
      } else {
        inputOtp.style.borderColor = '';
        inputOtp.style.boxShadow = '';
        otpFeedback.textContent = '';
      }
    });

    // --- Profile Password Reset via Email OTP Flow ---
    if (btnProfForgotPassOtp) {
      btnProfForgotPassOtp.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle/Show password reset OTP section
        const isHidden = passOtpSection.style.display === 'none';
        passOtpSection.style.display = isHidden ? 'block' : 'none';
        
        if (isHidden) {
          if (!this.passGeneratedOtp && !this.isPassOtpVerified) {
            btnProfPassSendOtp.disabled = false;
          }
        } else {
          // Reset OTP section state
          this.passGeneratedOtp = null;
          this.isPassOtpVerified = false;
          clearInterval(this.passOtpInterval);
          btnProfPassSendOtp.textContent = 'Send OTP';
          btnProfPassSendOtp.disabled = false;
          btnProfPassSendOtp.className = 'btn btn-secondary';
          inputPassOtp.value = '';
          inputPassOtp.disabled = true;
          inputPassOtp.style.borderColor = '';
          inputPassOtp.style.boxShadow = '';
          passOtpFeedback.textContent = '';
          
          // Clear current password prefill bypass
          inputCurrentPass.value = user.password;
        }
      });
    }

    if (btnProfPassSendOtp) {
      btnProfPassSendOtp.addEventListener('click', () => {
        const emailVal = user.email;

        // Generate 6-digit OTP code
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.passGeneratedOtp = otp;

        const now = new Date();
        const expiry = new Date(now.getTime() + 15 * 60 * 1000);
        const formattedExpiryTime = expiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Trigger visual simulator toast showing OTP transmission
        const container = document.getElementById('sms-container');
        container.innerHTML = `
          <div class="sms-simulation-toast" style="min-width: 320px; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border: var(--glass-border); border-radius: 18px; padding: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); display: flex; gap: 12px; align-items: start; animation: slideInRight 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);">
            <div class="sms-avatar" style="width: 38px; height: 38px; border-radius: 50%; background: var(--pastel-purple); display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--pastel-purple-dark); font-size:14px; flex-shrink:0;">✉️</div>
            <div class="sms-content" style="display:flex; flex-direction:column; gap:4px; font-size:12px; text-align: left;">
              <span class="sms-header" style="font-weight:700; color:var(--text-main);">🛡️ Profile Password Reset</span>
              <span class="sms-body" style="color:var(--text-muted); line-height:1.4;">
                Verification code sent to email 📧 <strong>${emailVal.charAt(0)}***@${emailVal.split('@')[1]}</strong>.<br>
                🔑 OTP Code: <strong style="color:var(--pastel-purple-dark); font-size:14px;">${otp}</strong>
              </span>
            </div>
          </div>
        `;

        // Send the email via EmailJS
        if (typeof emailjs !== 'undefined') {
          emailjs.send(
            'service_snsqw0k',
            'template_yuw2suo',
            {
              passcode: otp,
              time: formattedExpiryTime,
              otp: otp,
              otp_code: otp,
              otpCode: otp,
              code: otp,
              to_email: emailVal,
              user_email: emailVal,
              email: emailVal,
              to_name: emailVal.split('@')[0],
              name: emailVal.split('@')[0],
              message: `Your CA TUTOR JS profile password reset verification code is ${otp}.`
            }
          ).then((response) => {
            console.log('Profile password reset email sent successfully via EmailJS!', response.status, response.text);
          }).catch((error) => {
            console.error('EmailJS Profile OTP Send Failed:', error);
            alert(`Failed to send OTP email: ${error.text || error.message || error}. Falling back to developer simulation mode. Check browser console.`);
            console.log(`[Developer Fallback] Profile Password Reset OTP is: ${otp}`);
          });
        } else {
          console.warn("EmailJS SDK not found. Falling back to simulated verification.");
          console.log(`[Developer Fallback] Profile Password Reset OTP is: ${otp}`);
        }

        setTimeout(() => {
          const toast = container.querySelector('.sms-simulation-toast');
          if (toast) toast.remove();
        }, 8000);

        // Enable OTP Input
        inputPassOtp.disabled = false;
        inputPassOtp.placeholder = "Enter 6-digit OTP";
        inputPassOtp.focus();

        // Start 60s countdown for resend
        btnProfPassSendOtp.disabled = true;
        this.passOtpCountdown = 60;

        clearInterval(this.passOtpInterval);
        this.passOtpInterval = setInterval(() => {
          this.passOtpCountdown--;
          if (this.passOtpCountdown <= 0) {
            btnProfPassSendOtp.textContent = 'Resend OTP';
            btnProfPassSendOtp.disabled = false;
            clearInterval(this.passOtpInterval);
          } else {
            btnProfPassSendOtp.textContent = `Resend in ${this.passOtpCountdown}s`;
          }
        }, 1000);
      });
    }

    if (inputPassOtp) {
      inputPassOtp.addEventListener('input', () => {
        const otpVal = inputPassOtp.value.trim();
        if (otpVal.length === 6) {
          if (otpVal === this.passGeneratedOtp) {
            this.isPassOtpVerified = true;
            inputPassOtp.style.borderColor = 'var(--pastel-green-dark)';
            inputPassOtp.style.boxShadow = '0 0 0 3px var(--pastel-green)';
            inputPassOtp.disabled = true;

            btnProfPassSendOtp.textContent = 'Verified!';
            btnProfPassSendOtp.disabled = true;
            btnProfPassSendOtp.className = 'btn btn-success';

            // Fill current password block automatically to bypass password check safely
            inputCurrentPass.value = user.password;

            passOtpFeedback.textContent = "Identity verified successfully. Current password verified and auto-filled.";
            passOtpFeedback.style.color = "var(--pastel-green-dark)";

            clearInterval(this.passOtpInterval);
          } else {
            inputPassOtp.style.borderColor = 'var(--pastel-rose-dark)';
            inputPassOtp.style.boxShadow = '0 0 0 3px var(--pastel-rose)';
            passOtpFeedback.textContent = "Incorrect verification code. Please try again.";
            passOtpFeedback.style.color = "var(--pastel-rose-dark)";
          }
        } else {
          inputPassOtp.style.borderColor = '';
          inputPassOtp.style.boxShadow = '';
          passOtpFeedback.textContent = '';
        }
      });
    }

    // New Password indicators
    inputNewPass.addEventListener('input', () => {
      const val = inputNewPass.value;
      
      // Length check
      if (val.length >= 8) {
        reqLen.classList.add('valid');
      } else {
        reqLen.classList.remove('valid');
      }

      // Number check
      if (/\d/.test(val)) {
        reqNum.classList.add('valid');
      } else {
        reqNum.classList.remove('valid');
      }

      this.checkPasswordMatch(inputNewPass, inputConfirmPass, passMatchLabel);
    });

    inputConfirmPass.addEventListener('input', () => {
      this.checkPasswordMatch(inputNewPass, inputConfirmPass, passMatchLabel);
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = inputName.value.trim();
      const levelVal = selectLevel.value;
      const emailVal = inputEmail.value.trim();
      const phoneVal = inputPhone.value.trim();
      const currentPassVal = inputCurrentPass.value;
      const newPassVal = inputNewPass.value;
      const confirmPassVal = inputConfirmPass.value;

      // 1. Authenticate with current password
      if (currentPassVal !== user.password) {
        window.cajsShowAlert("Authentication Failed", "Incorrect current password. Please enter your valid current password to authorize edits.", "error");
        return;
      }

      // 2. If phone or email changed, verify OTP is completed
      const contactChanged = phoneVal !== user.phone || emailVal !== user.email;
      if (contactChanged && !this.isOtpVerified) {
        window.cajsShowAlert("Verification Missing", "You have updated phone or email coordinates. Please complete the OTP security verification.", "error");
        return;
      }

      // 3. New password validation
      if (newPassVal) {
        if (newPassVal.length < 8 || !/\d/.test(newPassVal)) {
          window.cajsShowAlert("Weak Password", "New password does not meet the complexity requirements (8+ chars, 1+ number).", "error");
          return;
        }
        if (newPassVal !== confirmPassVal) {
          window.cajsShowAlert("Mismatch", "Confirm password does not match new password.", "error");
          return;
        }
      }

      // 4. Check email unique (if email changes, it must not exist for another user)
      if (emailVal !== user.email && State.users[emailVal]) {
        window.cajsShowAlert("Email In Use", "The new email ID is already registered to another account.", "error");
        return;
      }

      // 5. Update State and save
      try {
        const oldEmail = user.email;
        
        // Update user values
        user.fullName = nameVal;
        user.examLevel = levelVal;
        user.gender = selectGender ? selectGender.value : (user.gender || 'female');
        user.phone = phoneVal;
        user.email = emailVal;
        user.avatar = tempSelectedAvatar;
        if (newPassVal) {
          user.password = newPassVal;
        }

        // If email changed, we need to rewrite USERS_DB record key and active session
        if (emailVal !== oldEmail) {
          delete State.users[oldEmail];
          // Migrate localized user keys in localStorage
          this.migrateLocalStoragePrefix(oldEmail, emailVal);
          
          State.user = user;
          localStorage.setItem('cajs_user_session', JSON.stringify(emailVal));
        }

        // Save back into users list and write files
        State.users[emailVal] = user;
        State.saveUserData();
        State.notifyStateChange();

        // Successful popup (Using our custom page alert!)
        window.cajsShowAlert("✨ Profile Saved", "Your student credentials and security parameters have been updated and synced successfully!", "success", () => {
          // Navigate to dashboard
          const navItem = document.querySelector('.nav-item[data-tab="dashboard"]');
          if (navItem) navItem.click();
        });

      } catch (err) {
        window.cajsShowAlert("Error Saving", "An error occurred while saving: " + err.message, "error");
      }
    });

    // 3D Card Flipping Logic
    const flipCard = container.querySelector('#prof-flip-card');
    const btnFlipToBack = container.querySelector('#btn-flip-to-back');
    const btnFlipToFront = container.querySelector('#btn-flip-to-front');

    if (flipCard) {
      // Toggle flip on card click (unless clicking inside preset buttons or other controls)
      flipCard.addEventListener('click', (e) => {
        const isInteractive = e.target.closest('button') || e.target.closest('a') || e.target.closest('input');
        if (!isInteractive) {
          flipCard.classList.toggle('flipped');
        }
      });

      if (btnFlipToBack) {
        btnFlipToBack.addEventListener('click', (e) => {
          e.stopPropagation();
          flipCard.classList.add('flipped');
        });
      }

      if (btnFlipToFront) {
        btnFlipToFront.addEventListener('click', (e) => {
          e.stopPropagation();
          flipCard.classList.remove('flipped');
        });
      }
    }

    // Study Network event listeners
    const btnNetFollowing = container.querySelector('#btn-net-tab-following');
    const btnNetFollowers = container.querySelector('#btn-net-tab-followers');

    if (btnNetFollowing) {
      btnNetFollowing.addEventListener('click', (e) => {
        e.preventDefault();
        this.activeNetworkTab = 'following';
        this.render(container);
      });
    }

    if (btnNetFollowers) {
      btnNetFollowers.addEventListener('click', (e) => {
        e.preventDefault();
        this.activeNetworkTab = 'followers';
        this.render(container);
      });
    }

    // Add friend form
    const netAddForm = container.querySelector('#profile-net-add-form');
    if (netAddForm) {
      netAddForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputId = container.querySelector('#net-add-id');
        if (!inputId) return;
        const friendId = inputId.value.trim();

        if (friendId === State.user.userId) {
          window.cajsShowAlert("Duplicate Action", "You cannot follow yourself!", "error");
          return;
        }

        try {
          State.followFriend(friendId);
          window.cajsShowAlert("✨ Success", `Successfully followed partner with User ID: ${friendId}!`, "success", () => {
            this.render(container);
          });
        } catch (err) {
          window.cajsShowAlert("User Not Found", err.message, "error");
        }
      });
    }

    // --- Account Deletion Flow ---
    const btnDeleteAccount = container.querySelector('#btn-prof-delete-account');
    if (btnDeleteAccount) {
      btnDeleteAccount.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Owner account protection
        if (user.email === 'owner@cajs.com' || user.role === 'owner') {
          window.cajsShowAlert("Operation Blocked", "As the primary Platform Owner, you cannot delete this account. Safety locks are active.", "error");
          return;
        }

        // 2. Custom Double-Confirm Popup Dialog
        window.cajsShowConfirm(
          "⚠️ Permanent Deletion",
          "Are you absolutely sure you want to permanently delete your CA TUTOR JS student profile? This will permanently purge all study hours, checklists, revision calendars, and statistics. This action is irreversible.",
          () => {
            try {
              // Delete user data from state & localStorage
              State.adminDeleteUser(user.email);
              State.logoutUser();

              // Redirect back to landing page
              document.getElementById('app-shell').style.display = 'none';
              const landing = document.getElementById('landing-page');
              if (landing) landing.style.display = 'flex';

              const authPanel = document.getElementById('auth-panel');
              if (authPanel) authPanel.classList.remove('open');

              // Clear login fields
              document.getElementById('login-email').value = '';
              document.getElementById('login-password').value = '';

              window.cajsShowAlert("Profile Purged", "Your student profile and all related study statistics have been successfully deleted from the platform.", "success");
            } catch (err) {
              window.cajsShowAlert("Error Deleting", "An error occurred during account deletion: " + err.message, "error");
            }
          }
        );
      });
    }

    // Global toggle follow back helper
    window.cajsProfileFollowToggle = (friendId) => {
      try {
        State.followFriend(friendId);
        this.render(container);
      } catch (err) {
        window.cajsShowAlert("Error", err.message, "error");
      }
    };
  },

  checkPasswordMatch(pass, confirm, label) {
    if (!confirm.value) {
      label.style.display = 'none';
      return;
    }

    label.style.display = 'block';
    if (pass.value === confirm.value) {
      label.textContent = 'Passwords match!';
      label.style.color = 'var(--pastel-green-dark)';
      confirm.style.borderColor = 'var(--pastel-green-dark)';
    } else {
      label.textContent = 'Passwords do not match.';
      label.style.color = 'var(--pastel-rose-dark)';
      confirm.style.borderColor = 'var(--pastel-rose-dark)';
    }
  },

  sendOtpSimulated(phone, email, btn, input) {
    // Set fixed demo OTP code simulating background mobile/email delivery
    const otp = "1234";
    this.generatedOtp = otp;

    // Trigger animated SMS / Email delivery simulation toast without showing the OTP on the webpage
    const container = document.getElementById('sms-container');
    container.innerHTML = `
      <div class="sms-simulation-toast" style="min-width: 320px; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border: var(--glass-border); border-radius: 18px; padding: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); display: flex; gap: 12px; align-items: start; animation: slideInRight 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);">
        <div class="sms-avatar" style="width: 38px; height: 38px; border-radius: 50%; background: var(--pastel-purple); display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--pastel-purple-dark); font-size:14px; flex-shrink:0;">CA</div>
        <div class="sms-content" style="display:flex; flex-direction:column; gap:4px; font-size:12px; text-align: left;">
          <span class="sms-header" style="font-weight:700; color:var(--text-main);">🛡️ Profile Security Verification</span>
          <span class="sms-body" style="color:var(--text-muted); line-height:1.4;">
            OTP verification code sent to 📱 <strong>+91 ******${phone.slice(-4)}</strong> & 📧 <strong>${email.charAt(0)}***@${email.split('@')[1]}</strong>.<br>
            🔑 OTP Code: <strong style="color:var(--pastel-purple-dark); font-size:14px;">${otp}</strong>
          </span>
        </div>
      </div>
    `;

    setTimeout(() => {
      const toast = container.querySelector('.sms-simulation-toast');
      if (toast) toast.remove();
    }, 10000);

    input.disabled = false;
    input.placeholder = "Enter code (Demo: 1234)";
    input.focus();

    btn.disabled = true;
    this.otpCountdown = 60;

    clearInterval(this.otpInterval);
    this.otpInterval = setInterval(() => {
      this.otpCountdown--;
      if (this.otpCountdown <= 0) {
        btn.textContent = 'Resend OTP';
        btn.disabled = false;
        clearInterval(this.otpInterval);
      } else {
        btn.textContent = `Resend in ${this.otpCountdown}s`;
      }
    }, 1000);
  },

  migrateLocalStoragePrefix(oldEmail, newEmail) {
    const oldPrefix = `_${oldEmail}`;
    const newPrefix = `_${newEmail}`;
    const tables = [
      'cajs_completed_chapters',
      'cajs_revisions',
      'cajs_uploaded_materials',
      'cajs_evaluations',
      'cajs_mistakes_db',
      'cajs_papers_db',
      'cajs_study_stats',
      'cajs_calendar_db'
    ];

    tables.forEach(table => {
      const rawVal = localStorage.getItem(table + oldPrefix);
      if (rawVal) {
        localStorage.setItem(table + newPrefix, rawVal);
        localStorage.removeItem(table + oldPrefix);
      }
    });
  }
};
