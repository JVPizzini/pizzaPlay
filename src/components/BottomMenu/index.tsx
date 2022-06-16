import React from 'react';

import { Container, Notification, Quantity, Title } from './styles';

//interfaces and types
type Props = {
  title: string;
  color: string;
  notification?: string | undefined;
};

export function BottomMenu({ color, title, notification }: Props) {
  const noNotifications = notification === '0';

  return (
    <Container>
      <Title color={color}>{title}</Title>

      {notification && (
        <Notification noNotifications={noNotifications}>
          <Quantity noNotifications={noNotifications}>{notification}</Quantity>
        </Notification>
      )}
    </Container>
  );
}
