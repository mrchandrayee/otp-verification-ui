const DEMO_CODE = "123456";
const DURATION_SECONDS = 60;

const card = document.getElementById("card");
const form = document.getElementById("otpForm");
const otpInputs = [...document.querySelectorAll("#otpContainer input")];
const timerLabel = document.getElementById("timer");
const fill = document.getElementById("fill");
const resendButton = document.getElementById("resend");
const verifyButton = document.getElementById("verify");
const message = document.getElementById("msg");

let secondsLeft = DURATION_SECONDS;
let intervalId = null;
let verified = false;

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = `msg ${type}`.trim();
}

function getCode() {
  return otpInputs.map((input) => input.value).join("");
}

function updateTimer() {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  timerLabel.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  fill.style.width = `${(secondsLeft / DURATION_SECONDS) * 100}%`;
  document.querySelector(".progress").setAttribute("aria-valuenow", String(secondsLeft));

  if (secondsLeft <= 0) {
    window.clearInterval(intervalId);
    intervalId = null;
    resendButton.disabled = false;
    setMessage("Code expired. Please resend a new code.", "error");
  }
}

function startCountdown() {
  window.clearInterval(intervalId);
  secondsLeft = DURATION_SECONDS;
  resendButton.disabled = true;
  updateTimer();
  intervalId = window.setInterval(() => {
    if (secondsLeft > 0) secondsLeft -= 1;
    updateTimer();
  }, 1000);
}

function clearCode() {
  otpInputs.forEach((input) => {
    input.value = "";
    input.classList.remove("filled");
  });
  otpInputs[0].focus();
}

otpInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    const digit = input.value.replace(/\D/g, "").slice(-1);
    input.value = digit;
    input.classList.toggle("filled", Boolean(digit));
    if (digit && index < otpInputs.length - 1) otpInputs[index + 1].focus();
    setMessage("");
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      otpInputs[index - 1].value = "";
      otpInputs[index - 1].classList.remove("filled");
      otpInputs[index - 1].focus();
    }
    if (event.key === "ArrowLeft" && index > 0) otpInputs[index - 1].focus();
    if (event.key === "ArrowRight" && index < otpInputs.length - 1) otpInputs[index + 1].focus();
    if (event.key === "Enter") {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  input.addEventListener("paste", (event) => {
    const pasted = (event.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    pasted.split("").forEach((digit, digitIndex) => {
      otpInputs[digitIndex].value = digit;
      otpInputs[digitIndex].classList.add("filled");
    });
    otpInputs[Math.min(pasted.length, 5)].focus();
    setMessage("");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (verified) return;

  if (secondsLeft <= 0) {
    setMessage("Code expired. Please resend a new code.", "error");
    return;
  }

  const code = getCode();
  if (code.length !== 6) {
    setMessage("Please enter the complete 6-digit code.", "error");
    otpInputs.find((input) => !input.value)?.focus();
    return;
  }

  if (code !== DEMO_CODE) {
    setMessage("Invalid Code. Please try again.", "error");
    clearCode();
    return;
  }

  verified = true;
  window.clearInterval(intervalId);
  intervalId = null;
  card.classList.add("success");
  verifyButton.disabled = true;
  otpInputs.forEach((input) => { input.disabled = true; });
  resendButton.disabled = true;
  setMessage("Authentication Successful!", "success");
});

resendButton.addEventListener("click", () => {
  verified = false;
  card.classList.remove("success");
  verifyButton.disabled = false;
  otpInputs.forEach((input) => { input.disabled = false; });
  clearCode();
  setMessage("A new demo code is ready: 123456", "success");
  startCountdown();
});

startCountdown();
