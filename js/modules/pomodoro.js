// CA JS Pomodoro Study Hall Module
import { State } from '../state.js';

export const PomodoroModule = {
  timerInterval: null,
  chatMessages: [],
  isChatOpen: false,
  timeLeft: 25 * 60, // 25 mins default
  totalDuration: 25 * 60,
  isRunning: false,
  activeMode: 'work', // work, short, long
  studyMode: 'solo', // solo, group
  joinedRoom: null,
  bgTheme: 'male',

  rooms: [],

  render(container) {
    this.container = container;
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Ring circumference logic
    const circumference = 2 * Math.PI * 90;
    const progressPercent = (this.timeLeft / this.totalDuration) * 100;
    const strokeOffset = circumference - (progressPercent / 100) * circumference;

    // Solo vs Group layout
    let rightPanelHtml = "";
    if (this.studyMode === 'solo') {
      if (!this.isRunning) {
        const roomRows = this.rooms.map((room, idx) => `
          <div class="room-tile">
            <div>
              <span class="room-name">${room.name}</span>
              <div class="room-users">${room.count} peers active</div>
            </div>
            <div style="display:flex; gap:6px; align-items:center;">
              <button class="btn btn-secondary" style="padding: 6px 12px; font-size:11px;" onclick="window.cajsJoinRoom(${idx})">
                Join Room
              </button>
              <button class="btn btn-danger" style="padding: 6px 10px; font-size:11px;" onclick="window.cajsDeleteRoom(${idx})" title="Delete Room">
                🗑️
              </button>
            </div>
          </div>
        `).join('');

        rightPanelHtml = `
          <div class="glass-card group-study-card">
            <h3 class="header-branding" style="font-size: 18px;">Group Study Rooms</h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 5px;">Join a virtual study room with peer CA students to maintain consistency!</p>
            <div class="rooms-list">
              ${roomRows}
            </div>
            <button class="btn btn-primary" style="font-size:12px; width: 100%; margin-top: 5px;" onclick="window.cajsCreateRoom()">
              Create Custom Room
            </button>
          </div>
        `;
      }
    } else {
      // Group study active
      const room = this.rooms.find(r => r.name === this.joinedRoom);
      const membersList = room.members.map(m => `
        <li style="display:flex; align-items:center; gap:8px; font-size: 13px; margin-bottom: 6px;">
          <span style="width:8px; height:8px; border-radius:50%; background:var(--pastel-green-dark);"></span>
          <span>${m}</span>
        </li>
      `).join('');

      if (!this.isRunning) {
        rightPanelHtml = `
          <div class="glass-card group-study-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 class="header-branding" style="font-size: 18px;">${this.joinedRoom}</h3>
              <button class="btn btn-danger" style="padding: 4px 10px; font-size:10px;" onclick="window.cajsLeaveRoom()">Leave</button>
            </div>
            <p style="font-size: 11px; color: var(--text-muted);">Ambient pastel theme shifted! You are studying with a group of size <strong>${room.count}</strong>.</p>
            
            <div style="border-top: 1px solid rgba(0,0,0,0.06); padding-top: 10px; margin-top: 5px;">
              <h4 style="font-size:13px; font-weight:bold; margin-bottom: 8px;">Active Partners:</h4>
              <ul style="list-style:none;">
                <li style="display:flex; align-items:center; gap:8px; font-size: 13px; margin-bottom: 6px;">
                  <span style="width:8px; height:8px; border-radius:50%; background:var(--pastel-purple-dark);"></span>
                  <strong>${State.user.fullName} (You)</strong>
                </li>
                ${membersList.replace(`<span>${State.user.fullName} (You)</span>`, '')}
              </ul>
            </div>
          </div>
        `;
      } else {
        const chatHtml = this.chatMessages.map(msg => `
          <div style="margin-bottom: 8px; font-size: 13px;">
            <strong style="color: ${msg.isMe ? 'var(--pastel-purple-dark)' : 'var(--text-main)'};">${msg.sender}:</strong>
            <span style="color: var(--text-main);">${msg.text}</span>
          </div>
        `).join('');

        if (this.isChatOpen) {
          rightPanelHtml = `
            <div class="glass-card group-study-card" style="display: flex; flex-direction: column; min-height: 350px; width: 340px; margin: 0; background: rgba(255,255,255,0.95); position: relative;">
              <button onclick="window.cajsToggleChat()" style="position: absolute; top: 15px; right: 15px; background: none; border: none; cursor: pointer; font-size: 16px; opacity: 0.5; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">✖</button>
              <h3 class="header-branding" style="font-size: 16px; margin-bottom: 10px; flex-shrink: 0;">💬 Live Chat - ${this.joinedRoom}</h3>
              <div id="cajs-chat-window" style="flex-grow: 1; overflow-y: auto; background: rgba(0,0,0,0.03); border-radius: 8px; padding: 12px; margin-bottom: 10px; border: 1px solid rgba(0,0,0,0.05); min-height: 200px; max-height: 250px;">
                ${chatHtml || '<div style="color:var(--text-muted); font-size:12px; font-style:italic; text-align:center; margin-top:10px;">Send a message to start chatting!</div>'}
              </div>
              <form id="cajs-chat-form" style="display: flex; gap: 8px; flex-shrink: 0;">
                <input type="text" id="cajs-chat-input" placeholder="Type a message..." style="flex-grow: 1; padding: 10px 14px; border-radius: 20px; border: 1px solid rgba(0,0,0,0.1); outline: none; font-size: 13px;">
                <button type="submit" class="btn btn-primary" style="padding: 10px 16px; border-radius: 20px; font-size: 13px;">Send</button>
              </form>
            </div>
          `;
        } else {
          rightPanelHtml = `
            <div style="display: flex; justify-content: flex-end; width: 340px; margin: 0;">
              <button class="btn btn-primary" onclick="window.cajsToggleChat()" style="border-radius: 50px; padding: 12px 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); font-size: 14px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 18px;">💬</span> Show Chat
              </button>
            </div>
          `;
        }
      }
    }

    let bgUrl = '';
    const userGender = (State.user && State.user.gender) ? State.user.gender : 'female';
    const isBreak = this.activeMode === 'short' || this.activeMode === 'long';
    
    if (this.studyMode === 'group' && this.isRunning) {
      const room = this.rooms.find(r => r.name === this.joinedRoom);
      if (isBreak) {
        // Group break — show group relaxing together, sized by room count
        if (room && room.count === 2) {
          bgUrl = './assets/bg_group_rest_2.png';
        } else if (room && room.count === 3) {
          bgUrl = './assets/bg_group_rest_3.png';
        } else if (room && room.count >= 4) {
          bgUrl = './assets/bg_group_rest_4.png';
        } else {
          bgUrl = './assets/bg_group_rest_2.png';
        }
      } else {
        // Group study — show group studying together, sized by room count
        if (room && room.count === 2) {
          bgUrl = './assets/bg_group_2.png';
        } else if (room && room.count === 3) {
          bgUrl = './assets/bg_group_3.png';
        } else if (room && room.count >= 4) {
          bgUrl = './assets/bg_group_4.png';
        } else {
          bgUrl = './assets/bg_group.png';
        }
      }
    } else if (!isBreak) {
      bgUrl = userGender === 'male' ? './assets/bg_male.png' : './assets/bg_female.png';
    } else {
      bgUrl = userGender === 'male' ? './assets/bg_male_rest.png' : './assets/bg_female_rest.png';
    }
    
    // Overlay opacity: lighter and warmer during breaks, darker during focus
    const overlayColor = isBreak
      ? 'linear-gradient(rgba(0,0,0, 0.25), rgba(0,0,0, 0.45))'
      : 'linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.7))';

    const bgStyle = this.isRunning 
      ? `background: ${overlayColor}, url('${bgUrl}'); background-size: cover; background-position: center; border-radius: 24px; padding: 30px; margin: -10px; min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: background 0.8s ease, all 0.5s ease;`
      : `background: transparent; border-radius: 24px; padding: 30px; margin: -10px; min-height: 80vh; transition: background 0.5s ease, all 0.5s ease;`;
    
    // Mode toggles
    let modeToggles = '';
    if (!this.isRunning) {
       modeToggles = `
        <div class="pomo-modes" style="margin-bottom: 12px;">
          <button class="pomo-mode-btn ${this.activeMode === 'work' ? 'active' : ''}" onclick="window.cajsChangePomoMode('work', 25)">Study Interval</button>
          <button class="pomo-mode-btn ${this.activeMode === 'short' ? 'active' : ''}" onclick="window.cajsChangePomoMode('short', 5)">Short Break</button>
          <button class="pomo-mode-btn ${this.activeMode === 'long' ? 'active' : ''}" onclick="window.cajsChangePomoMode('long', 15)">Long Break</button>
        </div>
        <div style="display:flex; justify-content:center; align-items:center; gap: 8px; margin-bottom: 15px;">
          <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="window.cajsAdjustTimer(-5)">-5m</button>
          <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="window.cajsAdjustTimer(-1)">-1m</button>
          <span style="font-size: 11px; font-weight: bold; color: var(--pastel-purple-dark); padding: 0 5px;">Adjust Time</span>
          <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="window.cajsAdjustTimer(1)">+1m</button>
          <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="window.cajsAdjustTimer(5)">+5m</button>
        </div>
       `;
    }

    const headerHtml = this.isRunning ? '' : `
        <header class="app-header" style="background: rgba(255,255,255,0.6); backdrop-filter: blur(12px); border-radius: 16px; padding: 20px; margin-bottom: 30px; border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
          <div class="header-title-container">
            <h1 class="header-branding" style="font-size: 24px;">Pomodoro Study Hall</h1>
            <span class="header-subtitle" style="font-weight: 500; color: #444;">Boost academic focus and earn study points under research-backed timers</span>
          </div>
        </header>
    `;

    const isGroupRunning = this.isRunning && this.studyMode === 'group';
    const isSoloRunning = this.isRunning && this.studyMode === 'solo';
    const gridClass = this.isRunning ? '' : 'pomodoro-grid';

    let wrapperStyle = '';
    if (isSoloRunning) {
      wrapperStyle = 'width: 100%; display: flex; justify-content: flex-end; padding-right: 40px;';
    } else if (isGroupRunning) {
      wrapperStyle = 'width: 100%; display: flex; flex-direction: column; align-items: flex-end; gap: 15px; padding-right: 20px;';
    }

    container.innerHTML = `
      <div style="${bgStyle}">
        ${headerHtml}

        <div class="${gridClass}" style="${wrapperStyle}">
          <!-- Left/Top: Active Timer Ring -->
          <div class="glass-card pomo-timer-card" style="${this.isRunning ? `background: rgba(255, 255, 255, ${isBreak ? '0.12' : '0.18'}); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 15px 35px rgba(0,0,0,0.25); width: ${isBreak ? '220px' : '280px'}; padding: ${isBreak ? '16px 14px' : '25px 20px'}; border-radius: 24px; transform: scale(${isBreak ? '0.7' : '0.85'}); color: #ffffff; transition: all 0.6s ease;` : ''}">
            
            ${modeToggles}

            <!-- Glowing circular progress countdown -->
            <div class="pomo-timer-display" style="${this.isRunning ? 'margin-bottom: 30px;' : ''}">
              <svg width="200" height="200">
                <circle cx="100" cy="100" r="90" stroke="${this.isRunning ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.02)'}" stroke-width="8" fill="transparent"/>
                <circle id="timer-ring" cx="100" cy="100" r="90" stroke="var(--pastel-purple-dark)" stroke-width="8" fill="transparent"
                  class="timer-ring-glow" stroke-dasharray="${circumference} ${circumference}" stroke-dashoffset="${strokeOffset}"
                  style="transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 0.5s linear;" />
              </svg>
              <span class="timer-text" style="${this.isRunning ? 'color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.5);' : ''}">${formattedTime}</span>
            </div>

            <div class="pomo-actions">
              <button class="btn ${this.isRunning ? 'btn-danger' : 'btn-primary'}" id="btn-timer-start" onclick="window.cajsToggleTimer()">
                ${this.isRunning ? 'Pause Focus' : (this.timeLeft < this.totalDuration ? 'Resume Focus' : 'Start Focus')}
              </button>
              ${!this.isRunning ? `
              <button class="btn btn-secondary" onclick="window.cajsResetTimer()">
                Reset
              </button>` : ''}
            </div>
          </div>

          <!-- Right: Solo rooms list OR Joined Group widget -->
          ${rightPanelHtml}
        </div>
      </div>
    `;

    window.cajsSetBgTheme = (theme) => {
      this.bgTheme = theme;
      this.render(container);
    };

    window.cajsToggleChat = () => {
      this.isChatOpen = !this.isChatOpen;
      this.render(container);
    };

    window.cajsSendChat = (e) => {
      e.preventDefault();
      const input = document.getElementById('cajs-chat-input');
      if (!input) return;
      const val = input.value.trim();
      if (!val) return;
      
      this.chatMessages.push({ isMe: true, sender: 'You', text: val });
      
      const cw = document.getElementById('cajs-chat-window');
      if (cw) {
        const msgDiv = document.createElement('div');
        msgDiv.style = "margin-bottom: 8px; font-size: 13px;";
        msgDiv.innerHTML = `<strong style="color: var(--pastel-purple-dark);">You:</strong> <span style="color: var(--text-main);">${val}</span>`;
        const placeholder = cw.querySelector('div[style*="italic"]');
        if (placeholder) placeholder.remove();
        cw.appendChild(msgDiv);
        cw.scrollTop = cw.scrollHeight;
      }
      input.value = '';
      input.focus();
    };

    setTimeout(() => {
      const form = document.getElementById('cajs-chat-form');
      if (form) form.addEventListener('submit', window.cajsSendChat);
      const cw = document.getElementById('cajs-chat-window');
      if (cw) cw.scrollTop = cw.scrollHeight;
    }, 50);

    // Make window action methods global
    window.cajsAdjustTimer = (diffMins) => {
      let newTime = this.timeLeft + (diffMins * 60);
      if (newTime < 60) newTime = 60; // Minimum 1 minute
      this.timeLeft = newTime;
      this.totalDuration = newTime;
      this.render(container);
    };

    window.cajsChangePomoMode = (mode, durationMins) => {
      this.activeMode = mode;
      this.timeLeft = durationMins * 60;
      this.totalDuration = durationMins * 60;
      this.pauseTimer();
      this.render(container);
    };

    window.cajsToggleTimer = () => {
      if (this.isRunning) {
        this.pauseTimer();
      } else {
        this.startTimer();
      }
      this.render(container);
    };

    window.cajsResetTimer = () => {
      const minutes = this.activeMode === 'work' ? 25 : this.activeMode === 'short' ? 5 : 15;
      this.timeLeft = minutes * 60;
      this.totalDuration = minutes * 60;
      this.pauseTimer();
      this.render(container);
    };

    window.cajsJoinRoom = (idx) => {
      const room = this.rooms[idx];
      this.studyMode = 'group';
      this.joinedRoom = room.name;
      
      // Shift theme background dynamically
      document.body.style.background = room.bg;
      
      this.render(container);
    };

    window.cajsLeaveRoom = () => {
      this.studyMode = 'solo';
      this.joinedRoom = null;
      
      // Reset main background theme
      document.body.style.background = 'var(--bg-gradient)';
      this.render(container);
    };

    window.cajsDeleteRoom = (idx) => {
      this.rooms.splice(idx, 1);
      this.render(container);
    };

    window.cajsCreateRoom = () => {
      let modal = document.getElementById('cajs-group-prompt');
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = 'cajs-group-prompt';
      modal.className = 'cajs-alert-overlay';

      const following = State.friends.filter(f => f.isFollowed);
      const friendsHtml = following.length > 0 
        ? following.map(f => `
          <label style="display:flex; align-items:center; gap:8px; font-size:13px; margin-bottom:8px; cursor:pointer;">
            <input type="checkbox" class="friend-cb" value="${f.name}">
            ${f.name}
          </label>
        `).join('')
        : `<p style="font-size:12px; color:var(--text-muted); font-style:italic;">You aren't following anyone yet! Add friends from the Network tab.</p>`;

      modal.innerHTML = `
        <div class="cajs-alert-card" style="min-width: 320px; max-width: 400px; text-align: left; display: flex; flex-direction: column; gap: 16px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 24px; padding: 30px; border: var(--glass-border); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);">
          <h3 class="header-branding" style="font-size: 18px; margin-bottom: 5px; color: var(--pastel-purple-dark);">Create Group Study Room</h3>
          
          <div style="width: 100%;">
            <label style="font-size:12px; font-weight:bold; color:var(--text-muted); display:block; margin-bottom:5px;">Room Name</label>
            <input type="text" id="cajs-group-name" placeholder="e.g. Audit Intensive" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.1); background: rgba(0,0,0,0.02); outline: none; box-sizing: border-box;">
          </div>

          <div style="width: 100%;">
            <label style="font-size:12px; font-weight:bold; color:var(--text-muted); display:block; margin-bottom:8px;">Invite Following</label>
            <div style="max-height: 120px; overflow-y:auto; background: rgba(0,0,0,0.02); padding: 10px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.05); box-sizing: border-box;">
              ${friendsHtml}
            </div>
          </div>
          
          <div style="display: flex; gap: 12px; width: 100%; margin-top: 10px;">
            <button class="btn btn-secondary" id="cajs-group-cancel" style="flex: 1; padding: 10px; font-size: 13px; border-radius: 12px;">Cancel</button>
            <button class="btn btn-primary" id="cajs-group-ok" style="flex: 1; padding: 10px; font-size: 13px; border-radius: 12px;">Start Room</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      setTimeout(() => {
        modal.classList.add('open');
        document.getElementById('cajs-group-name').focus();
      }, 10);

      const closePrompt = (start) => {
        if (!start) {
          modal.classList.remove('open');
          setTimeout(() => modal.remove(), 300);
          return;
        }

        const roomName = document.getElementById('cajs-group-name').value.trim();
        if (!roomName) {
          window.cajsShowAlert("Missing Info", "Please provide a room name.", "error");
          return;
        }

        const cbs = document.querySelectorAll('.friend-cb:checked');
        const selectedMembers = Array.from(cbs).map(cb => cb.value);

        const newRoom = {
          name: roomName + " 🎯",
          members: [`${State.user.fullName} (You)`, ...selectedMembers],
          count: selectedMembers.length + 1,
          bg: "linear-gradient(135deg, hsl(30, 24%, 96%) 0%, hsl(212, 85%, 92%) 50%, hsl(140, 60%, 90%) 100%)"
        };
        this.rooms.push(newRoom);
        this.studyMode = 'group';
        this.joinedRoom = newRoom.name;
        document.body.style.background = newRoom.bg;
        this.render(container);

        modal.classList.remove('open');
        setTimeout(() => modal.remove(), 300);
      };

      document.getElementById('cajs-group-ok').addEventListener('click', () => closePrompt(true));
      document.getElementById('cajs-group-cancel').addEventListener('click', () => closePrompt(false));
    };
  },

  startTimer() {
    this.isRunning = true;
    let ticks = 0;

    this.timerInterval = setInterval(() => {
      if (this.timeLeft <= 0) {
        this.completeSession();
      } else {
        this.timeLeft--;
        ticks++;
        
        // Dynamically increment study duration in state every 30 seconds for simulation satisfaction!
        if (ticks % 30 === 0) {
          State.addStudyTime(0.5); // Add 0.5 study minutes
        }
        
        // Live update time texts and circles
        const display = this.container.querySelector('.timer-text');
        const ring = this.container.querySelector('#timer-ring');
        if (display && ring) {
          const minutes = Math.floor(this.timeLeft / 60);
          const seconds = this.timeLeft % 60;
          display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          
          const circumference = 2 * Math.PI * 90;
          const progressPercent = (this.timeLeft / this.totalDuration) * 100;
          const strokeOffset = circumference - (progressPercent / 100) * circumference;
          ring.style.strokeDashoffset = strokeOffset;
        }

        // Mock chat messages during group study
        if (this.studyMode === 'group' && ticks % 12 === 0) { // Every 12 seconds for faster demo
          const room = this.rooms.find(r => r.name === this.joinedRoom);
          if (room) {
            const partners = room.members.filter(m => !m.includes('(You)'));
            if (partners.length > 0) {
              const randomPartner = partners[Math.floor(Math.random() * partners.length)];
              const messages = [
                "Just finished a chapter!", "Keep going everyone 🚀", "This timer really helps me focus.",
                "I'm taking notes right now.", "Halfway there! We got this.", "Audit is so tricky today.",
                "Anyone else feeling productive?", "Wow the new timer looks great.", "Let's crack CA 📚"
              ];
              const msgText = messages[Math.floor(Math.random() * messages.length)];
              this.chatMessages.push({ isMe: false, sender: randomPartner, text: msgText });
              
              const cw = document.getElementById('cajs-chat-window');
              if (cw) {
                const msgDiv = document.createElement('div');
                msgDiv.style = "margin-bottom: 8px; font-size: 13px;";
                msgDiv.innerHTML = `<strong style="color: var(--text-main);">${randomPartner}:</strong> <span style="color: var(--text-main);">${msgText}</span>`;
                const placeholder = cw.querySelector('div[style*="italic"]');
                if (placeholder) placeholder.remove();
                cw.appendChild(msgDiv);
                cw.scrollTop = cw.scrollHeight;
              }
            }
          }
        }
      }
    }, 1000);
  },

  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
  },

  completeSession() {
    this.pauseTimer();
    this.playAudioBell();

    if (this.activeMode === 'work') {
      alert("🎯 Pomodoro Finished! Fantastic Focus.\n\nYou have earned +10 Study points and completed a study block.");
      State.addStudyTime(25); // Log 25 minutes of study, increments points (+50 pts)
    } else {
      alert("Break complete! Ready to start focusing again?");
    }

    window.cajsResetTimer();
  },

  playAudioBell() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      // Synthesize elegant chime notes (C5 -> E5 -> G5 -> C6)
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); 
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); 
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); 
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.45); 
      
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch(err) {
      console.warn("Web Audio API not allowed or supported yet by user gestures:", err);
    }
  }
};
