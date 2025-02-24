'use client';

import { useRef, useState } from 'react';

import { Textarea } from '@workspace/ui/components';

import ChatToggleGroup from './chat-toggle-group';

import { useFileManagements } from '../model';

const ChatTextArea = ({
  onSend,
}: {
  onSend: (content: string, attachmentList: number[]) => void;
}) => {
  const [message, setMessage] = useState('');
  const [attachmentList, setAttachmentList] = useState<number[]>([]);
  const isComposing = useRef(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fileManagements = useFileManagements(1, 1, user.userId);
  const { setFilePreviews, setUploadedFileIds } = fileManagements;

  const handleSendClick = () => {
    if (!message.trim() && attachmentList.length === 0) return;
    onSend(message, attachmentList);
    // console.log('message', message);
    // console.log('attachmentList', attachmentList);
    setMessage('');
    setFilePreviews([]);
    setUploadedFileIds([]);
    setAttachmentList([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing.current) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className="flex flex-col w-full rounded-md border bg-secondary border-gray-300 p-2 overflow-auto">
      <Textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onCompositionStart={() => {
          isComposing.current = true;
        }}
        onCompositionEnd={(e) => {
          isComposing.current = false;
          setMessage(e.currentTarget.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <div className="w-full px-2 pt-2">
        <ChatToggleGroup
          name="image"
          onSend={handleSendClick}
          setAttachmentList={setAttachmentList}
          fileManagements={fileManagements}
        />
      </div>
    </div>
  );
};

export default ChatTextArea;
