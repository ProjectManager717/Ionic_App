import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.digidi.app',
  appName: 'Digidi',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen : {
      showSpinner: true,
      androidSpinnerStyle: "horizontal",
      spinnerColor: "#fabb0c"
    }
  },
};

export default config;
