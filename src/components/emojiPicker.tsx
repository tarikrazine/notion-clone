"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface EmojiPickerProps {
  children: React.ReactNode;
  getValue?: (emoji: string) => void;
}

function EmojiPicker(props: EmojiPickerProps) {
  const router = useRouter;

  const Picker = dynamic(() => import("emoji-picker-react"));

  function onClick(selectedEmoji: any) {
    if (props.getValue) {
      props.getValue(selectedEmoji.emoji);
    }
  }

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger className="cursor-pointer">
          {props.children}
        </PopoverTrigger>
        <PopoverContent className="border-none p-0">
          <Picker onEmojiClick={onClick} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default EmojiPicker;
