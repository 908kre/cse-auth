// YourComponent.stories.ts|tsx
import React from 'react';
import { ComponentStory, ComponentMeta, ComponentStoryObj } from '@storybook/react';
import UpdateBtn from '../components/UpdateBtn';

export default { component: UpdateBtn } as ComponentMeta<typeof UpdateBtn>

export const Index: ComponentStoryObj<typeof UpdateBtn> = {
  args: {
  }
}
