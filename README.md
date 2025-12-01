🔐 React Native Login Screen (with Dark Mode + Validation)

A fully interactive and modern **React Native Login Screen** featuring:

- Real-time validations  
- Password strength indicator  
- Password visibility toggle  
- Login attempt limit  
- “Remember Me” functionality  
- Light & dark mode UI  
- Loading animation  
- Personalized greeting after login  
- Profile preview with photo  
- Clean UI & responsive layout  

This project showcases frontend logic, React Hooks, state management, UI design, theming, and mobile interaction patterns.

---

 ⭐ Features

 🌞🌙 **Light & Dark Mode**
- Instant theme switching  
- Custom color palettes  
- Supports backgrounds, text, borders, cards, etc.

 ✉️ **Email Validation**
- Checks if email contains **`@gmail.com`**  
- Shows real-time validation feedback  
- Red or green message depending on correctness

🔑 **Password Validation & Strength**
Checks:
- At least 4 characters  
- Strong password at 8+ characters  
- Uppercase letter required  
- No spaces allowed  
- Shows: **Weak ❌**, **Moderate ⚠️**, **Strong ✅**

👁️ **Show / Hide Password**
- Press eye icon (👁️ / 🙈) to toggle visibility

+ ✔️ **Remember Me Toggle**
- Saves the user’s email for next login  
- Works with light/dark mode

 🚫 **Login Attempt Limit**
- After **3 failed attempts**, user is locked  
- “Try Again” button resets the form  
- Prevents brute force login

+ ⏳ **Loading Animation (Simulated Login)**
- 3-second loading animation  
- ActivityIndicator + countdown  
- After loading → profile displays automatically

+ 👤 **Profile Output Screen**
Displays:
- Greeting based on time of day  
- Saved email  
- Login time  
- Profile image (Kurt.jpg)  
- Clean modern card UI

+ 🧹 **Clear All Button**
Resets:
- Email + password  
- Error messages  
- Remember Me state  
- Attempts  
- Login screen states
