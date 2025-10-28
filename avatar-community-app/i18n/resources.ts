const en = {
  // english as base language
  translation: {
    Home: "Home",
    Profile: "Profile",
    Settings: "Settings",
    Cancel: "Cancel",
    Languages: "Languages",
    "Sign Out": "Sign out",
    "Welcome Message": "Welcome back {{nickname}}!",
  },
} as const;

type ResourceType = {
  translation: {
    [K in keyof typeof en.translation]: string;
  };
};

export const resources = {
  en,
  ko: {
    translation: {
      Home: "홈",
      Profile: "내 프로필",
      Settings: "설정",
      Cancel: "취소",
      Languages: "언어",
      "Sign Out": "로그아웃",
      "Welcome Message": "{{nickname}}님, 환영합니다!",
    },
  } satisfies ResourceType, // Ensures ko matches en structure
};
