"use client"

import * as React from "react"

// --- Icons ---
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useQuestionTypeDropdown } from "./use-question-type"

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/tiptap-ui-primitive/dropdown-menu"

// --- Data ---
import { questionTypes } from "@/data/questions"

export interface QuestionTypeDropdownProps extends Omit<ButtonProps, "type"> {
  portal?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export const QuestionTypeDropdown = React.forwardRef<
  HTMLButtonElement,
  QuestionTypeDropdownProps
>(
  (
    {
      portal = false,
      onOpenChange,
      ...buttonProps
    },
    ref
  ) => {
    const {
      shouldShow,
      isOpen,
      insertQuestion,
      insertQuestionBlock,
      handleOpenChange,
      availableTypes,
    } = useQuestionTypeDropdown()

    const handleOpenChangeWithCallback = React.useCallback(
      (open: boolean) => {
        handleOpenChange(open)
        onOpenChange?.(open)
      },
      [handleOpenChange, onOpenChange]
    )

    if (!shouldShow) {
      return null
    }

    return (
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChangeWithCallback}>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            data-style="ghost"
            {...buttonProps}
          >
            📝 Add Question
            <ChevronDownIcon className="tiptap-button-icon" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-slate-50">
          {availableTypes.map((questionType) => (
            <DropdownMenuItem
              key={questionType.id}
              onSelect={() => insertQuestionBlock(questionType)}
              className="flex items-center gap-2 p-2 cursor-pointer"
            >
              <span>{questionType.icon || '📝'}</span>
              <span>{questionType.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)


export { useQuestionTypeDropdown } from "./use-question-type"

QuestionTypeDropdown.displayName = "QuestionTypeDropdown"