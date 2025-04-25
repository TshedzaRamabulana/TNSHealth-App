# 🧠 TNS Health - Fitness Tracking App

TNS Health is a beautifully designed cross-platform **React Native** health app that leverages **Google Health Connect (Android)** and **Apple HealthKit (iOS)** to track:

- 🏃 Steps
- 📏 Distance Walked
- 🧗 Flights Climbed
- 🔥 Calories Burned
- 💧 Manual Water Intake

> Inspired by the look and feel of Samsung Health UI with The Naked Scientists branding.

---

## 📸 Features

- Live sync with **Health Connect** or **Apple Health**
- Real-time ring progress for Steps & Calories
- Manual water tracking (8 cups/day goal)
- Scrollable UI optimized for mobile experience
- Smooth green-themed animation with React Native Reanimated
- Date navigation to view previous days' stats

---

## ⚙️ Requirements

- Node.js ≥ 16.x
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode
- **Physical Android/iOS device** (not emulator)

---

## 🚀 Quick Start

Clone the project:

```bash
git clone https://github.com/your-username/tns-health.git
cd tns-health
npm install
Then run:

bash
Copy
Edit
npx expo run:android   # for Android
npx expo run:ios       # for iOS (Mac only)
On Android, make sure USB debugging is on and Health Connect is installed.

🛂 Permissions Setup
✅ Android (Health Connect)
Open Health Connect

Go to App Permissions

Find TNS Health and enable:

Steps

Distance

Floors Climbed

Active Calories Burned

✅ iOS (Apple Health)
App will automatically request access for:

Steps

DistanceWalkingRunning

Flights Climbed

Active Energy Burned

🧠 Folder Structure
bash
Copy
Edit
.
├── App.tsx                     # Main entry file
├── assets/
│   └── logo.png                # Branded logo
├── src/
│   ├── components/
│   │   ├── Value.tsx          # Label + Value UI blocks
│   │   └── RingProgress.tsx   # Animated ring component
│   └── hooks/
│       └── useHealthData.tsx  # Health Connect / Apple HealthKit logic
├── android/                    # Native Android folder
├── ios/                        # Native iOS folder
└── ...
📦 Dependencies
Main dependencies used:

json
Copy
Edit
{
  "expo": "~48.0.18",
  "expo-dev-client": "~2.2.1",
  "react-native": "0.71.8",
  "react-native-health": "^1.14.0",
  "react-native-health-connect": "^1.0.2",
  "react-native-svg": "13.4.0",
  "react-native-reanimated": "~2.14.4",
  "expo-build-properties": "~0.6.0"
}
✅ Build Targets
Android SDK: 33–34

iOS Deployment Target: 12+

Expo SDK: 48

JS Engine: Hermes enabled

💡 Usage Notes
Health data only starts from the day permissions are granted.

Calorie data comes from ActiveCaloriesBurned – some devices may not generate it passively.

The app uses a 10s interval polling system on Android for real-time feel.

🧪 Dev Scripts
bash
Copy
Edit
npm start       # starts Metro in dev client mode
npm run android # builds and runs on Android
npm run ios     # builds and runs on iOS (macOS only)
🧱 Build Tips
Use npx expo run:android instead of expo start to avoid Metro-only bugs.

If you get permission errors, re-open Health Connect and re-accept.

Works best with USB-debugging enabled physical devices.

🙌 Credits
Health Connect by Google

Apple HealthKit integration via react-native-health

UI inspiration: Samsung Health

Built by The Naked Scientists

📜 License
MIT License © 2025 TNS Health Project

yaml
Copy
Edit

---
