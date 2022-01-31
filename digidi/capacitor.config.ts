import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'staging.digidi.net',
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
