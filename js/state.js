// CA JS Application State Management
import { SEED_FRIENDS, SYLLABUS_DATA } from './seedData.js';

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

// Initialize State
export const State = {
  user: null,
  users: {},
  friends: [],
  mistakes: [],
  completedChapters: {}, // Format: { chapterId: true }
  revisions: {}, // Format: { chapterId: { r1: false, r2: false, r3: false } }
  uploadedMaterials: {}, // Format: { chapterId: [{ name, date, size }] }
  evaluations: [], // Format: [{ id, date, subject, score, total, feedback, corrections, presentation, missing }]
  papers: [], // Format: [{ id, date, subject, score, total, totalQuestions, difficulty, type }]
  customPapers: [], // Format: [{ id, type, year, subject, title, pdfUrl }]
  studyStats: {
    points: 100, // Starts with a small welcome bonus
    streak: 0,
    weeklyStreak: 0,
    lastStudyDate: null,
    totalMinutes: 0,
    dailyMinutes: {} // Format: { "YYYY-MM-DD": minutes }
  },
  calendar: null, // Format: { examDate, subjects: [], schedule: [] }

  init() {
    // 1. Load users database
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS_DB);
      this.users = rawUsers ? JSON.parse(rawUsers) : {};
    } catch (e) {
      console.error("Failed to parse users database:", e);
      this.users = {};
    }

    // Seed default users if they are not already in the database
    let databaseUpdated = false;
    if (!this.users["student@cajs.com"]) {
      this.users["student@cajs.com"] = {
        fullName: "Jananni Shree",
        email: "student@cajs.com",
        phone: "9876543210",
        examLevel: "Intermediate",
        password: "Password123",
        userId: "CA-92899",
        role: "student",
        registeredAt: "2026-05-15T10:30:00.000Z",
        avatar: "letter",
        gender: "female"
      };
      databaseUpdated = true;
    } else {
      // Force set past date for robust date filtering demonstration
      this.users["student@cajs.com"].registeredAt = "2026-05-15T10:30:00.000Z";
      databaseUpdated = true;
    }

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
    } else {
      // Force set past date
      this.users["owner@cajs.com"].registeredAt = "2026-05-01T09:00:00.000Z";
      databaseUpdated = true;
    }

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
        }
      }
    } catch (e) {
      console.error("Failed to parse active session:", e);
      this.user = null;
    }

    // 3. Load friends database, purging any old demo seed names
    const OLD_DEMO_IDS = ['CA-10492', 'CA-95281', 'CA-30948', 'CA-48210', 'CA-74921'];
    const rawFriends = localStorage.getItem(STORAGE_KEYS.FRIENDS_DB);
    if (rawFriends) {
      const allFriends = JSON.parse(rawFriends);
      // Strip out old demo names that are no longer valid
      this.friends = allFriends.filter(f => !OLD_DEMO_IDS.includes(f.id));
    } else {
      this.friends = [];
    }
    localStorage.setItem(STORAGE_KEYS.FRIENDS_DB, JSON.stringify(this.friends));
  },

  loadUserData(email) {
    const userPrefix = `_${email}`;
    
    // Load Completed Chapters
    const chapters = localStorage.getItem(STORAGE_KEYS.COMPLETED_CHAPTERS + userPrefix);
    this.completedChapters = chapters ? JSON.parse(chapters) : {};

    // Load Revisions
    const revs = localStorage.getItem(STORAGE_KEYS.REVISIONS + userPrefix);
    this.revisions = revs ? JSON.parse(revs) : {};

    // Load Uploaded Materials
    const materials = localStorage.getItem(STORAGE_KEYS.UPLOADED_MATERIALS + userPrefix);
    this.uploadedMaterials = materials ? JSON.parse(materials) : {};

    // Load OCR Evaluations
    const evals = localStorage.getItem(STORAGE_KEYS.EVALUATIONS + userPrefix);
    this.evaluations = evals ? JSON.parse(evals) : [];

    // Load Mistakes
    const rawMistakes = localStorage.getItem(STORAGE_KEYS.MISTAKES_DB + userPrefix);
    this.mistakes = rawMistakes ? JSON.parse(rawMistakes) : [];

    // Load Papers
    const rawPapers = localStorage.getItem(STORAGE_KEYS.PAPERS_DB + userPrefix);
    this.papers = rawPapers ? JSON.parse(rawPapers) : [];

    // Load Study Stats
    const rawStats = localStorage.getItem(STORAGE_KEYS.STUDY_STATS + userPrefix);
    this.studyStats = rawStats ? JSON.parse(rawStats) : {
      points: 100,
      streak: 0,
      weeklyStreak: 0,
      lastStudyDate: null,
      totalMinutes: 0,
      dailyMinutes: {}
    };

    // Load Calendar
    const rawCalendar = localStorage.getItem(STORAGE_KEYS.CALENDAR_DB + userPrefix);
    this.calendar = rawCalendar ? JSON.parse(rawCalendar) : null;

    // Load Custom Papers
    try {
      const rawCustomPapers = localStorage.getItem('cajs_custom_papers_' + email);
      this.customPapers = rawCustomPapers ? JSON.parse(rawCustomPapers) : [];
    } catch (e) {
      console.error("Failed to parse custom papers:", e);
      this.customPapers = [];
    }
  },

  saveUserData() {
    if (!this.user) return;
    const email = this.user.email;
    const userPrefix = `_${email}`;

    // Update main user record
    this.users[email] = this.user;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));

    // Save individual tables
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
      password,
      userId,
      registeredAt: new Date().toISOString()
    };

    this.users[email] = newUser;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));
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
    
    // If the active user is being edited, sync their live stats as well!
    if (this.user && this.user.email === email) {
      this.studyStats.points = stats.points;
    }
    this.notifyStateChange();
  },

  adminChangeUserLevel(email, newLevel) {
    if (!this.users[email]) return;
    this.users[email].examLevel = newLevel;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(this.users));
    
    // If active user is edited, sync their live profile
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
    
    // Purge related tables
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
      this.addPoints(30); // 30 points for reading a chapter
    }
    this.saveUserData();
    this.notifyStateChange();
  },

  toggleRevisionCheck(chapterId, revKey) {
    // revKey options: 'r1', 'r2', 'r3'
    if (!this.revisions[chapterId]) {
      this.revisions[chapterId] = { r1: false, r2: false, r3: false };
    }

    const stateVal = !this.revisions[chapterId][revKey];
    this.revisions[chapterId][revKey] = stateVal;
    
    // Reward points (+15 pts per revision marked)
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

    this.addPoints(15); // Uploader reward
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
      question,
      subject,
      chapter,
      notes,
      difficulty,
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
    this.addPoints(paper.score * 10 + 50); // 50 points flat completion + 10 points per mark
    this.saveUserData();
    this.notifyStateChange();
  },

  addCustomPaper(type, year, subject, title, pdfUrl, questions = null) {
    const newPaper = {
      id: "custom_" + Date.now(),
      type,
      year: parseInt(year),
      subject,
      title,
      pdfUrl,
      questions
    };
    this.customPapers.push(newPaper);
    this.addPoints(50); // Reward for registering a new paper PDF!
    this.saveUserData();
    this.notifyStateChange();
    return newPaper;
  },

  addStudyTime(minutes) {
    this.studyStats.totalMinutes += minutes;
    const today = new Date().toISOString().split('T')[0];
    this.studyStats.dailyMinutes[today] = (this.studyStats.dailyMinutes[today] || 0) + minutes;
    
    // Earn 2 points per study minute
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
        this.studyStats.streak = 1; // Streak broken
      }
      this.studyStats.lastStudyDate = todayStr;
    }
  },

  setCalendar(examDate, subjects, schedule) {
    this.calendar = {
      examDate,
      subjects,
      schedule
    };
    this.addPoints(50); // Calendar generated reward
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
    // Check in local database
    const friendIndex = this.friends.findIndex(f => f.id === friendId);
    if (friendIndex === -1) {
      throw new Error("Student User ID not found.");
    }
    
    const friend = this.friends[friendIndex];
    if (friend.isFollowed) {
      friend.isFollowed = false;
      friend.points -= 100; // Visual decrement
    } else {
      friend.isFollowed = true;
      friend.points += 100;
    }
    
    localStorage.setItem(STORAGE_KEYS.FRIENDS_DB, JSON.stringify(this.friends));
    this.notifyStateChange();
  },

  // Compound readiness calculation logic
  getReadinessPercentage(targetSubject = null) {
    const level = this.user.examLevel;
    const subjectsData = this.user ? (SEED_FRIENDS.find(f => false) || []) : []; // Seed safety reference
    
    // Retrieve active syllabus chapter items
    import('./seedData.js').then((module) => {
      // Lazy fetch helper fallback if needed, but handled synchronously below with imported values
    });
    
    // Re-calculating from global window references (or directly using local variables)
    // To ensure synchronous calculation:
    const syllabus = this.completedChapters;
    const revisionsDb = this.revisions;
    const papersDb = this.papers;
    const studyHours = this.studyStats.totalMinutes / 60; // Total Study Volume in Hours

    // Get subjects list
    // Fallback import reference
    const syllabusDataset = {
      Foundation: [
        "Paper-1: Accounting (May 2026 Scheme)",
        "Paper-2: Business Laws (May 2026 Scheme)",
        "Paper-3: Quantitative Aptitude (May 2026 Scheme)",
        "Paper-4: Business Economics (May 2026 Scheme)"
      ],
      Intermediate: [
        "Paper-1: Advanced Accounting (May 2026 Scheme)",
        "Paper-2: Corporate and Other Laws (May 2026 Scheme)",
        "Paper-3A: Income-tax Law (May 2026 Scheme)",
        "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)",
        "Paper-4: Cost and Management Accounting (May 2026 Scheme)",
        "Paper-5: Auditing and Ethics (May 2026 Scheme)",
        "Paper-6A: Financial Management (May 2026 Scheme)",
        "Paper-6B: Strategic Management (May 2026 Scheme)"
      ],
      Final: [
        "Paper-1: Financial Reporting (May 2026 Scheme)",
        "Paper-2: Advanced Financial Management (May 2026 Scheme)",
        "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)",
        "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)",
        "Paper-5: Indirect Tax Laws (May 2026 Scheme)",
        "Paper-6: Integrated Business Solutions (May 2026 Scheme)"
      ]
    }[level] || [];

    // Filter chapters
    let targetChapters = [];
    if (SYLLABUS_DATA && SYLLABUS_DATA[level]) {
      SYLLABUS_DATA[level].forEach(subObj => {
        if (subObj.chapters) {
          subObj.chapters.forEach(ch => {
            targetChapters.push({
              id: ch.id,
              sub: subObj.subject
            });
          });
        }
      });
    }

    if (targetSubject) {
      targetChapters = targetChapters.filter(ch => ch.sub === targetSubject);
    }

    if (targetChapters.length === 0) return 0;

    // 1. Chapter read completion (30% weight)
    const readCount = targetChapters.filter(ch => syllabus[ch.id]).length;
    const readPercent = (readCount / targetChapters.length) * 100;

    // 2. Revisions completed: R1, R2, R3 (30% weight)
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

    // 3. Mock Test scores average (20% weight)
    const subjectPapers = targetSubject 
      ? papersDb.filter(p => p.subject === targetSubject)
      : papersDb;

    let testAvg = 0;
    if (subjectPapers.length > 0) {
      let sum = 0;
      subjectPapers.forEach(p => sum += (p.score / p.total) * 100);
      testAvg = sum / subjectPapers.length;
    } else {
      testAvg = 50; // Neutral baseline starting mark
    }

    // 4. Study Hours logged (20% weight - 10 hours of Pomodoro counts as 100% capacity)
    const hoursGoal = targetSubject ? (10 / syllabusDataset.length) : 10;
    const studyPercent = Math.min(100, (studyHours / hoursGoal) * 100);

    // Weighted aggregation
    const finalReadiness = (readPercent * 0.3) + (revsPercent * 0.3) + (testAvg * 0.2) + (studyPercent * 0.2);
    return Math.round(finalReadiness);
  },

  // State listeners for reactive UI updating
  listeners: [],
  subscribe(callback) {
    this.listeners.push(callback);
  },
  notifyStateChange() {
    this.listeners.forEach(cb => cb(this));
  }
};
