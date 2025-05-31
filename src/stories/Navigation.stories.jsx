/* eslint-disable linebreak-style */
import React from 'react';
import Navigation from '../components/Navigation';
import { MemoryRouter } from 'react-router-dom';

const NavigationStories = {
  title: 'Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default NavigationStories;

const TemplateStory = (args) => {
  return <Navigation {...args} />;
};

const WithTypeLoggedIn = TemplateStory.bind({});
const WithTypeLoggedOut = TemplateStory.bind({});

WithTypeLoggedIn.args = {
  authUser: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
  },
  signOut: () => {},
};

WithTypeLoggedOut.args = {
  authUser: null,
  signOut: () => {},
};

export {
  WithTypeLoggedIn,
  WithTypeLoggedOut,
};