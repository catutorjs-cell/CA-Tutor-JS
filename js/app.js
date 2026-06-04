// CA JS Single-Page Application Router & Bootstrap
import { State } from './state.js';
import { Auth } from './auth.js';
import { Dashboard } from './dashboard.js';
import { SyllabusModule } from './modules/syllabus.js';
import { PyqMtpModule } from './modules/pyq_mtp.js';
import { RevisionModule } from './modules/revision.js';
import { MistakesModule } from './modules/mistakes.js';
import { DoubtDecoderModule } from './modules/decoder.js';
import { PomodoroModule } from './modules/pomodoro.js';
import { SocialModule } from './modules/social.js';
import { GeneratorModule } from './modules/generator.js';
import { AnalyticsModule } from './modules/analytics.js';
import { ProfileModule } from './modules/profile.js';
import { OwnerConsoleModule } from './modules/owner_console.js';

// --- CUSTOM IN-PAGE ALERT POPUP ---
window.cajsShowAlert = (title, message, type = 'info', onOk = null) => {
  let modal = document.getElementById('cajs-custom-alert');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'cajs-custom-alert';
  modal.className = 'cajs-alert-overlay';

  let icon = '🔔';
  let titleColor = 'var(--pastel-purple-dark)';
  if (type === 'success') {
    icon = '✨';
    titleColor = 'var(--pastel-green-dark)';
  } else if (type === 'error') {
    icon = '⚠️';
    titleColor = 'var(--pastel-rose-dark)';
  }

  modal.innerHTML = `
    <div class="cajs-alert-card" style="min-width: 320px; max-width: 400px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); border-radius: 24px; padding: 30px; border: var(--glass-border); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);">
      <div style="background: rgba(255,255,255,0.8); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: var(--glass-border); margin-bottom: 5px;">
        ${icon}
      </div>
      <div>
        <h3 class="header-branding" style="font-size: 18px; margin-bottom: 8px; background: none; -webkit-text-fill-color: initial; color: ${titleColor}; font-weight: 700;">${title}</h3>
        <p style="font-size: 13px; color: var(--text-main); line-height: 1.5; padding: 0 10px; word-break: break-word;">
          ${message}
        </p>
      </div>
      <button class="btn btn-primary" id="cajs-alert-ok-btn" style="width: 100%; max-width: 150px; padding: 10px 20px; font-size: 13px; border-radius: 12px; margin-top: 5px;">
        OK
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.add('open');
  }, 10);

  const closeAlert = () => {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.remove();
      if (onOk) onOk();
    }, 300);
  };

  modal.querySelector('#cajs-alert-ok-btn').addEventListener('click', closeAlert);
  
  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.removeEventListener('keydown', handleKey);
      closeAlert();
    }
  };
  document.addEventListener('keydown', handleKey);
};

window.cajsShowConfirm = (title, message, onConfirm, onCancel = null) => {
  let modal = document.getElementById('cajs-custom-confirm');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'cajs-custom-confirm';
  modal.className = 'cajs-alert-overlay';

  modal.innerHTML = `
    <div class="cajs-alert-card" style="min-width: 320px; max-width: 400px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); border-radius: 24px; padding: 30px; border: var(--glass-border); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);">
      <div style="background: rgba(255,255,255,0.8); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: var(--glass-border); margin-bottom: 5px;">
        ❓
      </div>
      <div>
        <h3 class="header-branding" style="font-size: 18px; margin-bottom: 8px; background: none; -webkit-text-fill-color: initial; color: var(--pastel-purple-dark); font-weight: 700;">${title}</h3>
        <p style="font-size: 13px; color: var(--text-main); line-height: 1.5; padding: 0 10px; word-break: break-word;">
          ${message}
        </p>
      </div>
      <div style="display: flex; gap: 12px; width: 100%; justify-content: center;">
        <button class="btn btn-secondary" id="cajs-confirm-cancel-btn" style="flex: 1; padding: 10px; font-size: 13px; border-radius: 12px;">
          Cancel
        </button>
        <button class="btn btn-danger" id="cajs-confirm-ok-btn" style="flex: 1; padding: 10px; font-size: 13px; border-radius: 12px; background: var(--pastel-rose-dark); border-color: var(--pastel-rose-dark); color: white;">
          Confirm
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.add('open');
  }, 10);

  const closeConfirm = (confirmed) => {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.remove();
      if (confirmed) {
        if (onConfirm) onConfirm();
      } else {
        if (onCancel) onCancel();
      }
    }, 300);
  };

  modal.querySelector('#cajs-confirm-ok-btn').addEventListener('click', () => closeConfirm(true));
  modal.querySelector('#cajs-confirm-cancel-btn').addEventListener('click', () => closeConfirm(false));
};

window.cajsShowPrompt = (title, message, onSubmit, placeholder = "") => {
  let modal = document.getElementById('cajs-custom-prompt');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'cajs-custom-prompt';
  modal.className = 'cajs-alert-overlay';

  modal.innerHTML = `
    <div class="cajs-alert-card" style="min-width: 320px; max-width: 400px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); border-radius: 24px; padding: 30px; border: var(--glass-border); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);">
      <div style="background: rgba(255,255,255,0.8); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: var(--glass-border); margin-bottom: 5px;">
        ✏️
      </div>
      <div style="width: 100%;">
        <h3 class="header-branding" style="font-size: 18px; margin-bottom: 8px; background: none; -webkit-text-fill-color: initial; color: var(--pastel-purple-dark); font-weight: 700;">${title}</h3>
        <p style="font-size: 13px; color: var(--text-main); line-height: 1.5; padding: 0 10px; word-break: break-word; margin-bottom: 15px;">
          ${message}
        </p>
        <input type="text" id="cajs-prompt-input" placeholder="${placeholder}" style="width: 100%; box-sizing: border-box; padding: 12px 15px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.1); background: rgba(255,255,255,0.9); font-size: 14px; outline: none; transition: border 0.3s; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
      </div>
      <div style="display: flex; gap: 12px; width: 100%; justify-content: center; margin-top: 10px;">
        <button class="btn btn-secondary" id="cajs-prompt-cancel-btn" style="flex: 1; padding: 10px; font-size: 13px; border-radius: 12px;">
          Cancel
        </button>
        <button class="btn btn-primary" id="cajs-prompt-ok-btn" style="flex: 1; padding: 10px; font-size: 13px; border-radius: 12px;">
          Submit
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.add('open');
    document.getElementById('cajs-prompt-input').focus();
  }, 10);

  const closePrompt = (submitted) => {
    modal.classList.remove('open');
    const val = document.getElementById('cajs-prompt-input').value.trim();
    setTimeout(() => {
      modal.remove();
      if (submitted && onSubmit && val) {
        onSubmit(val);
      }
    }, 300);
  };

  modal.querySelector('#cajs-prompt-ok-btn').addEventListener('click', () => closePrompt(true));
  modal.querySelector('#cajs-prompt-cancel-btn').addEventListener('click', () => closePrompt(false));
  modal.querySelector('#cajs-prompt-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      closePrompt(true);
    }
  });
};

window.cajsOpenFeedbackModal = () => {
  const modalId = 'cajs-feedback-modal';
  let modal = document.getElementById(modalId);
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = modalId;
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.4); backdrop-filter: blur(14px);
    display: flex; align-items: center; justify-content: center;
    z-index: 10008; animation: fadeIn 0.25s ease-out;
  `;
  modal.innerHTML = `
    <div class="glass-card" style="width: 90%; max-width: 550px; padding: 24px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); animation: scaleUp 0.3s cubic-bezier(0.34,1.56,0.64,1); background: rgba(255,255,255,0.92); border: 1px solid rgba(255,255,255,0.4); display: flex; flex-direction: column; gap: 14px; box-sizing: border-box;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 12px; background: linear-gradient(135deg,#7c3aed,#3b82f6); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">📝</div>
          <div style="text-align: left;">
            <h3 style="font-size: 16px; font-weight: 700; margin: 0; font-family: var(--font-display); color: var(--text-main);">Share Your Feedback</h3>
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
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScrZ_QX06Khu_Shl3H33Wih4q4_5-05EIwV-nvIsaL0TZNoLQ/viewform" target="_blank" class="btn btn-primary" style="flex: 1.5; font-size: 12px; padding: 10px; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px; border-radius: 10px; font-weight: 600; color: white;">
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
};

// Global alert override
window.alert = (message) => {
  window.cajsShowAlert("Notification", message, "info");
};

const Router = {
  activeTab: 'dashboard',
  viewport: null,

  init() {
    this.viewport = document.getElementById('app-viewport');
    
    // Helper to close mobile sidebar drawer
    const closeMobileSidebar = () => {
      const sidebar = document.querySelector('.app-sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
      if (backdrop && backdrop.classList.contains('active')) {
        backdrop.classList.remove('active');
      }
    };

    // Bind sidebar clicks
    const navItems = document.querySelectorAll('.nav-menu .nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class
        item.classList.add('active');
        
        const tab = item.getAttribute('data-tab');
        this.navigate(tab);

        // Close mobile drawer when link clicked
        if (window.innerWidth <= 768) {
          closeMobileSidebar();
        }
      });
    });

    // Bind Edit Profile button
    const editProfileBtn = document.getElementById('btn-edit-profile');
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from other standard nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        this.navigate('profile');
        
        // Close mobile drawer when clicked
        if (window.innerWidth <= 768) {
          closeMobileSidebar();
        }
      });
    }

    // Bind sidebar user info card click to navigate to profile settings
    const sidebarUserInfo = document.querySelector('.user-info');
    if (sidebarUserInfo) {
      sidebarUserInfo.addEventListener('click', (e) => {
        e.preventDefault();
        window.cajsGoToProfile();
        
        // Close mobile drawer when clicked
        if (window.innerWidth <= 768) {
          closeMobileSidebar();
        }
      });
    }

    // Subscribe to state changes to automatically re-sync widgets
    State.subscribe(() => {
      this.updateSidebarWidgets();
    });

    // Expose global navigation shortcut
    window.cajsGoToProfile = () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      this.navigate('profile');
      
      // Close mobile drawer when clicked
      if (window.innerWidth <= 768) {
        closeMobileSidebar();
      }
    };

    // --- Desktop Sidebar Collapse Toggle Binding ---
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const appContainer = document.querySelector('.app-container');
    
    // Load saved collapsed state
    const isCollapsed = localStorage.getItem('cajs_sidebar_collapsed') === 'true';
    if (isCollapsed && window.innerWidth > 768 && appContainer) {
      appContainer.classList.add('collapsed');
    }

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (appContainer) {
          appContainer.classList.toggle('collapsed');
          const collapsedNow = appContainer.classList.contains('collapsed');
          localStorage.setItem('cajs_sidebar_collapsed', collapsedNow);
        }
      });
    }

    // --- Mobile Sidebar Sliding Drawer Event Bindings ---
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const mobileSidebarClose = document.getElementById('mobile-sidebar-close');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    const sidebarElement = document.querySelector('.app-sidebar');

    if (mobileSidebarToggle) {
      mobileSidebarToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sidebarElement) sidebarElement.classList.add('open');
        if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
      });
    }

    if (mobileSidebarClose) {
      mobileSidebarClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMobileSidebar();
      });
    }

    if (sidebarBackdrop) {
      sidebarBackdrop.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileSidebar();
      });
    }

    // Dropdown Toggling Behavior
    const floatProfileWidget = document.getElementById('cajs-floating-profile');
    const profileDropdown = document.getElementById('cajs-profile-dropdown');
    const profileTrigger = document.getElementById('cajs-profile-trigger');

    if (floatProfileWidget && profileDropdown && profileTrigger) {
      profileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = profileDropdown.style.display === 'flex';
        profileDropdown.style.display = isOpen ? 'none' : 'flex';
      });

      profileDropdown.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent clicks inside dropdown from closing it
      });

      document.addEventListener('click', () => {
        profileDropdown.style.display = 'none'; // Close when clicking anywhere else
      });

      // Bind dropdown Edit Profile button
      const dropdownEditBtn = document.getElementById('btn-dropdown-edit');
      if (dropdownEditBtn) {
        dropdownEditBtn.addEventListener('click', (e) => {
          e.preventDefault();
          profileDropdown.style.display = 'none';
          window.cajsGoToProfile();
        });
      }

      // Bind dropdown Logout button
      const dropdownLogoutBtn = document.getElementById('btn-dropdown-logout');
      if (dropdownLogoutBtn) {
        dropdownLogoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          profileDropdown.style.display = 'none';
          const logoutBtn = document.getElementById('btn-logout');
          if (logoutBtn) logoutBtn.click();
        });
      }
    }
  },

  navigate(tab) {
    // If navigating away from owner-console, reset welcome popup flag
    if (this.activeTab === 'owner-console' && tab !== 'owner-console') {
      OwnerConsoleModule.hasShownWelcomePopup = false;
    }

    this.activeTab = tab;
    this.viewport.style.opacity = '0';
    
    // Smooth transition
    setTimeout(() => {
      this.renderView(tab);
      this.viewport.style.opacity = '1';
      this.viewport.style.animation = 'fadeIn 0.3s ease-out';
    }, 150);
  },

  renderView(tab) {
    // Clear drawer if open
    document.getElementById('syllabus-drawer').classList.remove('open');
    
    switch(tab) {
      case 'dashboard':
        Dashboard.render(this.viewport);
        break;
      case 'syllabus':
        SyllabusModule.render(this.viewport);
        break;
      case 'pyq-mtp':
        PyqMtpModule.render(this.viewport);
        break;
      case 'revision':
        RevisionModule.render(this.viewport);
        break;
      case 'mistakes':
        MistakesModule.render(this.viewport);
        break;
      case 'doubt-decoder':
        DoubtDecoderModule.render(this.viewport);
        break;
      case 'pomodoro':
        PomodoroModule.render(this.viewport);
        break;
      case 'social':
        SocialModule.render(this.viewport);
        break;
      case 'generator':
        GeneratorModule.render(this.viewport);
        break;
      case 'analytics':
        AnalyticsModule.render(this.viewport);
        break;
      case 'profile':
        ProfileModule.render(this.viewport);
        break;
      case 'owner-console':
        OwnerConsoleModule.render(this.viewport);
        break;
      default:
        Dashboard.render(this.viewport);
    }
  },

  updateSidebarWidgets() {
    const user = State.user;
    if (!user) return;

    // Update Sidebar Profile Widget
    document.getElementById('sw-user-name').textContent = user.fullName;
    document.getElementById('sw-user-level').textContent = `CA ${user.examLevel}`;
    
    const avatarEl = document.getElementById('sw-user-avatar');
    if (user.avatar && user.avatar !== 'letter') {
      avatarEl.innerHTML = `<img src="${user.avatar}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    } else {
      avatarEl.innerHTML = '';
      avatarEl.textContent = user.fullName.charAt(0).toUpperCase();
    }

    // Update Global Floating Top-Right Profile Widget
    const floatName = document.getElementById('floating-user-name');
    if (floatName) floatName.textContent = user.fullName;

    const floatId = document.getElementById('floating-user-id');
    if (floatId) floatId.textContent = `${user.userId || 'CA-STUDENT'} ▾`;
    
    const floatAvatar = document.getElementById('floating-user-avatar');
    if (floatAvatar) {
      if (user.avatar && user.avatar !== 'letter') {
        floatAvatar.innerHTML = `<img src="${user.avatar}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
      } else {
        floatAvatar.innerHTML = '';
        floatAvatar.textContent = user.fullName.charAt(0).toUpperCase();
      }
    }

    // Update Dropdown Details
    const ddName = document.getElementById('dropdown-user-name');
    if (ddName) ddName.textContent = user.fullName;

    const ddId = document.getElementById('dropdown-user-id');
    if (ddId) ddId.textContent = user.userId || 'CA-STUDENT';

    const ddEmail = document.getElementById('dropdown-email');
    if (ddEmail) ddEmail.textContent = user.email;

    const ddPhone = document.getElementById('dropdown-phone');
    if (ddPhone) ddPhone.textContent = user.phone;

    const ddLevel = document.getElementById('dropdown-level');
    if (ddLevel) ddLevel.textContent = `CA ${user.examLevel}`;

    const ddAvatar = document.getElementById('dropdown-user-avatar');
    if (ddAvatar) {
      if (user.avatar && user.avatar !== 'letter') {
        ddAvatar.innerHTML = `<img src="${user.avatar}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
      } else {
        ddAvatar.innerHTML = '';
        ddAvatar.textContent = user.fullName.charAt(0).toUpperCase();
      }
    }

    // Dynamic Owner Console Sidebar Tab for Platform Owner role
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      let ownerTab = navMenu.querySelector('[data-tab="owner-console"]');
      if (user.role === 'owner' || user.email === 'owner@cajs.com') {
        if (!ownerTab) {
          ownerTab = document.createElement('li');
          ownerTab.className = 'nav-item';
          ownerTab.setAttribute('data-tab', 'owner-console');
          ownerTab.innerHTML = `
            <a href="#">
              <span class="nav-icon-emoji">👑</span>
              <span>Owner Console</span>
            </a>
          `;
          navMenu.appendChild(ownerTab);

          // Bind click behavior to dynamic Owner Console tab
          ownerTab.addEventListener('click', (e) => {
            e.preventDefault();
            const navItems = document.querySelectorAll('.nav-menu .nav-item');
            navItems.forEach(nav => nav.classList.remove('active'));
            ownerTab.classList.add('active');
            this.navigate('owner-console');
          });
        }
      } else {
        // If logged in as someone else (like a standard student), ensure the tab is stripped from view
        if (ownerTab) {
          ownerTab.remove();
        }
      }
    }
  }
};

// Function to update registered student count and directory on the landing page
const updateLandingStudentCounter = async () => {
  const gridEl = document.getElementById('landing-students-grid');
  const counterEl = document.getElementById('landing-students-count');
  
  const syncUrl = localStorage.getItem('cajs_database_sync_url') || 'https://script.google.com/macros/s/AKfycbz9X3WAEvymy46wSeP3fNRZ0MJS47UQxVceC2HbzFXEnHN2j-BdJstm0zX0179MBdTw/exec';
  let studentsList = [];

  // 1. Fetch from live Google Sheet if configured
  if (syncUrl) {
    try {
      const response = await fetch(syncUrl);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          // Filter out owner
          studentsList = data.filter(u => u.email !== 'owner@cajs.com' && u.role !== 'owner');
        }
      }
    } catch (e) {
      console.error("Failed to fetch live users for landing page directory:", e);
    }
  }

  // 2. Fallback: check local storage users if syncUrl is missing or returned empty/failed
  if (studentsList.length === 0) {
    const localUsers = State.users || {};
    studentsList = Object.keys(localUsers)
      .filter(email => email !== 'owner@cajs.com')
      .map(email => localUsers[email]);
  }

  // 3. Baseline mock students if there are no registered students yet
  const BASELINE_STUDENTS = [
    {
      fullName: "Aarav Sharma",
      examLevel: "Intermediate",
      registeredAt: "2026-05-15T10:30:00.000Z"
    },
    {
      fullName: "Aditi Patel",
      examLevel: "Foundation",
      registeredAt: "2026-05-20T14:45:00.000Z"
    }
  ];

  // If list is empty, use baseline. Otherwise use the list.
  const finalList = studentsList.length > 0 ? studentsList : BASELINE_STUDENTS;

  // Update counter
  if (counterEl) {
    counterEl.textContent = finalList.length;
  }

  // Render cards
  if (gridEl) {
    gridEl.innerHTML = '';
    finalList.forEach(student => {
      const initial = student.fullName ? student.fullName.charAt(0).toUpperCase() : 'S';
      
      // Format date beautifully
      let formattedDate = 'Joined recently';
      if (student.registeredAt) {
        try {
          const dateObj = new Date(student.registeredAt);
          formattedDate = `Joined ${dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
        } catch (e) {
          // Ignore parse error
        }
      }

      const card = document.createElement('div');
      card.className = 'student-card';
      card.innerHTML = `
        <div class="student-card-avatar">${initial}</div>
        <div class="student-card-details">
          <h4 class="student-card-name">${student.fullName || 'Student'}</h4>
          <span class="student-card-level">CA ${student.examLevel || 'Aspirant'}</span>
          <span class="student-card-date">${formattedDate}</span>
        </div>
      `;
      gridEl.appendChild(card);
    });
  }
};

window.cajsUpdateLandingStudentCounter = updateLandingStudentCounter;

// Bootstrap App
const bootstrap = () => {
  window.cajsModuleLoaded = true;
  State.init();
  Router.init();
  updateLandingStudentCounter();
  
  Auth.init((loggedInUser) => {
    // On login success:
    const landing = document.getElementById('landing-page');
    if (landing) landing.style.display = 'none';
    
    const authPanel = document.getElementById('auth-panel');
    if (authPanel) authPanel.classList.remove('open');
    
    document.getElementById('app-shell').style.display = 'flex';
    Router.updateSidebarWidgets();
    Router.navigate('dashboard');
  });

  const landingPage = document.getElementById('landing-page');
  const authPanel = document.getElementById('auth-panel');
  const appShell = document.getElementById('app-shell');

  if (State.user) {
    // If session is already open:
    if (landingPage) landingPage.style.display = 'none';
    if (authPanel) authPanel.classList.remove('open');
    appShell.style.display = 'flex';
    Router.updateSidebarWidgets();
    Router.navigate('dashboard');
  } else {
    // If not logged in, show landing, hide dashboard
    if (landingPage) landingPage.style.display = 'flex';
    if (authPanel) authPanel.classList.remove('open');
    appShell.style.display = 'none';
  }

  // --- Landing Page Interactive Triggers ---
  const btnLandingLogin = document.getElementById('btn-landing-login');
  const btnHeroLogin = document.getElementById('btn-hero-login');
  const btnHeroStart = document.getElementById('btn-hero-start');
  const btnAuthClose = document.getElementById('btn-auth-close');
  
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  const openAuthModal = (tabType) => {
    if (authPanel) {
      authPanel.classList.add('open');
      if (tabType === 'login' && tabLogin) {
        tabLogin.click();
      } else if (tabType === 'register' && tabRegister) {
        tabRegister.click();
      }
    }
  };

  const closeAuthModal = () => {
    if (authPanel) {
      authPanel.classList.remove('open');
    }
  };

  if (btnLandingLogin) btnLandingLogin.addEventListener('click', () => openAuthModal('login'));
  if (btnHeroLogin) btnHeroLogin.addEventListener('click', () => openAuthModal('login'));
  if (btnHeroStart) btnHeroStart.addEventListener('click', () => openAuthModal('register'));
  if (btnAuthClose) btnAuthClose.addEventListener('click', closeAuthModal);

  // Close modal when clicking on the blurred backdrop outside the card
  if (authPanel) {
    authPanel.addEventListener('click', (e) => {
      if (e.target === authPanel) {
        closeAuthModal();
      }
    });
  }
};

// Robust bootstrapper check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
