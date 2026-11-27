// CA JS Application State Management
import { SEED_FRIENDS, SYLLABUS_DATA } from './seedData.js';
import { CONFIG } from './config.js';

export const SafeStorage = {
  _memStore: {},
  getItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn(`SafeStorage: Failed to get item for key "${key}":`, e);
      return this._memStore[key] || null;
    }
  },
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`SafeStorage: Failed to set item for key "${key}":`, e);
      this._memStore[key] = String(value);
    }
  },
  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`SafeStorage: Failed to remove item for key "${key}":`, e);
      delete this._memStore[key];
    }
  }
};

const localStorage = SafeStorage;

const STORAGE_KEYS = {
  USER_SESSION: 'cajs_user_session',
  USERS_DB: 'cajs_users_db',
  FRIENDS_DB: 'cajs_friends_db',
  MISTAKES_DB: 'cajs_mistakes_db',
  PAPERS_DB: 'cajs_papers_db',
  STUDY_STATS: 'cajs_study_stats',
  CALENDAR_DB: 'cajs_calendar_db',
  COMPLETED_CHAPTERS: 'cajs_completed_chapters',
  REVISIONS: 'cajs_revisions',
  UPLOADED_MATERIALS: 'cajs_uploaded_materials',
  EVALUATIONS: 'cajs_evaluations'
};

export const State = {
  user: null,
  users: {},
  friends: [],
  mistakes: [],
  completedChapters: {},
  revisions: {},
  uploadedMaterials: {},
  evaluations: [],
  papers: [],
  customPapers: [],
  studyLogs: [],
  studyStats: {
    points: 100,
    streak: 0,
    weeklyStreak: 0,
    lastStudyDate: null,
    totalMinutes: 0,
    dailyMinutes: {}
  },
  calendar: null,

  init() {
    // Initialize default sync URL if not set
    if (!localStorage.getItem('cajs_database_sync_url')) {
      localStorage.setItem('cajs_database_sync_url', CONFIG.DEFAULT_SYNC_URL);
    }

    // 1. Load users database from localStorage
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS_DB);
      this.users = (rawUsers && JSON.parse(rawUsers)) || {};
    } catch (e) {
      console.error("Failed to parse users database:", e);
      this.users = {};
    }

    let databaseUpdated = false;

    // Remove legacy demo student account if present
    if (this.users && this.users["student@cajs.com"]) {
      delete this.users["student@cajs.com"];
      databaseUpdated = true;
    }

    // Ensure owner account exists
    if (this.users && !this.users["owner@cajs.com"]) {
      this.users["owner@cajs.com"] = {
        fullName: "Platform Owner",
        email: "owner@cajs.com",
        phone: "9999999999",
        examLevel: "Final",
        password: "OwnerPassword123",
        userId: "CA-OWNER",
        role: "owner",
        registeredAt: "2026-05-01T09:00:00.000Z",
        avatar: "letter",
        gender: "male"
      };
      databaseUpdated = true;
    }

    if (databaseUpdated && this.users) {
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));
    }

    // Ensure all users have sequential series CA IDs (CA-1001, CA-1002, CA-1003...)
    this.ensureSequentialUserIds();

    // 2. Load active session
    try {
      const rawSession = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
      if (rawSession) {
        const email = JSON.parse(rawSession);
        if (this.users && this.users[email]) {
          this.user = this.users[email];
          this.loadUserData(email);
        } else {
          localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
        }
      }
    } catch (e) {
      console.error("Failed to parse active session:", e);
      this.user = null;
    }

    // 3. Load friends database
    const OLD_DEMO_IDS = ['CA-10492', 'CA-95281', 'CA-30948', 'CA-48210', 'CA-74921'];
    try {
      const rawFriends = localStorage.getItem(STORAGE_KEYS.FRIENDS_DB);
      if (rawFriends) {
        const allFriends = JSON.parse(rawFriends);
        this.friends = (allFriends && Array.isArray(allFriends)) ? allFriends.filter(f => f && f.id && !OLD_DEMO_IDS.includes(f.id)) : [];
      } else {
        this.friends = [];
      }
    } catch (e) {
      console.error("Failed to parse friends database:", e);
      this.friends = [];
    }
    localStorage.setItem(STORAGE_KEYS.FRIENDS_DB, JSON.stringify(this.friends));

    // 4. Async sync all registered users from Google Sheet to ensure all 55+ students are populated
    this.syncUsersFromSheet().catch(e => console.warn("Background user sync error:", e));
  },

  ensureSequentialUserIds() {
    if (!this.users) return;
    const emails = Object.keys(this.users);
    let seq = 1001;
    emails.forEach(email => {
      const u = this.users[email];
      if (u) {
        if (email === 'owner@cajs.com' || u.role === 'owner') {
          u.userId = 'CA-OWNER';
        } else if (!u.userId || u.userId === 'CA-OWNER' || u.userId.length > 8 || !u.userId.match(/^CA-\d{4,}$/)) {
          u.userId = `CA-${seq}`;
          seq++;
        } else {
          const matches = u.userId.match(/^CA-(\d+)$/);
          if (matches) {
            const num = parseInt(matches[1], 10);
            if (!isNaN(num) && num >= seq) {
              seq = num + 1;
            }
          }
        }
      }
    });
    if (this.user && this.users[this.user.email]) {
      this.user.userId = this.users[this.user.email].userId;
    }
  },

  loadUserData(email, opts = {}) {
    const userPrefix = `_${email}`;

    try {
      const chapters = localStorage.getItem(STORAGE_KEYS.COMPLETED_CHAPTERS + userPrefix);
      this.completedChapters = (chapters && JSON.parse(chapters)) || {};

      const revs = localStorage.getItem(STORAGE_KEYS.REVISIONS + userPrefix);
      this.revisions = (revs && JSON.parse(revs)) || {};

      const materials = localStorage.getItem(STORAGE_KEYS.UPLOADED_MATERIALS + userPrefix);
      this.uploadedMaterials = (materials && JSON.parse(materials)) || {};

      const evals = localStorage.getItem(STORAGE_KEYS.EVALUATIONS + userPrefix);
      this.evaluations = (evals && JSON.parse(evals)) || [];

      const rawMistakes = localStorage.getItem(STORAGE_KEYS.MISTAKES_DB + userPrefix);
      this.mistakes = (rawMistakes && JSON.parse(rawMistakes)) || [];

      const rawPapers = localStorage.getItem(STORAGE_KEYS.PAPERS_DB + userPrefix);
      this.papers = (rawPapers && JSON.parse(rawPapers)) || [];

      const rawStats = localStorage.getItem(STORAGE_KEYS.STUDY_STATS + userPrefix);
      this.studyStats = (rawStats && JSON.parse(rawStats)) || {
        points: 100,
        streak: 0,
        weeklyStreak: 0,
        lastStudyDate: null,
        totalMinutes: 0,
        dailyMinutes: {}
      };

      const rawCalendar = localStorage.getItem(STORAGE_KEYS.CALENDAR_DB + userPrefix);
      this.calendar = (rawCalendar && JSON.parse(rawCalendar)) || null;

      const rawCustomPapers = localStorage.getItem('cajs_custom_papers_' + email);
      this.customPapers = (rawCustomPapers && JSON.parse(rawCustomPapers)) || [];

      const rawLogs = localStorage.getItem('cajs_study_logs_' + email);
      this.studyLogs = (rawLogs && JSON.parse(rawLogs)) || [];

      if (!opts.skipStreakCheck) {
        // Auto-check daily streak and claim daily check-in bonus upon loading user session
        this.checkAndUpdateStreak();
      }
    } catch (e) {
      console.error("Failed to load user data for:", email, e);
    }
  },

  buildAccountSnapshot(email) {
    const userPrefix = `_${email}`;
    const isCurrent = this.user && this.user.email === email;
    const readJson = (key, fallback) => {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    };

    const updatedAt = Number(localStorage.getItem('cajs_account_updated_' + email) || Date.now());
    const u = this.users?.[email] || {};
    const snapshot = {
      updatedAt,
      avatar: (isCurrent ? this.user?.avatar : u.avatar) || 'letter',
      completedChapters: isCurrent ? this.completedChapters : readJson(STORAGE_KEYS.COMPLETED_CHAPTERS + userPrefix, {}),
      revisions: isCurrent ? this.revisions : readJson(STORAGE_KEYS.REVISIONS + userPrefix, {}),
      mistakes: (isCurrent ? this.mistakes : readJson(STORAGE_KEYS.MISTAKES_DB + userPrefix, [])).slice(-50),
      papers: (isCurrent ? this.papers : readJson(STORAGE_KEYS.PAPERS_DB + userPrefix, [])).slice(-50),
      customPapers: (isCurrent ? this.customPapers : readJson('cajs_custom_papers_' + email, [])).slice(-15),
      studyLogs: (isCurrent ? this.studyLogs : readJson('cajs_study_logs_' + email, [])).slice(-60),
      studyStats: isCurrent ? this.studyStats : readJson(STORAGE_KEYS.STUDY_STATS + userPrefix, { points: u.points ?? 100, streak: u.streak ?? 0, totalMinutes: u.totalMinutes ?? 0, dailyMinutes: {} }),
      calendar: isCurrent ? this.calendar : readJson(STORAGE_KEYS.CALENDAR_DB + userPrefix, null),
      evaluations: (isCurrent ? this.evaluations : readJson(STORAGE_KEYS.EVALUATIONS + userPrefix, [])).slice(-20),
      followedIds: readJson(`cajs_followed_${email}`, [])
    };

    let serialized = JSON.stringify(snapshot);
    if (serialized.length > 42000) {
      snapshot.evaluations = [];
      snapshot.customPapers = [];
      serialized = JSON.stringify(snapshot);
    }
    if (serialized.length > 42000) {
      snapshot.studyLogs = snapshot.studyLogs.slice(-20);
      snapshot.mistakes = snapshot.mistakes.slice(-20);
      serialized = JSON.stringify(snapshot);
    }
    return serialized;
  },

  applyAccountSnapshot(email, sheetUser) {
    if (!sheetUser || !email) return false;
    const userPrefix = `_${email}`;
    const localUpdatedAt = Number(localStorage.getItem('cajs_account_updated_' + email) || 0);
    let applied = false;

    if (sheetUser.accountData) {
      try {
        const snap = typeof sheetUser.accountData === 'string'
          ? JSON.parse(sheetUser.accountData)
          : sheetUser.accountData;

        if (snap && typeof snap === 'object') {
          const remoteUpdatedAt = Number(snap.updatedAt || 0);
          if (!localUpdatedAt || remoteUpdatedAt >= localUpdatedAt) {
            if (snap.completedChapters) localStorage.setItem(STORAGE_KEYS.COMPLETED_CHAPTERS + userPrefix, JSON.stringify(snap.completedChapters));
            if (snap.revisions) localStorage.setItem(STORAGE_KEYS.REVISIONS + userPrefix, JSON.stringify(snap.revisions));
            if (snap.mistakes) localStorage.setItem(STORAGE_KEYS.MISTAKES_DB + userPrefix, JSON.stringify(snap.mistakes));
            if (snap.papers) localStorage.setItem(STORAGE_KEYS.PAPERS_DB + userPrefix, JSON.stringify(snap.papers));
            if (snap.customPapers) localStorage.setItem('cajs_custom_papers_' + email, JSON.stringify(snap.customPapers));
            if (snap.studyLogs) localStorage.setItem('cajs_study_logs_' + email, JSON.stringify(snap.studyLogs));
            if (snap.studyStats) localStorage.setItem(STORAGE_KEYS.STUDY_STATS + userPrefix, JSON.stringify(snap.studyStats));
            if (snap.calendar !== undefined) localStorage.setItem(STORAGE_KEYS.CALENDAR_DB + userPrefix, JSON.stringify(snap.calendar));
            if (snap.evaluations) localStorage.setItem(STORAGE_KEYS.EVALUATIONS + userPrefix, JSON.stringify(snap.evaluations));
            if (snap.followedIds) localStorage.setItem(`cajs_followed_${email}`, JSON.stringify(snap.followedIds));
            if (snap.avatar && this.users?.[email]) this.users[email].avatar = snap.avatar;
            if (remoteUpdatedAt) localStorage.setItem('cajs_account_updated_' + email, String(remoteUpdatedAt));
            applied = true;
          }
        }
      } catch (e) {
        console.warn("Could not parse remote accountData:", e);
      }
    }

    // Fallback: even if accountData column isn't present, sync flat points/streak/minutes onto new device
    if (!applied && (sheetUser.points !== undefined && sheetUser.points !== '')) {
      const sheetPts = Number(sheetUser.points);
      if (!Number.isNaN(sheetPts)) {
        let localStats = null;
        try {
          const raw = localStorage.getItem(STORAGE_KEYS.STUDY_STATS + userPrefix);
          if (raw) localStats = JSON.parse(raw);
        } catch {}
        if (!localStats || sheetPts > (localStats.points ?? 0)) {
          const merged = {
            points: sheetPts,
            streak: Number(sheetUser.streak) || localStats?.streak || 0,
            weeklyStreak: localStats?.weeklyStreak || 0,
            lastStudyDate: localStats?.lastStudyDate || null,
            lastDailyBonusDate: localStats?.lastDailyBonusDate || null,
            totalMinutes: Number(sheetUser.totalMinutes) || localStats?.totalMinutes || 0,
            dailyMinutes: localStats?.dailyMinutes || {},
            dailyPoints: localStats?.dailyPoints || {}
          };
          localStorage.setItem(STORAGE_KEYS.STUDY_STATS + userPrefix, JSON.stringify(merged));
          applied = true;
        }
      }
    }

    return applied;
  },

  saveUserData() {
    if (!this.user) return;
    const email = this.user.email;
    const userPrefix = `_${email}`;

    if (this.users) {
      this.users[email] = this.user;
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));
    }

    localStorage.setItem(STORAGE_KEYS.COMPLETED_CHAPTERS + userPrefix, JSON.stringify(this.completedChapters));
    localStorage.setItem(STORAGE_KEYS.REVISIONS + userPrefix, JSON.stringify(this.revisions));
    localStorage.setItem(STORAGE_KEYS.UPLOADED_MATERIALS + userPrefix, JSON.stringify(this.uploadedMaterials));
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS + userPrefix, JSON.stringify(this.evaluations));
    localStorage.setItem(STORAGE_KEYS.MISTAKES_DB + userPrefix, JSON.stringify(this.mistakes));
    localStorage.setItem(STORAGE_KEYS.PAPERS_DB + userPrefix, JSON.stringify(this.papers));
    localStorage.setItem(STORAGE_KEYS.STUDY_STATS + userPrefix, JSON.stringify(this.studyStats));
    localStorage.setItem(STORAGE_KEYS.CALENDAR_DB + userPrefix, JSON.stringify(this.calendar));
    localStorage.setItem('cajs_custom_papers_' + email, JSON.stringify(this.customPapers));
    localStorage.setItem('cajs_study_logs_' + email, JSON.stringify(this.studyLogs));
    localStorage.setItem('cajs_account_updated_' + email, String(Date.now()));

    if (this.users && this.users[email]) {
      this.users[email].points = this.studyStats?.points ?? 100;
      this.users[email].streak = this.studyStats?.streak ?? 0;
      this.users[email].completedCount = Object.keys(this.completedChapters || {}).length;
      this.users[email].totalMinutes = this.studyStats?.totalMinutes ?? 0;
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));
    }

    if (!this._suppressSync) {
      this.scheduleStatsSync(email);
    }
  },

  _statsSyncTimer: null,
  _suppressSync: false,

  scheduleStatsSync(email) {
    if (!email) return;
    if (this._statsSyncTimer) clearTimeout(this._statsSyncTimer);
    this._statsSyncTimer = setTimeout(() => {
      this.syncUserStatsToSheet(email);
    }, 1500);
  },

  syncUserStatsToSheet(email, statsOverride = null) {
    const syncUrl = localStorage.getItem('cajs_database_sync_url') || CONFIG.DEFAULT_SYNC_URL;
    if (!syncUrl || !email) return;

    const u = this.users?.[email] || {};
    const isCurrent = this.user && this.user.email === email;
    const points = statsOverride?.points ?? (isCurrent ? this.studyStats?.points : u.points) ?? 100;
    const streak = statsOverride?.streak ?? (isCurrent ? this.studyStats?.streak : u.streak) ?? 0;
    const totalMinutes = statsOverride?.totalMinutes ?? (isCurrent ? this.studyStats?.totalMinutes : u.totalMinutes) ?? 0;
    const completedCount = statsOverride?.completedCount ?? (isCurrent ? Object.keys(this.completedChapters || {}).length : u.completedCount) ?? 0;
    const accountData = this.buildAccountSnapshot(email);

    fetch(syncUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'updateStats',
        user: {
          email,
          fullName: (isCurrent ? this.user?.fullName : u.fullName) || u.fullName || '',
          phone: (isCurrent ? this.user?.phone : u.phone) || u.phone || '',
          examLevel: (isCurrent ? this.user?.examLevel : u.examLevel) || u.examLevel || '',
          userId: u.userId || '',
          password: u.password || '',
          points,
          streak,
          completedCount,
          totalMinutes,
          accountData
        }
      })
    }).catch(e => {
      console.warn("Google Sheet stats sync failed:", e);
    });
  },

  registerUser(fullName, email, phone, examLevel, password) {
    if (this.users[email]) {
      throw new Error("Email ID is already registered.");
    }

    const count = Object.keys(this.users).length;
    const nextSeq = 1001 + count;
    const userId = `CA-${nextSeq}`;
    const newUser = {
      fullName,
      email,
      phone,
      examLevel,
      password,
      userId,
      points: 100,
      streak: 0,
      completedCount: 0,
      totalMinutes: 0,
      registeredAt: new Date().toISOString()
    };

    // Save to localStorage first
    this.users[email] = newUser;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));

    // Sync to Google Sheet (including password and initial points for Owner Console)
    const syncUrl = localStorage.getItem('cajs_database_sync_url') || CONFIG.DEFAULT_SYNC_URL;
    if (syncUrl) {
      fetch(syncUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', user: newUser })
      }).then(() => {
        console.log("Registration synced to Google Sheet.");
      }).catch(e => {
        console.warn("Google Sheet sync failed (registration still saved locally):", e);
      });
    }

    return newUser;
  },

  // ✅ Fetch all users from Google Sheet for cross-device login (with fast timeout)
  async fetchUsersFromSheet() {
    const syncUrl = localStorage.getItem('cajs_database_sync_url') || CONFIG.DEFAULT_SYNC_URL;
    if (!syncUrl) return [];
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 4500) : null;
    try {
      const response = await fetch(syncUrl, controller ? { signal: controller.signal } : undefined);
      if (!response.ok) return [];
      const data = await response.json();
      if (Array.isArray(data)) return data;
      return [];
    } catch (e) {
      console.warn("Could not fetch users from Google Sheet:", e);
      return [];
    } finally {
      if (timer) clearTimeout(timer);
    }
  },

  // ✅ Sync live registered users and active session data from Google Sheet into State
  async syncUsersFromSheet() {
    const data = await this.fetchUsersFromSheet();
    if (Array.isArray(data) && data.length > 0) {
      let updated = false;
      let activeSessionHydrated = false;

      data.forEach(u => {
        if (u && u.email) {
          if (!this.users[u.email]) {
            this.users[u.email] = {
              fullName: u.fullName || 'Student',
              email: u.email,
              phone: u.phone || 'N/A',
              examLevel: u.examLevel || 'Intermediate',
              password: u.password || '',
              userId: u.userId || '',
              points: u.points !== undefined && u.points !== '' ? Number(u.points) : 100,
              streak: u.streak !== undefined && u.streak !== '' ? Number(u.streak) : 0,
              completedCount: u.completedCount !== undefined && u.completedCount !== '' ? Number(u.completedCount) : 0,
              totalMinutes: u.totalMinutes !== undefined && u.totalMinutes !== '' ? Number(u.totalMinutes) : 0,
              registeredAt: u.registeredAt || new Date().toISOString(),
              role: u.email === 'owner@cajs.com' ? 'owner' : 'student'
            };
            updated = true;
          } else {
            if (u.fullName && u.fullName !== 'Anonymous' && u.fullName !== this.users[u.email].fullName) {
              this.users[u.email].fullName = u.fullName;
              updated = true;
            }
            if (u.phone && u.phone !== 'N/A' && !this.users[u.email].phone) {
              this.users[u.email].phone = u.phone;
              updated = true;
            }
            if (u.password && u.password !== this.users[u.email].password) {
              this.users[u.email].password = u.password;
              updated = true;
            }
            if (u.userId && !this.users[u.email].userId) {
              this.users[u.email].userId = u.userId;
              updated = true;
            }
            if (u.examLevel && u.examLevel !== this.users[u.email].examLevel) {
              this.users[u.email].examLevel = u.examLevel;
              updated = true;
            }
            if (u.points !== undefined && u.points !== '') {
              const sheetPts = Number(u.points);
              if (!Number.isNaN(sheetPts) && sheetPts !== this.users[u.email].points) {
                this.users[u.email].points = sheetPts;
                updated = true;
              }
            }
            if (u.streak !== undefined && u.streak !== '') {
              this.users[u.email].streak = Number(u.streak) || 0;
              updated = true;
            }
            if (u.completedCount !== undefined && u.completedCount !== '') {
              this.users[u.email].completedCount = Number(u.completedCount) || 0;
              updated = true;
            }
            if (u.totalMinutes !== undefined && u.totalMinutes !== '') {
              this.users[u.email].totalMinutes = Number(u.totalMinutes) || 0;
              updated = true;
            }
          }

          if (this.applyAccountSnapshot(u.email, u) && this.user && this.user.email === u.email) {
            activeSessionHydrated = true;
          }
        }
      });

      this.ensureSequentialUserIds();

      if (activeSessionHydrated && this.user) {
        this.user = this.users[this.user.email] || this.user;
        this.loadUserData(this.user.email, { skipStreakCheck: true });
        updated = true;
      }

      if (updated) {
        localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));
        this.notifyStateChange();
      }
    }
    return data;
  },

  // ✅ Cross-device login: verifies credentials and pulls latest account state from Google Sheet
  async loginUser(email, password) {
    const cleanEmail = String(email || '').trim();
    const localKey = Object.keys(this.users || {}).find(k => k.toLowerCase() === cleanEmail.toLowerCase()) || cleanEmail;
    const localUser = this.users[localKey];

    // Fetch latest accounts & snapshots from Google Sheet so logging in on another system syncs everything
    const sheetUsers = await this.fetchUsersFromSheet();
    const sheetUser = sheetUsers.find(u => u && u.email && u.email.toLowerCase() === cleanEmail.toLowerCase());

    if (!sheetUser && !localUser) {
      throw new Error("No user found with this Email/Username.");
    }

    if (sheetUser) {
      const targetEmail = sheetUser.email;
      const expectedPassword = sheetUser.password || localUser?.password || '';
      if (expectedPassword && expectedPassword !== password) {
        throw new Error("Incorrect password.");
      }
      if (!expectedPassword && localUser && !localUser.password) {
        throw new Error("Incorrect password.");
      }

      const mergedUser = {
        ...(localUser || {}),
        fullName: sheetUser.fullName || localUser?.fullName || 'Student',
        email: targetEmail,
        phone: sheetUser.phone || localUser?.phone || 'N/A',
        examLevel: sheetUser.examLevel || localUser?.examLevel || 'Intermediate',
        userId: sheetUser.userId || localUser?.userId || '',
        password: expectedPassword || password,
        points: sheetUser.points !== undefined && sheetUser.points !== '' ? Number(sheetUser.points) : (localUser?.points ?? 100),
        streak: sheetUser.streak !== undefined && sheetUser.streak !== '' ? Number(sheetUser.streak) : (localUser?.streak ?? 0),
        completedCount: sheetUser.completedCount !== undefined && sheetUser.completedCount !== '' ? Number(sheetUser.completedCount) : (localUser?.completedCount ?? 0),
        totalMinutes: sheetUser.totalMinutes !== undefined && sheetUser.totalMinutes !== '' ? Number(sheetUser.totalMinutes) : (localUser?.totalMinutes ?? 0),
        registeredAt: sheetUser.registeredAt || localUser?.registeredAt || new Date().toISOString(),
        role: targetEmail === 'owner@cajs.com' ? 'owner' : (localUser?.role || 'student')
      };

      this.users[targetEmail] = mergedUser;
      this.ensureSequentialUserIds();
      this._suppressSync = true;
      this.applyAccountSnapshot(targetEmail, sheetUser);
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));

      this.user = this.users[targetEmail];
      localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(targetEmail));
      this.loadUserData(targetEmail);
      this._suppressSync = false;
      return this.user;
    }

    // Offline / local fallback when Google Sheet is unreachable or account only exists locally
    if (localUser && localUser.password === password) {
      this.user = localUser;
      localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(localKey));
      this.loadUserData(localKey);
      return localUser;
    }

    throw new Error("Incorrect password.");
  },

  resetPassword(email, newPassword) {
    const matchedUser = this.users[email];
    if (!matchedUser) {
      throw new Error("No user found with this Email ID.");
    }
    matchedUser.password = newPassword;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));
    if (this.user && this.user.email === email) {
      this.user.password = newPassword;
    }
    this.syncUserStatsToSheet(email);
    this.notifyStateChange();
    return matchedUser;
  },

  logoutUser() {
    this.user = null;
    this.completedChapters = {};
    this.revisions = {};
    this.uploadedMaterials = {};
    this.evaluations = [];
    this.mistakes = [];
    this.papers = [];
    this.customPapers = [];
    this.studyLogs = [];
    this.studyStats = { points: 0, streak: 0, totalMinutes: 0, dailyMinutes: {} };
    this.calendar = null;
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
  },

  adminAddPointsToUser(email, pointsToAdd) {
    if (!this.users[email]) return;
    const statsKey = `${STORAGE_KEYS.STUDY_STATS}_${email}`;
    let stats = { points: this.users[email].points ?? 100, streak: this.users[email].streak ?? 0, weeklyStreak: 0, lastStudyDate: null, totalMinutes: this.users[email].totalMinutes ?? 0, dailyMinutes: {} };
    try {
      const rawStats = localStorage.getItem(statsKey);
      if (rawStats) stats = JSON.parse(rawStats);
    } catch (e) {
      console.error(e);
    }
    const basePoints = (stats.points !== undefined && stats.points !== null) ? Number(stats.points) : (this.users[email].points ?? 100);
    stats.points = Math.max(0, basePoints + pointsToAdd);
    localStorage.setItem(statsKey, JSON.stringify(stats));

    this.users[email].points = stats.points;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));

    if (this.user && this.user.email === email) {
      this.studyStats.points = stats.points;
    }
    this.syncUserStatsToSheet(email, { points: stats.points });
    this.notifyStateChange();
  },

  adminChangeUserLevel(email, newLevel) {
    if (!this.users[email]) return;
    this.users[email].examLevel = newLevel;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));

    if (this.user && this.user.email === email) {
      this.user.examLevel = newLevel;
    }
    this.notifyStateChange();
  },

  adminDeleteUser(email) {
    if (!this.users[email]) return;
    if (email === 'owner@cajs.com') {
      throw new Error("Cannot delete the platform owner account!");
    }
    delete this.users[email];
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));

    const userPrefix = `_${email}`;
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_CHAPTERS + userPrefix);
    localStorage.removeItem(STORAGE_KEYS.REVISIONS + userPrefix);
    localStorage.removeItem(STORAGE_KEYS.UPLOADED_MATERIALS + userPrefix);
    localStorage.removeItem(STORAGE_KEYS.EVALUATIONS + userPrefix);
    localStorage.removeItem(STORAGE_KEYS.MISTAKES_DB + userPrefix);
    localStorage.removeItem(STORAGE_KEYS.PAPERS_DB + userPrefix);
    localStorage.removeItem(STORAGE_KEYS.STUDY_STATS + userPrefix);
    localStorage.removeItem(STORAGE_KEYS.CALENDAR_DB + userPrefix);
    localStorage.removeItem('cajs_custom_papers_' + email);

    this.notifyStateChange();
  },

  toggleChapter(chapterId) {
    if (this.completedChapters[chapterId]) {
      delete this.completedChapters[chapterId];
      this.addPoints(-15);
    } else {
      this.completedChapters[chapterId] = true;
      this.addPoints(30);
    }
    this.saveUserData();
    this.notifyStateChange();
  },

  toggleRevisionCheck(chapterId, revKey) {
    if (!this.revisions[chapterId]) {
      this.revisions[chapterId] = { r1: false, r2: false, r3: false };
    }
    const stateVal = !this.revisions[chapterId][revKey];
    this.revisions[chapterId][revKey] = stateVal;
    this.addPoints(stateVal ? 15 : -15);
    this.saveUserData();
    this.notifyStateChange();
  },

  addUploadedMaterial(chapterId, fileName, fileSize, extractedText = '') {
    if (!this.uploadedMaterials[chapterId]) {
      this.uploadedMaterials[chapterId] = [];
    }
    this.uploadedMaterials[chapterId].push({
      name: fileName,
      size: fileSize,
      date: new Date().toLocaleDateString('en-US'),
      text: extractedText ? String(extractedText).slice(0, 60000) : ''
    });
    this.addPoints(15);
    this.saveUserData();
    this.notifyStateChange();
    if (typeof window !== 'undefined' && window.cajsResetDecoderCache) {
      window.cajsResetDecoderCache();
    }
  },

  addEvaluation(evalObj) {
    this.evaluations.push(evalObj);
    this.saveUserData();
    this.notifyStateChange();
  },

  addMistake(question, subject, chapter, notes, difficulty) {
    const newMistake = {
      id: "mistake_" + Date.now(),
      question, subject, chapter, notes, difficulty,
      addedDate: new Date().toISOString(),
      resolved: false
    };
    this.mistakes.push(newMistake);
    this.saveUserData();
    this.notifyStateChange();
  },

  resolveMistake(mistakeId) {
    const mistake = this.mistakes.find(m => m.id === mistakeId);
    if (mistake) {
      mistake.resolved = !mistake.resolved;
      this.addPoints(mistake.resolved ? 20 : -20);
      this.saveUserData();
      this.notifyStateChange();
    }
  },

  deleteMistake(mistakeId) {
    const idx = this.mistakes.findIndex(m => m.id === mistakeId);
    if (idx !== -1) {
      this.mistakes.splice(idx, 1);
      this.saveUserData();
      this.notifyStateChange();
    }
  },

  clearAllMistakes() {
    this.mistakes = [];
    this.saveUserData();
    this.notifyStateChange();
  },

  addPaper(paper) {
    this.papers.push(paper);
    this.addPoints(paper.score * 10 + 50);
    this.saveUserData();
    this.notifyStateChange();
  },

  addCustomPaper(type, year, subject, title, pdfUrl, questions = null) {
    const newPaper = {
      id: "custom_" + Date.now(),
      type, year: parseInt(year), subject, title, pdfUrl, questions
    };
    this.customPapers.push(newPaper);
    this.addPoints(50);
    this.saveUserData();
    this.notifyStateChange();
    return newPaper;
  },

  getTodayStr() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  getYesterdayStr() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  getTodayPoints() {
    const today = this.getTodayStr();
    if (!this.studyStats.dailyPoints) return 0;
    return this.studyStats.dailyPoints[today] || 0;
  },

  getTodayMinutes() {
    const today = this.getTodayStr();
    if (!this.studyStats.dailyMinutes) return 0;
    return this.studyStats.dailyMinutes[today] || 0;
  },

  addStudyTime(minutes) {
    this.studyStats.totalMinutes += minutes;
    const today = this.getTodayStr();
    if (!this.studyStats.dailyMinutes) this.studyStats.dailyMinutes = {};
    this.studyStats.dailyMinutes[today] = (this.studyStats.dailyMinutes[today] || 0) + minutes;
    this.addPoints(Math.round(minutes * 2));
    this.checkAndUpdateStreak();
    this.saveUserData();
    this.notifyStateChange();
  },

  addPoints(amt) {
    if (!amt) return;
    this.studyStats.points = Math.max(0, (this.studyStats.points || 0) + amt);
    const today = this.getTodayStr();
    if (!this.studyStats.dailyPoints) this.studyStats.dailyPoints = {};
    if (amt > 0) {
      this.studyStats.dailyPoints[today] = (this.studyStats.dailyPoints[today] || 0) + amt;
    }
    this.saveUserData();
  },

  checkAndUpdateStreak() {
    const todayStr = this.getTodayStr();
    const lastDate = this.studyStats.lastStudyDate;

    if (!lastDate) {
      this.studyStats.streak = 1;
      this.studyStats.lastStudyDate = todayStr;
      this.saveUserData();
      this.claimDailyCheckinBonus();
    } else if (lastDate !== todayStr) {
      const yesterdayStr = this.getYesterdayStr();

      if (lastDate === yesterdayStr) {
        this.studyStats.streak += 1;
      } else {
        this.studyStats.streak = 1;
      }
      this.studyStats.lastStudyDate = todayStr;
      this.saveUserData();
      this.claimDailyCheckinBonus();
    }
  },

  claimDailyCheckinBonus() {
    const todayStr = this.getTodayStr();
    if (this.studyStats.lastDailyBonusDate !== todayStr) {
      this.studyStats.lastDailyBonusDate = todayStr;
      const bonusPoints = 25;
      this.addPoints(bonusPoints);
      this.saveUserData();
      setTimeout(() => {
        if (window.cajsShowAlert) {
          window.cajsShowAlert("🎁 Daily Check-in Bonus!", `You earned +${bonusPoints} Study Points for logging in today! Keep your ${this.studyStats.streak}-day streak going! 🔥`, "success");
        }
      }, 650);
    }
  },

  setCalendar(examDate, subjects, schedule) {
    this.calendar = { examDate, subjects, schedule };
    this.addPoints(50);
    this.saveUserData();
    this.notifyStateChange();
  },

  toggleCalendarItem(index) {
    if (this.calendar && this.calendar.schedule[index]) {
      const item = this.calendar.schedule[index];
      item.done = !item.done;
      this.addPoints(item.done ? 25 : -25);
      this.saveUserData();
      this.notifyStateChange();
    }
  },

  getFollowedUserIds() {
    if (!this.user) return [];
    try {
      const raw = localStorage.getItem(`cajs_followed_${this.user.email}`);
      return (raw && JSON.parse(raw)) || [];
    } catch (e) {
      return [];
    }
  },

  toggleFollowUser(targetUserId) {
    if (!this.user) return false;
    if (this.user && targetUserId === this.user.userId) {
      throw new Error("You cannot follow yourself!");
    }
    let followed = this.getFollowedUserIds();
    const idx = followed.indexOf(targetUserId);
    let isNowFollowed = false;
    if (idx !== -1) {
      followed.splice(idx, 1);
      isNowFollowed = false;
    } else {
      followed.push(targetUserId);
      isNowFollowed = true;
    }
    localStorage.setItem(`cajs_followed_${this.user.email}`, JSON.stringify(followed));

    // Legacy compatibility with friends array
    let friend = this.friends.find(f => f.id === targetUserId);
    if (!friend) {
      const all = this.getAllLeaderboardUsers();
      const matched = all.find(u => u.id === targetUserId);
      if (matched) {
        friend = { id: matched.id, name: matched.name, level: matched.level, points: matched.points, streak: matched.streak, isFollowed: isNowFollowed };
        this.friends.push(friend);
      }
    } else {
      friend.isFollowed = isNowFollowed;
    }
    localStorage.setItem(STORAGE_KEYS.FRIENDS_DB, JSON.stringify(this.friends));

    this.notifyStateChange();
    return isNowFollowed;
  },

  isUserFollowed(targetUserId) {
    const followed = this.getFollowedUserIds();
    if (followed.includes(targetUserId)) return true;
    const friend = this.friends.find(f => f.id === targetUserId);
    return friend ? !!friend.isFollowed : false;
  },

  getAllLeaderboardUsers() {
    this.ensureSequentialUserIds();

    const listMap = new Map();

    // Add all original registered users from State.users ONLY
    if (this.users) {
      Object.keys(this.users).forEach(email => {
        const u = this.users[email];
        if (!u) return;

        const isMe = this.user && this.user.email === email;
        const uid = u.userId || "CA-1001";

        let pts = 100;
        let streakVal = 0;
        if (isMe) {
          pts = this.studyStats.points || 100;
          streakVal = this.studyStats.streak || 0;
        } else {
          try {
            const raw = localStorage.getItem(`cajs_study_stats_${email}`);
            if (raw) {
              const parsed = JSON.parse(raw);
              pts = parsed.points || 100;
              streakVal = parsed.streak || 0;
            } else {
              // Generate realistic score variation for registered students without local stats
              const charSum = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
              pts = 120 + (charSum % 35) * 40;
              streakVal = (charSum % 9) + 1;
            }
          } catch (e) { }
        }

        listMap.set(uid, {
          id: uid,
          name: u.fullName + (isMe ? " (You)" : ""),
          email: u.email,
          level: u.examLevel || "Intermediate",
          points: pts,
          streak: streakVal,
          progress: isMe ? this.getReadinessPercentage() : Math.min(95, 35 + (pts % 55)),
          tests: isMe ? (this.papers ? this.papers.length : 0) : (pts % 6),
          isMe: isMe,
          isFollowed: isMe ? false : this.isUserFollowed(uid)
        });
      });
    }

    return Array.from(listMap.values());
  },

  followFriend(friendId) {
    return this.toggleFollowUser(friendId);
  },

  getReadinessPercentage(targetSubject = null) {
    const level = this.user.examLevel;
    const syllabus = this.completedChapters;
    const revisionsDb = this.revisions;
    const papersDb = this.papers;
    const studyHours = this.studyStats.totalMinutes / 60;

    const syllabusDataset = {
      Foundation: 4, Intermediate: 8, Final: 6
    }[level] || 1;

    let targetChapters = [];
    if (SYLLABUS_DATA && SYLLABUS_DATA[level]) {
      SYLLABUS_DATA[level].forEach(subObj => {
        if (subObj.chapters) {
          subObj.chapters.forEach(ch => {
            targetChapters.push({ id: ch.id, sub: subObj.subject });
          });
        }
      });
    }

    if (targetSubject) {
      targetChapters = targetChapters.filter(ch => ch.sub === targetSubject);
    }

    if (targetChapters.length === 0) return 0;

    const readCount = targetChapters.filter(ch => syllabus[ch.id]).length;
    const readPercent = (readCount / targetChapters.length) * 100;

    let revsCompleted = 0;
    targetChapters.forEach(ch => {
      const entry = revisionsDb[ch.id];
      if (entry) {
        if (entry.r1) revsCompleted++;
        if (entry.r2) revsCompleted++;
        if (entry.r3) revsCompleted++;
      }
    });
    const revsPercent = (revsCompleted / (targetChapters.length * 3)) * 100;

    const subjectPapers = targetSubject
      ? papersDb.filter(p => p.subject === targetSubject)
      : papersDb;

    let testAvg = 50;
    if (subjectPapers.length > 0) {
      let sum = 0;
      subjectPapers.forEach(p => sum += (p.score / p.total) * 100);
      testAvg = sum / subjectPapers.length;
    }

    const hoursGoal = targetSubject ? (10 / syllabusDataset) : 10;
    const studyPercent = Math.min(100, (studyHours / hoursGoal) * 100);

    const finalReadiness = (readPercent * 0.3) + (revsPercent * 0.3) + (testAvg * 0.2) + (studyPercent * 0.2);
    return Math.round(finalReadiness);
  },

  addStudyLog(date, subject, chapter, duration, category, notes) {
    const newLog = {
      id: "log_" + Date.now(),
      date,
      subject,
      chapter,
      duration: parseInt(duration),
      category,
      notes,
      loggedAt: new Date().toISOString()
    };
    this.studyLogs.push(newLog);
    this.addStudyTime(parseInt(duration));
  },

  deleteStudyLog(logId) {
    const idx = this.studyLogs.findIndex(l => l.id === logId);
    if (idx !== -1) {
      const log = this.studyLogs[idx];
      this.studyStats.totalMinutes = Math.max(0, this.studyStats.totalMinutes - log.duration);
      const today = log.date;
      if (this.studyStats.dailyMinutes[today]) {
        this.studyStats.dailyMinutes[today] = Math.max(0, this.studyStats.dailyMinutes[today] - log.duration);
      }
      this.addPoints(-(log.duration * 2));
      this.studyLogs.splice(idx, 1);
      this.saveUserData();
      this.notifyStateChange();
    }
  },

  listeners: [],
  subscribe(callback) {
    this.listeners.push(callback);
  },
  notifyStateChange() {
    this.listeners.forEach(cb => cb(this));
  }
};
