// YourComponent.stories.ts|tsx
import React from 'react';
import { ComponentStory, ComponentMeta, ComponentStoryObj } from '@storybook/react';
import DeleteBtn from '../components/DeleteBtn';

export default { component: DeleteBtn } as ComponentMeta<typeof DeleteBtn>

export const Index: ComponentStoryObj<typeof DeleteBtn> = {
  args: {
  }
}
