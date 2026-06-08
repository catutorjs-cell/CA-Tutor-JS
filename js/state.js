// CA JS Application State Management
import { SEED_FRIENDS, SYLLABUS_DATA } from './seedData.js';
import { CONFIG } from './config.js';

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
      this.users = rawUsers ? JSON.parse(rawUsers) : {};
    } catch (e) {
      console.error("Failed to parse users database:", e);
      this.users = {};
    }

    // ✅ FIX: Only update DB if something actually needs changing
    let databaseUpdated = false;

    // Remove legacy demo student account if present
    if (this.users["student@cajs.com"]) {
      delete this.users["student@cajs.com"];
      databaseUpdated = true;
    }

    // Ensure owner account exists — only create if missing, never overwrite registeredAt repeatedly
    if (!this.users["owner@cajs.com"]) {
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

    // ✅ FIX: Only save if something actually changed — prevents unnecessary overwrites
    if (databaseUpdated) {
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));
    }

    // 2. Load active session
    try {
      const rawSession = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
      if (rawSession) {
        const email = JSON.parse(rawSession);
        if (this.users[email]) {
          this.user = this.users[email];
          this.loadUserData(email);
        } else {
          // ✅ FIX: Session references a deleted user — clean it up
          localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
        }
      }
    } catch (e) {
      console.error("Failed to parse active session:", e);
      this.user = null;
    }

    // 3. Load friends database, purging old demo seed IDs
    const OLD_DEMO_IDS = ['CA-10492', 'CA-95281', 'CA-30948', 'CA-48210', 'CA-74921'];
    try {
      const rawFriends = localStorage.getItem(STORAGE_KEYS.FRIENDS_DB);
      if (rawFriends) {
        const allFriends = JSON.parse(rawFriends);
        this.friends = allFriends.filter(f => !OLD_DEMO_IDS.includes(f.id));
      } else {
        this.friends = [];
      }
    } catch (e) {
      console.error("Failed to parse friends database:", e);
      this.friends = [];
    }
    localStorage.setItem(STORAGE_KEYS.FRIENDS_DB, JSON.stringify(this.friends));
  },

  loadUserData(email) {
    const userPrefix = `_${email}`;

    try {
      const chapters = localStorage.getItem(STORAGE_KEYS.COMPLETED_CHAPTERS + userPrefix);
      this.completedChapters = chapters ? JSON.parse(chapters) : {};

      const revs = localStorage.getItem(STORAGE_KEYS.REVISIONS + userPrefix);
      this.revisions = revs ? JSON.parse(revs) : {};

      const materials = localStorage.getItem(STORAGE_KEYS.UPLOADED_MATERIALS + userPrefix);
      this.uploadedMaterials = materials ? JSON.parse(materials) : {};

      const evals = localStorage.getItem(STORAGE_KEYS.EVALUATIONS + userPrefix);
      this.evaluations = evals ? JSON.parse(evals) : [];

      const rawMistakes = localStorage.getItem(STORAGE_KEYS.MISTAKES_DB + userPrefix);
      this.mistakes = rawMistakes ? JSON.parse(rawMistakes) : [];

      const rawPapers = localStorage.getItem(STORAGE_KEYS.PAPERS_DB + userPrefix);
      this.papers = rawPapers ? JSON.parse(rawPapers) : [];

      const rawStats = localStorage.getItem(STORAGE_KEYS.STUDY_STATS + userPrefix);
      this.studyStats = rawStats ? JSON.parse(rawStats) : {
        points: 100,
        streak: 0,
        weeklyStreak: 0,
        lastStudyDate: null,
        totalMinutes: 0,
        dailyMinutes: {}
      };

      const rawCalendar = localStorage.getItem(STORAGE_KEYS.CALENDAR_DB + userPrefix);
      this.calendar = rawCalendar ? JSON.parse(rawCalendar) : null;

      const rawCustomPapers = localStorage.getItem('cajs_custom_papers_' + email);
      this.customPapers = rawCustomPapers ? JSON.parse(rawCustomPapers) : [];
    } catch (e) {
      console.error("Failed to load user data for:", email, e);
    }
  },

  saveUserData() {
    if (!this.user) return;
    const email = this.user.email;
    const userPrefix = `_${email}`;

    // ✅ Update main user record — but strip password from in-memory object before saving
    this.users[email] = this.user;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));

    localStorage.setItem(STORAGE_KEYS.COMPLETED_CHAPTERS + userPrefix, JSON.stringify(this.completedChapters));
    localStorage.setItem(STORAGE_KEYS.REVISIONS + userPrefix, JSON.stringify(this.revisions));
    localStorage.setItem(STORAGE_KEYS.UPLOADED_MATERIALS + userPrefix, JSON.stringify(this.uploadedMaterials));
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS + userPrefix, JSON.stringify(this.evaluations));
    localStorage.setItem(STORAGE_KEYS.MISTAKES_DB + userPrefix, JSON.stringify(this.mistakes));
    localStorage.setItem(STORAGE_KEYS.PAPERS_DB + userPrefix, JSON.stringify(this.papers));
    localStorage.setItem(STORAGE_KEYS.STUDY_STATS + userPrefix, JSON.stringify(this.studyStats));
    localStorage.setItem(STORAGE_KEYS.CALENDAR_DB + userPrefix, JSON.stringify(this.calendar));
    localStorage.setItem('cajs_custom_papers_' + email, JSON.stringify(this.customPapers));
  },

  registerUser(fullName, email, phone, examLevel, password) {
    if (this.users[email]) {
      throw new Error("Email ID is already registered.");
    }

    const userId = "CA-" + Math.floor(10000 + Math.random() * 90000);
    const newUser = {
      fullName,
      email,
      phone,
      examLevel,
      password, // stored locally only
      userId,
      registeredAt: new Date().toISOString()
    };

    // ✅ Save to localStorage FIRST — registration is never lost even if sync fails
    this.users[email] = newUser;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));

    // ✅ FIX: Sync to Google Sheet WITHOUT password (all devices)
    const syncUrl = localStorage.getItem('cajs_database_sync_url') || CONFIG.DEFAULT_SYNC_URL;
    if (syncUrl) {
      const { password: _omit, ...safeUser } = newUser; // strip password
      fetch(syncUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', user: safeUser })
      }).then(() => {
        console.log("Registration synced to Google Sheet.");
      }).catch(e => {
        console.warn("Google Sheet sync failed (registration still saved locally):", e);
      });
    }

    return newUser;
  },

  loginUser(email, password) {
    const matchedUser = this.users[email];
    if (!matchedUser) {
      throw new Error("No user found with this Email/Username.");
    }
    if (matchedUser.password !== password) {
      throw new Error("Incorrect password.");
    }

    this.user = matchedUser;
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(email));
    this.loadUserData(email);
    this.checkAndUpdateStreak();
    return matchedUser;
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
    this.studyStats = { points: 0, streak: 0, totalMinutes: 0, dailyMinutes: {} };
    this.calendar = null;
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
    // ✅ NOTE: We do NOT clear USERS_DB on logout — registrations are preserved
  },

  adminAddPointsToUser(email, pointsToAdd) {
    if (!this.users[email]) return;
    const statsKey = `${STORAGE_KEYS.STUDY_STATS}_${email}`;
    let stats = { points: 100, streak: 0, weeklyStreak: 0, lastStudyDate: null, totalMinutes: 0, dailyMinutes: {} };
    try {
      const rawStats = localStorage.getItem(statsKey);
      if (rawStats) stats = JSON.parse(rawStats);
    } catch(e) {
      console.error(e);
    }
    stats.points = (stats.points || 0) + pointsToAdd;
    localStorage.setItem(statsKey, JSON.stringify(stats));

    if (this.user && this.user.email === email) {
      this.studyStats.points = stats.points;
    }
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

  addUploadedMaterial(chapterId, fileName, fileSize) {
    if (!this.uploadedMaterials[chapterId]) {
      this.uploadedMaterials[chapterId] = [];
    }
    this.uploadedMaterials[chapterId].push({
      name: fileName,
      size: fileSize,
      date: new Date().toLocaleDateString('en-US')
    });
    this.addPoints(15);
    this.saveUserData();
    this.notifyStateChange();
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

  addStudyTime(minutes) {
    this.studyStats.totalMinutes += minutes;
    const today = new Date().toISOString().split('T')[0];
    this.studyStats.dailyMinutes[today] = (this.studyStats.dailyMinutes[today] || 0) + minutes;
    this.addPoints(minutes * 2);
    this.checkAndUpdateStreak();
    this.saveUserData();
    this.notifyStateChange();
  },

  addPoints(amt) {
    this.studyStats.points = Math.max(0, this.studyStats.points + amt);
    this.saveUserData();
  },

  checkAndUpdateStreak() {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastDate = this.studyStats.lastStudyDate;

    if (!lastDate) {
      this.studyStats.streak = 1;
      this.studyStats.lastStudyDate = todayStr;
    } else if (lastDate !== todayStr) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastDate === yesterdayStr) {
        this.studyStats.streak += 1;
      } else {
        this.studyStats.streak = 1;
      }
      this.studyStats.lastStudyDate = todayStr;
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

  followFriend(friendId) {
    const friendIndex = this.friends.findIndex(f => f.id === friendId);
    if (friendIndex === -1) {
      throw new Error("Student User ID not found.");
    }
    const friend = this.friends[friendIndex];
    if (friend.isFollowed) {
      friend.isFollowed = false;
      friend.points -= 100;
    } else {
      friend.isFollowed = true;
      friend.points += 100;
    }
    localStorage.setItem(STORAGE_KEYS.FRIENDS_DB, JSON.stringify(this.friends));
    this.notifyStateChange();
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

  listeners: [],
  subscribe(callback) {
    this.listeners.push(callback);
  },
  notifyStateChange() {
    this.listeners.forEach(cb => cb(this));
  }
};