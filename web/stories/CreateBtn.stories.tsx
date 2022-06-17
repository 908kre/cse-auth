// YourComponent.stories.ts|tsx
import React from 'react';
import { ComponentStory, ComponentMeta, ComponentStoryObj } from '@storybook/react';
import CreateBtn from '../components/CreateBtn';

export default { component: CreateBtn } as ComponentMeta<typeof CreateBtn>

export const Index: ComponentStoryObj<typeof CreateBtn> = {
  args: {
  }
}
