import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cerealnet.app',
  appName: 'Cerealnet',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
