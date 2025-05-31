/* eslint-disable linebreak-style */
import React from 'react';
import Chip from '../components/Chip';

const ChipStories = {
  title: 'Chip',
  component: Chip,
};

export default ChipStories;

export const ChipStory = (args) => {
  return <Chip {...args} />;
};

ChipStory.args = {
  label: 'Chip',
};
