export interface AppConfig {
  port: number;
  db: {
    url: string;
  };
  baseUrls: {
    courseManagementService: string;
    authService: string;
    frontend: string;
  };
  sendGrid: {
    key: string;
    sender: string;
    appName: string;
    designIds: {
      registerNewUser: string;
      courseRegistration: string;
    };
  };
  sms: {
    uid: string;
    apiKey: string;
    senderId: string;
    url: string;
  };
}
