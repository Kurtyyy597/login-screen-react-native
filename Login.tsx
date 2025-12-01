import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Switch,
  ActivityIndicator,
  Image,
  TextInput,
  Pressable,
} from 'react-native';

// 🌞 Light Mode Colors
const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#555555",
  border: "#CCCCCC",
  accent: "#2196F3",
  accentText: "#FFFFFF",
  ripple: "#BBDEFB",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  inputBackground: "#FAFAFA",
  divider: "#E0E0E0",
  cardShadow: "#00000020",
};

// 🌙 Dark Mode Colors
const darkTheme = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#E0E0E0",
  textSecondary: "#A5A5A5",
  border: "#2E2E2E",
  accent: "#90CAF9",
  accentText: "#000000",
  ripple: "#2B3646",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  inputBackground: "#2A2A2A",
  divider: "#383838",
  cardShadow: "#00000040",
};

export default function KurtLoginScreen() {
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [timeLogin, setTimeLogin] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [greeting, setGreeting] = useState("");
  const scrollViewRef = useRef(null);


  const theme = darkMode ? darkTheme : lightTheme;

  // 🚀 Login Handler
  const loginButton = () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("⚠️ Please fill in all fields");
      return;
    }

    if (!email.includes("@gmail.com")) {
      setEmailErrorMessage("⚠️ Email must include (@gmail.com)");
      return;
    } else {
      setEmailErrorMessage("");
    }

    if (password.length < 4) {
      setPasswordErrorMessage("Weak ❌");
    } else if (password.length < 8) {
      setPasswordErrorMessage("Moderate ⚠️");
    } else {
      setPasswordErrorMessage("Strong ✅");
    }

    if (!/[A-Z]/.test(password)) {
      Alert.alert("Password must include at least one uppercase letter.");
      return;
    }

    if (password.includes(" ")) {
      Alert.alert("⚠️ Password cannot contain spaces.");
      return;
    }

    const userEmail = "KurtMarquez238@gmail.com";
    const userPassword = "Ketketpogi10";

    if (email !== userEmail || password !== userPassword) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      Alert.alert(`⚠️ Invalid credentials!`);

      if (newAttempts >= 3) {
        Alert.alert(
          "Too Many Attempts 🚫",
          "You have reached the maximum number of login attempts.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Try again",
              style: "destructive",
              onPress: () => {
                setEmail("");
                setPassword("");
                setEmailErrorMessage("");
                setPasswordErrorMessage("");
                setLoginAttempts(0);
                setErrorMessage("");
              },
            },
          ]
        );
      }
      return;
    }

    // ✅ Greeting message
    const hours = new Date().getHours();
    let greetText = "";
    if (hours < 12) greetText = "Good Morning ☀️";
    else if (hours < 18) greetText = "Good Afternoon 🌤️";
    else greetText = "Good Evening 🌙";
    setGreeting(greetText);

    // Save email if Remember Me is ON
    if (rememberMe) {
      setSavedEmail(email);
    }

    // Simulate loading
    setLoading(true);
    setShowProfile(false);
    setSeconds(3);

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeLogin(new Date().toLocaleTimeString());
          setLoading(false);
          setShowProfile(true);
          Alert.alert(`🎉 Hello ${email}! Welcome to your profile!`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ♻️ Clear All Data
  const clearAll = () => {
    Alert.alert("Clear?", "This will reset your full input forms", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          setEmail("");
          setPassword("");
          setEmailErrorMessage("");
          setGreeting("");
          setLoading(false);
          setRememberMe(false);
          setSeconds(0);
          setTimeLogin("");
          setErrorMessage("");
          setPasswordErrorMessage("");
          setSavedEmail("");
          setShowProfile(false);
          setLoginAttempts(0);
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        ref={scrollViewRef}
        contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.kurtLogo, { backgroundColor: theme.border }]}>
          <Text style={[styles.kurtLogoText, { color: theme.textPrimary }]}>
            {darkMode ? "🌙 Kurt Login Screen" : "☀️ Kurt Login Screen"}
          </Text>
        </View>

        {/* Theme Toggle */}
        <View
          style={[styles.darkModeContainer, { backgroundColor: theme.background }]}
        >
          <Text style={[styles.textDarkMode, { color: theme.textPrimary }]}>
            Theme: {darkMode ? "Dark Mode" : "Light Mode"}
          </Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? theme.accent : theme.border}
            trackColor={{ true: theme.accent, false: theme.border }}
          />
        </View>

        {/* Input Form */}
        <View style={[styles.inputForms, { backgroundColor: theme.surface }]}>
          <TextInput
            style={[
              styles.input,
              { borderColor: theme.border, color: theme.textPrimary },
            ]}
            placeholder="Type your email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={theme.textSecondary}
            cursorColor={theme.accent}
          />
          {email.length > 0 && (
            <Text
              style={[
                styles.textError,
                { color: emailErrorMessage ? theme.error : theme.success },
              ]}
            >
              {emailErrorMessage ? emailErrorMessage : "Good ✅"}
            </Text>
          )}

          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                { borderColor: theme.border, color: theme.textPrimary },
              ]}
              placeholder="Type your password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={theme.textSecondary}
              cursorColor={theme.accent}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={[
                styles.showPasswordBtn,
                { backgroundColor: theme.inputBackground },
              ]}
            >
              <Text style={[styles.textShowPassword, { color: theme.textPrimary }]}>
                {showPassword ? "🙈" : "👁️"}
              </Text>
            </Pressable>
          </View>

          {passwordErrorMessage && (
            <Text
              style={[
                styles.textError,
                {
                  color: passwordErrorMessage.includes("Weak")
                    ? theme.error
                    : passwordErrorMessage.includes("Moderate")
                    ? theme.warning
                    : theme.success,
                },
              ]}
            >
              {passwordErrorMessage}
            </Text>
          )}

          {/* Remember Me */}
          <View style={styles.rememberMeContainer}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              thumbColor={rememberMe ? theme.accent : theme.border}
              trackColor={{ true: theme.accent, false: theme.border }}
            />
            <Text style={{ color: theme.textPrimary, marginLeft: 10 }}>
              Remember Me
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.btnRow}>
            <Pressable
              onPress={loginButton}
              android_ripple={{ color: theme.ripple }}
              style={[
                styles.btn,
                { backgroundColor: theme.success, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.textBtn, { color: theme.accentText }]}>
                Login
              </Text>
            </Pressable>

            <Pressable
              onPress={clearAll}
              android_ripple={{ color: theme.ripple }}
              style={[
                styles.btn,
                { backgroundColor: theme.warning, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.textBtn, { color: theme.textPrimary }]}>
                Clear
              </Text>
            </Pressable>
          </View>

          {errorMessage && (
            <Text style={[styles.textError, { color: theme.error }]}>
              {errorMessage}
            </Text>
          )}
        </View>

        {/* Loading */}
        {loading && (
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" color={theme.accent} />
            <Text style={[styles.textLoading, { color: theme.textPrimary }]}>
              👤 Verifying your account... {seconds}s
            </Text>
          </View>
        )}

        {/* Profile */}
        {!loading && showProfile && (
          <View
            style={[styles.profileCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
          >
            <Text style={[styles.profileTitle, { color: theme.textPrimary }]}>
              👤 YOUR PROFILE
            </Text>
            <View
              style={{ width: "80%", height: 1, backgroundColor: theme.divider, marginVertical: 10 }}
            />
            <Image
              style={[styles.profileImage, { backgroundColor: theme.border }]}
              resizeMode="cover"
              source={require("../../../Images/Kurt.jpg")}
            />
            <Text style={[styles.textOutput, { color: theme.textPrimary }]}>
              {greeting}, {savedEmail || email}!
            </Text>
            <Text style={[styles.textOutput, { color: theme.textPrimary }]}>
              🕒 Logged in at: {timeLogin}
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// 🧱 Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  kurtLogo: {
    marginTop: 40,
    borderRadius: 15,
    elevation: 4,
    padding: 20,
    shadowColor: "#000",
  },
  kurtLogoText: { fontSize: 24, textAlign: "center", fontWeight: "bold" },
  darkModeContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
  },
  textDarkMode: { fontSize: 16 },
  inputForms: {
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    width: "90%",
    paddingVertical: 20,
    marginTop: 20,
    elevation: 3,
  },
  input: {
    width: "85%",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  textError: { fontSize: 14, fontWeight: "500", marginVertical: 5 },
  passwordContainer: { flexDirection: "row", alignItems: "center" },
  showPasswordBtn: {
    position: "absolute",
    right: 25,
    padding: 5,
    borderRadius: 10,
  },
  textShowPassword: { fontSize: 18 },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 15,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: { fontSize: 16, fontWeight: "bold" },
  loadingView: { marginTop: 30, alignItems: "center" },
  textLoading: { fontSize: 16, fontWeight: "bold", marginTop: 8 },
  profileCard: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 30,
    padding: 20,
    alignItems: "center",
    elevation: 4,
  },
  profileTitle: { fontSize: 18, fontWeight: "bold" },
  profileImage: { 
  width: 200, 
  height: 200, 
  marginVertical: 10,
  borderRadius: 20
},
  textOutput: { fontSize: 16, marginTop: 8, textAlign: "center" },
});
