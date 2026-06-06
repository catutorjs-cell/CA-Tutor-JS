// CA JS — Central Configuration
// ⚠️ Do NOT commit this file to a public GitHub repo
// For production, move secrets to a backend server or environment variables

export const CONFIG = {
  // EmailJS
  EMAILJS_PUBLIC_KEY: "wwVVazJ7m9EB2dZUf",
  EMAILJS_SERVICE_ID: "service_snsqw0k",
  EMAILJS_TEMPLATE_ID: "template_yuw2suo",

  // Telegram Owner Notifications
  TELEGRAM_TOKEN: "8967061142:AAFcdXYoco3XrTM1NMgF3vqmdYSUJQOeb3I",
  TELEGRAM_CHAT_ID: "1192186015",

  // Google Sheets Sync (fallback if not set in localStorage)
  DEFAULT_SYNC_URL: "https://script.google.com/macros/s/AKfycbz9X3WAEvymy46wSeP3fNRZ0MJS47UQxVceC2HbzFXEnHN2j-BdJstm0zX0179MBdTw/exec",
};