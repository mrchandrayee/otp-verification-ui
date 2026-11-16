# OTP Verification UI Style

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/otp-verification-ui/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

A responsive, runnable recreation of the uploaded 15.03-second screen recording.

## What appears in the video

- Page heading: **OTP Verification UI Style**
- Dark glass-style verification card on a blue-to-purple ambient background
- Circular lock icon; switches to a green check icon after success
- Heading: **Verification Code**
- Helper text: **Enter the 6-digit code (Demo: 123456)**
- Six individual digit inputs
- Blue-to-purple countdown progress bar
- Countdown timer and **Resend Code** action
- Purple **Verify Account** button
- Red error state: **Invalid Code. Please try again.**
- Green success state: **Authentication Successful!**

## Code visible in the recording

The HTML structure visible in the lower code pane has been transcribed, including `card`, `icon-container`, `iconBox`, `otpContainer`, `fill`, `timer`, `resend`, `verify`, and `msg` identifiers, along with the six one-character numeric inputs. The source pane is too small to read all CSS and JavaScript precisely, so the remaining styling and interactive behavior have been reconstructed to match the screen and make the project work end-to-end.

## Demo behavior

- Demo OTP: `123456`
- Six inputs support auto-advance, backspace navigation, and pasting a full code.
- The countdown starts at 01:00.
- An incorrect code shows the red error message.
- A correct code shows the green success state and check icon.
- When the timer expires, resend becomes available.
- Resend resets the timer and clears the entered digits.

This is a front-end demonstration only. It does not send an SMS/email OTP or perform server-side identity verification.

## Run

1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. Enter `123456` and click **Verify Account**.

No npm, framework, build process, external assets, or internet connection is required.

## Files

- `index.html` — verification card markup
- `style.css` — responsive design and states
- `script.js` — OTP input, timer, resend, validation, and success behavior
- `README.md` — documentation

## 👨‍💻 Author

**mrchandrayee** · [GitHub](https://github.com/mrchandrayee)

## 📄 License

[MIT License](./LICENSE)
