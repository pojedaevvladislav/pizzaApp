import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'pizzaApp',
  webDir: 'www',
  plugins: {
    StatusBar: {
      style: 'light',
      backgroundColor: '#F4F4F4',
    },
  },
};

export default config;
