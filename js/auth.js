// CA JS Authentication Controller
import { State } from './state.js';
import { CONFIG } from './config.js';

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
    document.getElementById('reg-otp').disabled = true;
    document.getElementById('reg-otp').value = '';
    const sendOtpBtn = document.getElementById('btn-send-otp');
    sendOtpBtn.textContent = 'Send OTP';
    sendOtpBtn.disabled = false;
    sendOtpBtn.className = 'btn btn-secondary';
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
    tabLogin.addEventListener('click', () => {
      this.activeTab = 'login';
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      loginForm.style.display = 'flex';
      registerForm.style.display = 'none';
      authHeaderText.textContent = 'Login to access your study portal';
      this.resetState();
    });

    tabRegister.addEventListener('click', () => {
      this.activeTab = 'register';
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      registerForm.style.display = 'flex';
      loginForm.style.display = 'none';
      authHeaderText.textContent = 'Create your premium CA-JS student profile';
      this.resetState();
    });

    // Password requirements validation (Register)
    const regPassword = document.getElementById('reg-password');
    const regConfirm = document.getElementById('reg-confirm');
    const reqLen = document.getElementById('req-len');
    const reqNum = document.getElementById('req-num');
    const passMatchLabel = document.getElementById('pass-match-label');

    regPassword.addEventListener('input', () => {
      const val = regPassword.value;
      if (val.length >= 8) reqLen.classList.add('valid');
      else reqLen.classList.remove('valid');

      if (/\d/.test(val)) reqNum.classList.add('valid');
      else reqNum.classList.remove('valid');

      this.checkPasswordMatch(regPassword, regConfirm, passMatchLabel);
    });

    regConfirm.addEventListener('input', () => {
      this.checkPasswordMatch(regPassword, regConfirm, passMatchLabel);
    });

    // Send OTP handler
    const btnSendOtp = document.getElementById('btn-send-otp');
    const regEmail = document.getElementById('reg-email');

    btnSendOtp.addEventListener('click', () => {
      const emailVal = regEmail.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        alert("Please enter a valid email address.");
        return;
      }
      this.sendOtp(emailVal);
    });

    // Verify OTP input handler (Registration)
    const regOtp = document.getElementById('reg-otp');
    regOtp.addEventListener('input', () => {
      const otpVal = regOtp.value.trim();
      if (otpVal.length === 6) {
        // ✅ FIX: Removed '123456' master bypass — only real OTP accepted
        if (otpVal === this.generatedOtp) {
          this.isEmailVerified = true;
          regOtp.style.borderColor = 'var(--pastel-green-dark)';
          regOtp.style.boxShadow = '0 0 0 3px var(--pastel-green)';
          regOtp.disabled = true;

          const sendOtpBtn = document.getElementById('btn-send-otp');
          sendOtpBtn.textContent = 'Verified ✓';
          sendOtpBtn.disabled = true;
          sendOtpBtn.className = 'btn btn-success';
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

    // Login Form Submit
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-password').value;

      try {
        const user = State.loginUser(email, pass);
        const landing = document.getElementById('landing-page');
        if (landing) landing.style.display = 'none';

        const authPanel = document.getElementById('auth-panel');
        if (authPanel) authPanel.classList.remove('open');

        document.getElementById('app-shell').style.display = 'flex';
        this.onLoginSuccess(user);
      } catch (err) {
        alert(err.message);
      }
    });

    // Register Form Submit
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const level = document.getElementById('reg-level').value;
      const pass = regPassword.value;
      const confirmPass = regConfirm.value;

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

        // ✅ Google Sheets Sync — password intentionally excluded (all devices)
        const syncUrl = localStorage.getItem('cajs_database_sync_url') || CONFIG.DEFAULT_SYNC_URL;
        if (syncUrl) {
          fetch(syncUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'register',
              user: {
                fullName: name,
                email: email,
                phone: phone,
                examLevel: level,
                // ✅ FIX: Password never sent to external services
                userId: newUser?.userId || 'CA-STUDENT',
                registeredAt: new Date().toISOString()
              }
            })
          }).then(() => {
            console.log('Registration synced to Google Sheets.');
          }).catch(err => {
            console.warn('Google Sheets sync failed:', err);
          });
        }

        // ✅ Telegram Notification — only for mobile devices
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

        document.getElementById('login-email').value = email;
        document.getElementById('login-password').value = '';
        tabLogin.click();
      } catch (err) {
        alert(err.message);
      }
    });

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
      btnForgotSendOtp.textContent = 'Send OTP';
      btnForgotSendOtp.disabled = false;
      btnForgotSendOtp.className = 'btn btn-secondary';
      inputForgotOtp.value = '';
      inputForgotOtp.disabled = true;
      inputForgotOtp.style.borderColor = '';
      inputForgotOtp.style.boxShadow = '';
      inputForgotNewPass.value = '';
      inputForgotNewPass.disabled = true;
      forgotPassReqs.style.display = 'none';
      btnForgotSubmit.disabled = true;
    };

    if (linkForgotPassword) {
      linkForgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        this.activeTab = 'forgot';

        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        document.querySelector('.auth-tabs').style.display = 'none';

        forgotForm.style.display = 'flex';
        authHeaderText.textContent = 'Reset your student profile password';

        resetForgotFormState();

        const loginEmail = document.getElementById('login-email').value.trim();
        forgotEmailInput.value = loginEmail || '';
      });
    }

    if (linkBackToLogin) {
      linkBackToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.auth-tabs').style.display = 'flex';
        forgotForm.style.display = 'none';
        tabLogin.click();
      });
    }

    if (btnForgotSendOtp) {
      btnForgotSendOtp.addEventListener('click', () => {
        const emailVal = forgotEmailInput.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          alert("Please enter a valid email address.");
          return;
        }

        if (!State.users[emailVal]) {
          alert("This email is not registered with us.");
          return;
        }

        const otp = this.generateOTP().toString();
        forgotGeneratedOtp = otp;

        const now = new Date();
        const expiry = new Date(now.getTime() + 15 * 60 * 1000);
        const formattedExpiryTime = expiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // OTP Simulation Toast removed as requested

        if (typeof emailjs !== 'undefined') {
          emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, {
            passcode: otp, time: formattedExpiryTime, otp: otp,
            otp_code: otp, otpCode: otp, code: otp,
            to_email: emailVal, user_email: emailVal, email: emailVal,
            to_name: emailVal.split('@')[0], name: emailVal.split('@')[0],
            message: `Your CA TUTOR JS password reset verification code is ${otp}. Valid until ${formattedExpiryTime}.`
          }).then(() => {
            // ✅ FIX: OTP not logged to console
            console.log('Reset OTP email dispatched.');
          }).catch(err => {
            console.error('EmailJS OTP send failed:', err);
            alert('Failed to send OTP. Please try again.');
          });
        } else {
          alert('OTP service unavailable. Please try again later.');
        }

        // Toast timeout removed

        inputForgotOtp.disabled = false;
        inputForgotOtp.placeholder = "Enter 6-digit OTP from email";
        inputForgotOtp.focus();

        btnForgotSendOtp.disabled = true;
        forgotOtpCountdown = 60;
        clearInterval(forgotOtpInterval);
        forgotOtpInterval = setInterval(() => {
          forgotOtpCountdown--;
          if (forgotOtpCountdown <= 0) {
            btnForgotSendOtp.textContent = 'Resend OTP';
            btnForgotSendOtp.disabled = false;
            clearInterval(forgotOtpInterval);
          } else {
            btnForgotSendOtp.textContent = `Resend in ${forgotOtpCountdown}s`;
          }
        }, 1000);
      });
    }

    if (inputForgotOtp) {
      inputForgotOtp.addEventListener('input', () => {
        const otpVal = inputForgotOtp.value.trim();
        if (otpVal.length === 6) {
          // ✅ FIX: Removed '123456' master bypass
          if (otpVal === forgotGeneratedOtp) {
            isForgotOtpVerified = true;
            inputForgotOtp.style.borderColor = 'var(--pastel-green-dark)';
            inputForgotOtp.style.boxShadow = '0 0 0 3px var(--pastel-green)';
            inputForgotOtp.disabled = true;

            btnForgotSendOtp.textContent = 'Verified ✓';
            btnForgotSendOtp.disabled = true;
            btnForgotSendOtp.className = 'btn btn-success';
            clearInterval(forgotOtpInterval);

            inputForgotNewPass.disabled = false;
            forgotPassReqs.style.display = 'grid';
            inputForgotNewPass.focus();
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

        if (lenValid) forgotReqLen.classList.add('valid');
        else forgotReqLen.classList.remove('valid');

        if (numValid) forgotReqNum.classList.add('valid');
        else forgotReqNum.classList.remove('valid');

        btnForgotSubmit.disabled = !(lenValid && numValid && isForgotOtpVerified);
      });
    }

    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = forgotEmailInput.value.trim();
        const newPass = inputForgotNewPass.value;

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

          document.querySelector('.auth-tabs').style.display = 'flex';
          forgotForm.style.display = 'none';
          tabLogin.click();

          document.getElementById('login-email').value = email;
          document.getElementById('login-password').value = '';
          document.getElementById('login-password').focus();
        } catch (err) {
          alert(err.message);
        }
      });
    }

    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
      State.logoutUser();
      document.getElementById('app-shell').style.display = 'none';

      const landing = document.getElementById('landing-page');
      if (landing) landing.style.display = 'flex';

      const authPanel = document.getElementById('auth-panel');
      if (authPanel) authPanel.classList.remove('open');

      this.resetState();

      if (typeof window.cajsUpdateLandingStudentCounter === 'function') {
        window.cajsUpdateLandingStudentCounter();
      }

      document.getElementById('login-email').value = '';
      document.getElementById('login-password').value = '';
    });
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
    // ✅ Cryptographically stronger OTP using crypto API
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

    // OTP Simulation Toast removed as requested

    if (typeof emailjs !== 'undefined') {
      emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, {
        passcode: otp, time: formattedExpiryTime, otp: otp,
        otp_code: otp, otpCode: otp, code: otp,
        to_email: email, user_email: email, email: email,
        to_name: email.split('@')[0], name: email.split('@')[0],
        message: `Your CA TUTOR JS verification code is ${otp}. Valid until ${formattedExpiryTime}.`
      }).then(() => {
        // ✅ FIX: OTP not logged to console
        console.log('OTP email dispatched.');
      }).catch(err => {
        console.error('EmailJS OTP send failed:', err);
        alert('Failed to send OTP email. Please try again.');
      });
    } else {
      alert('OTP service unavailable. Please try again later.');
    }

    // Toast timeout removed

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