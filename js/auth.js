// CA JS Authentication Controller
import { State, SafeStorage } from './state.js';
import { CONFIG } from './config.js';

const localStorage = SafeStorage;

export const Auth = {
  activeTab: 'login',
  generatedOtp: null,
  isEmailVerified: false,
  otpCountdown: 0,
  otpInterval: null,

  init(onLoginSuccess) {
    this.onLoginSuccess = onLoginSuccess;
    this.bindEvents();
    this.resetState();

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init({
        publicKey: CONFIG.EMAILJS_PUBLIC_KEY,
      });
    }
  },

  resetState() {
    this.generatedOtp = null;
    this.isEmailVerified = false;
    const regOtp = document.getElementById('reg-otp');
    if (regOtp) {
      regOtp.disabled = true;
      regOtp.value = '';
    }
    const sendOtpBtn = document.getElementById('btn-send-otp');
    if (sendOtpBtn) {
      sendOtpBtn.textContent = 'Send OTP';
      sendOtpBtn.disabled = false;
      sendOtpBtn.className = 'btn btn-secondary';
    }
    clearInterval(this.otpInterval);
  },

  bindEvents() {
    // Toggle Password Visibility (Event Delegation)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.password-toggle-btn');
      if (!btn) return;
      if (btn.hasAttribute('onclick')) return;

      e.preventDefault();
      e.stopPropagation();

      const wrapper = btn.closest('.password-input-wrapper');
      if (!wrapper) return;

      const input = wrapper.querySelector('input');
      const prefixEmoji = wrapper.querySelector('.password-prefix-emoji');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🐵';
        if (prefixEmoji) prefixEmoji.textContent = '🔓';
      } else {
        input.type = 'password';
        btn.textContent = '🙈';
        if (prefixEmoji) prefixEmoji.textContent = '🔒';
      }
    });

    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authHeaderText = document.getElementById('auth-header-text');

    // Tab Switches
    if (tabLogin) {
      tabLogin.addEventListener('click', () => {
        this.activeTab = 'login';
        tabLogin.classList.add('active');
        if (tabRegister) tabRegister.classList.remove('active');
        if (loginForm) loginForm.style.display = 'flex';
        if (registerForm) registerForm.style.display = 'none';
        if (authHeaderText) authHeaderText.textContent = 'Login to access your study portal';
        this.resetState();
      });
    }

    if (tabRegister) {
      tabRegister.addEventListener('click', () => {
        this.activeTab = 'register';
        tabRegister.classList.add('active');
        if (tabLogin) tabLogin.classList.remove('active');
        if (registerForm) registerForm.style.display = 'flex';
        if (loginForm) loginForm.style.display = 'none';
        if (authHeaderText) authHeaderText.textContent = 'Create your premium CA-JS student profile';
        this.resetState();
      });
    }

    // Password requirements validation (Register)
    const regPassword = document.getElementById('reg-password');
    const regConfirm = document.getElementById('reg-confirm');
    const reqLen = document.getElementById('req-len');
    const reqNum = document.getElementById('req-num');
    const passMatchLabel = document.getElementById('pass-match-label');

    if (regPassword) {
      regPassword.addEventListener('input', () => {
        const val = regPassword.value;
        if (reqLen) {
          if (val.length >= 8) reqLen.classList.add('valid');
          else reqLen.classList.remove('valid');
        }
        if (reqNum) {
          if (/\d/.test(val)) reqNum.classList.add('valid');
          else reqNum.classList.remove('valid');
        }
        this.checkPasswordMatch(regPassword, regConfirm, passMatchLabel);
      });
    }

    if (regConfirm) {
      regConfirm.addEventListener('input', () => {
        this.checkPasswordMatch(regPassword, regConfirm, passMatchLabel);
      });
    }

    // Send OTP handler
    const btnSendOtp = document.getElementById('btn-send-otp');
    const regEmail = document.getElementById('reg-email');

    if (btnSendOtp) {
      btnSendOtp.addEventListener('click', () => {
        if (regEmail) {
          const emailVal = regEmail.value.trim();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            alert("Please enter a valid email address.");
            return;
          }
          this.sendOtp(emailVal);
        }
      });
    }

    // Verify OTP input handler (Registration)
    const regOtp = document.getElementById('reg-otp');
    if (regOtp) {
      regOtp.addEventListener('input', () => {
        const otpVal = regOtp.value.trim();
        if (otpVal.length === 6) {
          if (otpVal === this.generatedOtp) {
            this.isEmailVerified = true;
            regOtp.style.borderColor = 'var(--pastel-green-dark)';
            regOtp.style.boxShadow = '0 0 0 3px var(--pastel-green)';
            regOtp.disabled = true;

            const sendOtpBtn = document.getElementById('btn-send-otp');
            if (sendOtpBtn) {
              sendOtpBtn.textContent = 'Verified ✓';
              sendOtpBtn.disabled = true;
              sendOtpBtn.className = 'btn btn-success';
            }
            clearInterval(this.otpInterval);
          } else {
            regOtp.style.borderColor = 'var(--pastel-rose-dark)';
            regOtp.style.boxShadow = '0 0 0 3px var(--pastel-rose)';
          }
        } else {
          regOtp.style.borderColor = '';
          regOtp.style.boxShadow = '';
        }
      });
    }

    // ✅ FIXED: Login Form Submit — now async to support cross-device login
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailEl = document.getElementById('login-email');
        const passwordEl = document.getElementById('login-password');
        if (!emailEl || !passwordEl) return;
        const email = emailEl.value.trim();
        const pass = passwordEl.value;

        // Show loading state on button
        const submitBtn = document.getElementById('btn-login-submit');
        let originalText = 'Login';
        if (submitBtn) {
          originalText = submitBtn.textContent;
          submitBtn.textContent = 'Logging in...';
          submitBtn.disabled = true;
        }

        try {
          const user = await State.loginUser(email, pass);

          const landing = document.getElementById('landing-page');
          if (landing) landing.style.display = 'none';

          const authPanel = document.getElementById('auth-panel');
          if (authPanel) authPanel.classList.remove('open');

          const appShell = document.getElementById('app-shell');
          if (appShell) appShell.style.display = 'flex';
          this.onLoginSuccess(user);
        } catch (err) {
          alert(err.message);
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
        }
      });
    }

    // Register Form Submit
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameEl = document.getElementById('reg-name');
        const emailEl = document.getElementById('reg-email');
        const phoneEl = document.getElementById('reg-phone');
        const levelEl = document.getElementById('reg-level');
        if (!nameEl || !emailEl || !phoneEl || !levelEl || !regPassword) return;

        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const phone = phoneEl.value.trim();
        const level = levelEl.value;
        const pass = regPassword.value;
        const confirmPass = regConfirm ? regConfirm.value : '';

        if (!this.isEmailVerified) {
          alert("Please complete the Email OTP verification first.");
          return;
        }

        if (pass.length < 8 || !/\d/.test(pass)) {
          alert("Password does not meet the complexity requirements.");
          return;
        }

        if (pass !== confirmPass) {
          alert("Passwords do not match.");
          return;
        }

        try {
          const newUser = State.registerUser(name, email, phone, level, pass);

          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

          // Telegram Notification — only for mobile devices
          if (isMobile) {
            const telegramMessage = `🎉 New Student Registered!\n\n👤 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phone}\n🎓 Level: ${level}\n🕐 Time: ${new Date().toLocaleString('en-IN')}`;
            fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_TOKEN}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: CONFIG.TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: 'HTML'
              })
            }).then(() => {
              console.log('Telegram notification sent.');
            }).catch(err => {
              console.warn('Telegram notification failed:', err);
            });
          } else {
            console.log('Laptop/desktop device detected. Skipping registration Telegram notification.');
          }

          alert("Registration Successful! Please login with your credentials.");

          if (typeof window.cajsUpdateLandingStudentCounter === 'function') {
            window.cajsUpdateLandingStudentCounter();
          }

          const loginEmailEl = document.getElementById('login-email');
          const loginPasswordEl = document.getElementById('login-password');
          if (loginEmailEl) loginEmailEl.value = email;
          if (loginPasswordEl) loginPasswordEl.value = '';
          if (tabLogin) tabLogin.click();
        } catch (err) {
          alert(err.message);
        }
      });
    }

    // --- Forgot Password Flow ---
    const linkForgotPassword = document.getElementById('link-forgot-password');
    const linkBackToLogin = document.getElementById('link-forgot-back-to-login');
    const forgotForm = document.getElementById('forgot-password-form');
    const btnForgotSendOtp = document.getElementById('btn-forgot-send-otp');
    const inputForgotOtp = document.getElementById('forgot-otp');
    const inputForgotNewPass = document.getElementById('forgot-new-password');
    const forgotPassReqs = document.getElementById('forgot-password-reqs');
    const btnForgotSubmit = document.getElementById('btn-forgot-submit');
    const forgotEmailInput = document.getElementById('forgot-email');

    let forgotGeneratedOtp = null;
    let isForgotOtpVerified = false;
    let forgotOtpCountdown = 0;
    let forgotOtpInterval = null;

    const resetForgotFormState = () => {
      forgotGeneratedOtp = null;
      isForgotOtpVerified = false;
      forgotOtpCountdown = 0;
      clearInterval(forgotOtpInterval);
      if (btnForgotSendOtp) {
        btnForgotSendOtp.textContent = 'Send OTP';
        btnForgotSendOtp.disabled = false;
        btnForgotSendOtp.className = 'btn btn-secondary';
      }
      if (inputForgotOtp) {
        inputForgotOtp.value = '';
        inputForgotOtp.disabled = true;
        inputForgotOtp.style.borderColor = '';
        inputForgotOtp.style.boxShadow = '';
      }
      if (inputForgotNewPass) {
        inputForgotNewPass.value = '';
        inputForgotNewPass.disabled = true;
      }
      if (forgotPassReqs) forgotPassReqs.style.display = 'none';
      if (btnForgotSubmit) btnForgotSubmit.disabled = true;
    };

    if (linkForgotPassword) {
      linkForgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        this.activeTab = 'forgot';

        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'none';
        const authTabs = document.querySelector('.auth-tabs');
        if (authTabs) authTabs.style.display = 'none';

        if (forgotForm) forgotForm.style.display = 'flex';
        if (authHeaderText) authHeaderText.textContent = 'Reset your student profile password';

        resetForgotFormState();

        const loginEmailEl = document.getElementById('login-email');
        const loginEmail = loginEmailEl ? loginEmailEl.value.trim() : '';
        if (forgotEmailInput) forgotEmailInput.value = loginEmail || '';
      });
    }

    if (linkBackToLogin) {
      linkBackToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        const authTabs = document.querySelector('.auth-tabs');
        if (authTabs) authTabs.style.display = 'flex';
        if (forgotForm) forgotForm.style.display = 'none';
        if (tabLogin) tabLogin.click();
      });
    }

    if (btnForgotSendOtp) {
      // ✅ FIXED: Forgot password OTP also checks Google Sheet for cross-device users
      btnForgotSendOtp.addEventListener('click', async () => {
        if (!forgotEmailInput) return;
        const emailVal = forgotEmailInput.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          alert("Please enter a valid email address.");
          return;
        }

        // Check locally first
        let userExists = !!State.users[emailVal];

        // If not local, check Google Sheet
        if (!userExists) {
          btnForgotSendOtp.textContent = 'Checking...';
          btnForgotSendOtp.disabled = true;
          const sheetUsers = await State.fetchUsersFromSheet();
          userExists = sheetUsers.some(u => u.email === emailVal);
          btnForgotSendOtp.textContent = 'Send OTP';
          btnForgotSendOtp.disabled = false;
        }

        if (!userExists) {
          alert("This email is not registered with us.");
          return;
        }

        // If user found in sheet but not locally, add them locally (without password)
        // so that after reset they can login on this device
        if (!State.users[emailVal]) {
          const sheetUsers = await State.fetchUsersFromSheet();
          const sheetUser = sheetUsers.find(u => u.email === emailVal);
          if (sheetUser) {
            State.users[emailVal] = { ...sheetUser, password: null };
            localStorage.setItem('cajs_users_db', JSON.stringify(State.users));
          }
        }

        const otp = this.generateOTP().toString();
        forgotGeneratedOtp = otp;

        const now = new Date();
        const expiry = new Date(now.getTime() + 15 * 60 * 1000);
        const formattedExpiryTime = expiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (typeof emailjs !== 'undefined') {
          emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, {
            passcode: otp, time: formattedExpiryTime, otp: otp,
            otp_code: otp, otpCode: otp, code: otp,
            to_email: emailVal, user_email: emailVal, email: emailVal,
            to_name: emailVal.split('@')[0], name: emailVal.split('@')[0],
            message: `Your CA TUTOR JS password reset verification code is ${otp}. Valid until ${formattedExpiryTime}.`
          }).then(() => {
            console.log('Reset OTP email dispatched.');
          }).catch(err => {
            console.error('EmailJS OTP send failed:', err);
            alert('Failed to send OTP. Please try again.');
          });
        } else {
          alert('OTP service unavailable. Please try again later.');
        }

        if (inputForgotOtp) {
          inputForgotOtp.disabled = false;
          inputForgotOtp.placeholder = "Enter 6-digit OTP from email";
          inputForgotOtp.focus();
        }

        btnForgotSendOtp.disabled = true;
        forgotOtpCountdown = 60;
        clearInterval(forgotOtpInterval);
        forgotOtpInterval = setInterval(() => {
          forgotOtpCountdown--;
          const btnForgotSendOtpUpdate = document.getElementById('btn-forgot-send-otp');
          if (btnForgotSendOtpUpdate) {
            if (forgotOtpCountdown <= 0) {
              btnForgotSendOtpUpdate.textContent = 'Resend OTP';
              btnForgotSendOtpUpdate.disabled = false;
              clearInterval(forgotOtpInterval);
            } else {
              btnForgotSendOtpUpdate.textContent = `Resend in ${forgotOtpCountdown}s`;
            }
          }
        }, 1000);
      });
    }

    if (inputForgotOtp) {
      inputForgotOtp.addEventListener('input', () => {
        const otpVal = inputForgotOtp.value.trim();
        if (otpVal.length === 6) {
          if (otpVal === forgotGeneratedOtp) {
            isForgotOtpVerified = true;
            inputForgotOtp.style.borderColor = 'var(--pastel-green-dark)';
            inputForgotOtp.style.boxShadow = '0 0 0 3px var(--pastel-green)';
            inputForgotOtp.disabled = true;

            const btnForgotSendOtpUpdate = document.getElementById('btn-forgot-send-otp');
            if (btnForgotSendOtpUpdate) {
              btnForgotSendOtpUpdate.textContent = 'Verified ✓';
              btnForgotSendOtpUpdate.disabled = true;
              btnForgotSendOtpUpdate.className = 'btn btn-success';
            }
            clearInterval(forgotOtpInterval);

            if (inputForgotNewPass) {
              inputForgotNewPass.disabled = false;
              if (forgotPassReqs) forgotPassReqs.style.display = 'grid';
              inputForgotNewPass.focus();
            }
          } else {
            inputForgotOtp.style.borderColor = 'var(--pastel-rose-dark)';
            inputForgotOtp.style.boxShadow = '0 0 0 3px var(--pastel-rose)';
          }
        } else {
          inputForgotOtp.style.borderColor = '';
          inputForgotOtp.style.boxShadow = '';
        }
      });
    }

    if (inputForgotNewPass) {
      const forgotReqLen = document.getElementById('forgot-req-len');
      const forgotReqNum = document.getElementById('forgot-req-num');

      inputForgotNewPass.addEventListener('input', () => {
        const val = inputForgotNewPass.value;
        const lenValid = val.length >= 8;
        const numValid = /\d/.test(val);

        if (forgotReqLen) {
          if (lenValid) forgotReqLen.classList.add('valid');
          else forgotReqLen.classList.remove('valid');
        }
        if (forgotReqNum) {
          if (numValid) forgotReqNum.classList.add('valid');
          else forgotReqNum.classList.remove('valid');
        }

        if (btnForgotSubmit) {
          btnForgotSubmit.disabled = !(lenValid && numValid && isForgotOtpVerified);
        }
      });
    }

    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = forgotEmailInput ? forgotEmailInput.value.trim() : '';
        const newPass = inputForgotNewPass ? inputForgotNewPass.value : '';

        if (!isForgotOtpVerified) {
          alert("Please complete the OTP verification first.");
          return;
        }

        if (newPass.length < 8 || !/\d/.test(newPass)) {
          alert("Password does not meet complexity requirements.");
          return;
        }

        try {
          State.resetPassword(email, newPass);
          alert("Password Reset Successful! Please login with your new credentials.");

          const authTabs = document.querySelector('.auth-tabs');
          if (authTabs) authTabs.style.display = 'flex';
          forgotForm.style.display = 'none';
          if (tabLogin) tabLogin.click();

          const loginEmailEl = document.getElementById('login-email');
          const loginPasswordEl = document.getElementById('login-password');
          if (loginEmailEl) loginEmailEl.value = email;
          if (loginPasswordEl) {
            loginPasswordEl.value = '';
            loginPasswordEl.focus();
          }
        } catch (err) {
          alert(err.message);
        }
      });
    }

    // Logout
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        State.logoutUser();
        const appShell = document.getElementById('app-shell');
        if (appShell) appShell.style.display = 'none';

        const landing = document.getElementById('landing-page');
        if (landing) landing.style.display = 'flex';

        const authPanel = document.getElementById('auth-panel');
        if (authPanel) authPanel.classList.remove('open');

        this.resetState();

        if (typeof window.cajsUpdateLandingStudentCounter === 'function') {
          window.cajsUpdateLandingStudentCounter();
        }

        const loginEmailEl = document.getElementById('login-email');
        const loginPasswordEl = document.getElementById('login-password');
        if (loginEmailEl) loginEmailEl.value = '';
        if (loginPasswordEl) loginPasswordEl.value = '';
      });
    }
  },

  checkPasswordMatch(pass, confirm, label) {
    if (!confirm.value) {
      label.style.display = 'none';
      return;
    }
    label.style.display = 'block';
    if (pass.value === confirm.value) {
      label.textContent = 'Passwords match ✓';
      label.style.color = 'var(--pastel-green-dark)';
      confirm.style.borderColor = 'var(--pastel-green-dark)';
    } else {
      label.textContent = 'Passwords do not match.';
      label.style.color = 'var(--pastel-rose-dark)';
      confirm.style.borderColor = 'var(--pastel-rose-dark)';
    }
  },

  generateOTP() {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return 100000 + (array[0] % 900000);
  },

  sendOtp(email) {
    const otp = this.generateOTP().toString();
    this.generatedOtp = otp;

    const now = new Date();
    const expiry = new Date(now.getTime() + 15 * 60 * 1000);
    const formattedExpiryTime = expiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (typeof emailjs !== 'undefined') {
      emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, {
        passcode: otp, time: formattedExpiryTime, otp: otp,
        otp_code: otp, otpCode: otp, code: otp,
        to_email: email, user_email: email, email: email,
        to_name: email.split('@')[0], name: email.split('@')[0],
        message: `Your CA TUTOR JS verification code is ${otp}. Valid until ${formattedExpiryTime}.`
      }).then(() => {
        console.log('OTP email dispatched.');
      }).catch(err => {
        console.error('EmailJS OTP send failed:', err);
        alert('Failed to send OTP email. Please try again.');
      });
    } else {
      alert('OTP service unavailable. Please try again later.');
    }

    const regOtp = document.getElementById('reg-otp');
    regOtp.disabled = false;
    regOtp.placeholder = "Enter 6-digit OTP from email";
    regOtp.focus();

    const btnSendOtp = document.getElementById('btn-send-otp');
    btnSendOtp.disabled = true;
    this.otpCountdown = 60;

    clearInterval(this.otpInterval);
    this.otpInterval = setInterval(() => {
      this.otpCountdown--;
      if (this.otpCountdown <= 0) {
        btnSendOtp.textContent = 'Resend OTP';
        btnSendOtp.disabled = false;
        clearInterval(this.otpInterval);
      } else {
        btnSendOtp.textContent = `Resend in ${this.otpCountdown}s`;
      }
    }, 1000);
  }
};
