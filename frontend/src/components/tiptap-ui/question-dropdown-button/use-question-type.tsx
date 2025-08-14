import * as React from "react"
import type { Editor } from "@tiptap/react"

//hooks
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

//types 
import { questionTypes } from "@/data/questions"
import { getQuestionTypeByID } from "@/data/questions"

// question config
export interface UseQuestionTypeDropdownConfig {
    /**
     * The Tiptap editor instance.
     */
    editor?: Editor | null
    /**
     * Available question types to show in the dropdown
     */ 
    availableTypes?: typeof questionTypes
    /**
     * Whether the dropdown should hide when questions are not available.
     * @default false
     */
    hideWhenUnavailable?: boolean
}

export function useQuestionTypeDropdown(config?:UseQuestionTypeDropdownConfig){
    const {editor:providedEditor, availableTypes=questionTypes, hideWhenUnavailable=false} = config || {}

    const editor = useTiptapEditor(providedEditor)


    const [isOpen, setIsOpen] = React.useState(false)

    const isEditable = editor?.editor?.isEditable
    const shouldShow = isEditable && !hideWhenUnavailable


    const insertQuestionBlock = React.useCallback(
        (questionType:typeof questionTypes[0])=>{
            if (!isEditable) return

            let content = `\n\n${questionType.icon} ${questionType.label} Question\n\n`
            content += `Question: [Enter Question Here]`

            if (questionType.id === "select" || questionType.id === "number"){
                content += `Option 1: [Enter Option 1] \n Option 2: [Enter Option 2] \n Option 3: [Enter Option 3] \n Option 4: [Enter Option 4] \n Option 5: [Enter Option 5] \n `
            }else {
                content += `Answer: [${questionType.label} input field]\n\n`
            }

            content += `---\n\n`

            editor?.editor?.chain().focus().insertContent(content).run()
            setIsOpen(false)
        },[editor]
    )



    //insert a question
    const insertQuestion = React.useCallback(
        (questionType:typeof questionTypes[0])=>{
            if (!isEditable) return

            const questionText =  `\n\n${questionType.icon || '📝'} ${questionType.label} Question\n\n`

            editor?.editor?.chain().focus().insertContent(questionText).run()
            
            setIsOpen(false)
        },[editor]


        
    )

    const handleOpenChange = React.useCallback((open:boolean)=>{
        setIsOpen(open)
    },[])

    return {
        editor,
        isOpen,
        shouldShow,
        insertQuestion,
        handleOpenChange,
        insertQuestionBlock,
        setIsOpen,
        availableTypes,
    }
    
}