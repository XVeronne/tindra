import type { Meta, StoryObj } from '@storybook/react';
import { TicketButton } from './TicketButton';

const meta: Meta<typeof TicketButton> = {
  title: 'Editorial/Buttons/Ticket',
  component: TicketButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Begin',
    ticketNumber: '142',
    atValue: '09:30'
  }
};

export default meta;

type Story = StoryObj<typeof TicketButton>;

export const Default: Story = {};

export const CustomLabels: Story = {
  args: {
    children: 'Enter',
    ticketNumber: '007',
    numberLabel: 'seat',
    admitLabel: 'pass',
    atLabel: 'gate',
    atValue: 'B12'
  }
};

export const Stack: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3 p-8">
      <TicketButton ticketNumber="141" atValue="08:00">Begin</TicketButton>
      <TicketButton ticketNumber="142" atValue="09:30">Begin</TicketButton>
      <TicketButton ticketNumber="143" atValue="11:00">Begin</TicketButton>
    </div>
  )
};
