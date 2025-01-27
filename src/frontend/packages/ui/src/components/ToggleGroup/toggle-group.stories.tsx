import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { useState } from 'react';
import { Mic, MicOff, ScreenShare, ScreenShareOff, Video, VideoOff } from 'lucide-react';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Widget/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => {
    const [isMicOn, setIsMicOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    return (
      <ToggleGroup
        variant="outline"
        type="multiple"
      >
        <ToggleGroupItem
          value="mic"
          onClick={() => setIsMicOn((prev) => !prev)}
        >
          {isMicOn ? <Mic /> : <MicOff />}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="video"
          onClick={() => setIsVideoOn((prev) => !prev)}
        >
          {isVideoOn ? <Video /> : <VideoOff />}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="sharing"
          onClick={() => setIsScreenSharing((prev) => !prev)}
        >
          {isScreenSharing ? <ScreenShare /> : <ScreenShareOff />}
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};
