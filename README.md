Aurelion Future Forge Assessment

This is the official React Native project for the Aurelion Future Forge Assessment.

🚀 Getting Started

Follow the steps below to set up and run the project locally.

📦 Step 1: Clone the Repository

git clone https://github.com/TailorAmit/-AurelionFutureForgeAssement.git
cd -AurelionFutureForgeAssement

📥 Step 2: Install Dependencies

npm install --legacy-peer-deps

🍎 Step 3: Install iOS Pods

cd ios
pod install

⚙️ Step 4: Configure API and Token

Open the project in any code editor and go to:

app/constants/config.ts

Update the file with the correct API base URL and access token.

▶️ Step 5: Run the Project

For iOS:

npx react-native run-ios

For Android:

npx react-native run-android

🛠 Tech Stack

React Native

TypeScript

Zustand (for state management)

Axios (for API requests)

Lucide Icons

📂 Project Structure

- app/
  - components/
  - screens/
  - constants/
    - config.ts ← API URL & Token configuration
  - store/
  - ...

📌 Notes

Make sure you have Xcode and CocoaPods installed for iOS development.

Use a properly configured emulator or physical device for Android builds.

👨‍💻 Author

Amit TailorGitHub: TailorAmit

