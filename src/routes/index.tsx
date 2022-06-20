import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

// hooks
import { useAuth } from '@hooks/auth';

import { UserStackRoutes } from './user.stack.routes';
import { UserTabRoutes } from './user.tab.routes';
import { SignIn } from '@screens/SignIn';

export function Routes() {
  const { user } = useAuth();
  const dataUser = JSON.stringify(user);
  return (
    <NavigationContainer>
      {dataUser != '{}' ? <UserStackRoutes /> : <SignIn />}
      {/* <UserTabRoutes /> */}
    </NavigationContainer>
  );
}
