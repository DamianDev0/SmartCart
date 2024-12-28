export type NavigationRoutes = {
  Home: undefined;
  HomeTab: undefined;
  Auth: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  FormItem: undefined;
  ItemDetails: {
    id: string;
    name: string;
    description: string | null;
    quantity: number;
    category: string;
    amount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type TabRoutes = {
  Login: undefined;
  SignUp: undefined;
};

export type AllRoutes = NavigationRoutes & TabRoutes;
