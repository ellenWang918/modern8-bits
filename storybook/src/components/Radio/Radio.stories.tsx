import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from './Radio'
const meta = { title: 'Component/Radio', component: Radio, tags: ['autodocs'], args: { label: 'Food', name: 'category', value: 'food' }, parameters: { docs: { description: { component: 'Use Radio when a group allows exactly one choice. Give each option the same name, distinct values, and a visible label. Group options in a fieldset with a legend. Use Checkbox for independent or multiple choices.' } } } } satisfies Meta<typeof Radio>
export default meta
type Story = StoryObj<typeof meta>
export const Unselected: Story = {}
export const Selected: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Error: Story = { args: { error: 'Choose a category.' } }
