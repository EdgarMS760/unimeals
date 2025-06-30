export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Login: undefined;
};

export type DrawerMenuItem = {
  id: string;
  title: string;
  icon: string;
  isLogout?: boolean;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}