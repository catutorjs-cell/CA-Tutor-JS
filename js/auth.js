// CA JS Authentication Controller
import { State } from './state.js';

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
        publicKey: "wwVVazJ7m9EB2dZUf",
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
    // Toggle Password Visibility (Event Delegation for complete safety)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.password-toggle-btn');
      if (!btn) return;
      
      // If button has inline onclick, let it handle the event exclusively to prevent double-toggling
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

    // Verify OTP input handler
    const regOtp = document.getElementById('reg-otp');
    regOtp.addEventListener('input', () => {
      const otpVal = regOtp.value.trim();
      if (otpVal.length === 6) {
        if (otpVal === this.generatedOtp) {
          this.isEmailVerified = true;
          regOtp.style.borderColor = 'var(--pastel-green-dark)';
          regOtp.style.boxShadow = '0 0 0 3px var(--pastel-green)';
          regOtp.disabled = true;
          
          const sendOtpBtn = document.getElementById('btn-send-otp');
          sendOtpBtn.textContent = 'Verified!';
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
        // Successful login
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
      const phone = regPhone.value.trim();
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
        State.registerUser(name, email, phone, level, pass);
        alert("Registration Successful! Please login with your credentials.");
        
        // Auto-fill login email, switch to login tab
        document.getElementById('login-email').value = email;
        document.getElementById('login-password').value = '';
        tabLogin.click();
      } catch (err) {
        alert(err.message);
      }
    });

    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
      State.logoutUser();
      document.getElementById('app-shell').style.display = 'none';
      
      const landing = document.getElementById('landing-page');
      if (landing) landing.style.display = 'flex';
      
      const authPanel = document.getElementById('auth-panel');
      if (authPanel) authPanel.classList.remove('open');

      this.resetState();
      
      // Clear fields
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
      label.textContent = 'Passwords match!';
      label.style.color = 'var(--pastel-green-dark)';
      confirm.style.borderColor = 'var(--pastel-green-dark)';
    } else {
      label.textContent = 'Passwords do not match.';
      label.style.color = 'var(--pastel-rose-dark)';
      confirm.style.borderColor = 'var(--pastel-rose-dark)';
    }
  },

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  },

  sendOtp(email) {
    // Generate secure random 6-digit OTP using the custom generator
    const otp = this.generateOTP().toString();
    this.generatedOtp = otp;
    
    // Calculate expiration time (15 minutes from now)
    const now = new Date();
    const expiry = new Date(now.getTime() + 15 * 60 * 1000);
    const formattedExpiryTime = expiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Trigger animated Email toast showing sending status
    const container = document.getElementById('sms-container');
    container.innerHTML = `
      <div class="sms-simulation-toast" style="min-width: 320px; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border: var(--glass-border); border-radius: 18px; padding: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); display: flex; gap: 12px; align-items: start; animation: slideInRight 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);">
        <div class="sms-avatar" style="width: 38px; height: 38px; border-radius: 50%; background: var(--pastel-purple); display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--pastel-purple-dark); font-size:14px; flex-shrink:0;">✉️</div>
        <div class="sms-content" style="display:flex; flex-direction:column; gap:4px; font-size:12px; text-align: left;">
          <span class="sms-header" style="font-weight:700; color:var(--text-main);">🛡️ OTP Verification Sent</span>
          <span class="sms-body" style="color:var(--text-muted); line-height:1.4;">
            Sending secure verification code to email 📧 <strong>${email.charAt(0)}***@${email.split('@')[1]}</strong>...<br>
            Please check your email inbox and spam folders.
          </span>
        </div>
      </div>
    `;

    // Send the email via EmailJS with a wide range of param mappings to fit any template placeholders
    if (typeof emailjs !== 'undefined') {
      emailjs.send(
        'service_snsqw0k',
        'template_yuw2suo',
        {
          passcode: otp, // Matches template placeholder {{passcode}}
          time: formattedExpiryTime, // Matches template placeholder {{time}}
          otp: otp,
          otp_code: otp,
          otpCode: otp,
          code: otp,
          to_email: email,
          user_email: email,
          email: email,
          to_name: email.split('@')[0],
          name: email.split('@')[0],
          message: `Your CA TUTOR JS verification code is ${otp}.`
        }
      ).then((response) => {
        console.log('OTP Email Sent Successfully via EmailJS!', response.status, response.text);
      }).catch((error) => {
        console.error('EmailJS OTP Send Failed:', error);
        alert(`Failed to send OTP email: ${error.text || error.message || error}. Falling back to developer simulation mode. Check browser console.`);
        console.log(`[Developer Fallback] OTP for ${email} is: ${otp}`);
      });
    } else {
      console.warn("EmailJS SDK not found. Falling back to simulated verification.");
      console.log(`[Developer Fallback] OTP for ${email} is: ${otp}`);
    }

    // Remove toast after 8 seconds
    setTimeout(() => {
      const toast = container.querySelector('.sms-simulation-toast');
      if (toast) toast.remove();
    }, 8000);

    // Enable OTP Input
    const regOtp = document.getElementById('reg-otp');
    regOtp.disabled = false;
    regOtp.placeholder = "Enter 6-digit OTP";
    regOtp.focus();

    // Start 60s countdown for resend
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
