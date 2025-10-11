"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'


import {
  defaultBlockSpecs,
  filterSuggestionItems,
  BlockNoteEditor,
  insertOrUpdateBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { DefaultReactSuggestionItem } from "@blocknote/react";
import {
  // getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import { createReactBlockSpec } from "@blocknote/react";
import { BlockNoteSchema } from "@blocknote/core";
import {
  Type,
  Hash,
  Mail,
  AlignLeft,
  Circle,
  Square,
  Divide,
  Plus,
  Download,
} from "lucide-react";
import { div } from "motion/react-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { BlockNoteView } from "@blocknote/mantine";
import { SuggestionMenuController } from "@blocknote/react";




const formTitleBlock = createReactBlockSpec(
  {
    type: "formTitle",
    content: "none",
    propSchema: {
      title: { default: "Untitled Form" },
    },
  },
  {
    render: (props) => {
      const updateTitle = (newTitle: string) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, title: newTitle },
        });
      };

      return (
        <div className="w-full py-6 border-b border-gray-100 mb-4">
          <div className="max-w-2xl">
            <input
              type="text"
              value={props.block.props.title}
              onChange={(e) => updateTitle(e.target.value)}
              className="text-3xl font-bold text-gray-900 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400 w-full mb-2"
              placeholder="Form Title"
            />
          </div>
        </div>
      );
    },
  }
);

// PAGE BREAK BLOCK
const pageBreakBlock = createReactBlockSpec(
  {
    type: "pageBreak",
    content: "inline",
    propSchema: {
      pageTitle: { default: "Page Title" },
    },
  },
  {
    render: (props) => (
      <div
        className="relative my-8"
        style={{ outline: "none", border: "none" }}
      >
        {/* Page break line */}
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <div className="px-4">
            <span className="text-xs text-gray-400 bg-white px-2">
              Page Break
            </span>
          </div>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
      </div>
    ),
  }
);

// SHORT TEXT BLOCK
const shortTextBlock = createReactBlockSpec(
  {
    type: "shortText",
    content: "none",
    propSchema: {
      question: { default: "Type your question here" },
      placeholder: { default: "type your placeholder here" },
      required: { default: false },
    },
  },
  {
    render: (props) => {
      const updateQuestion = (newQuestion: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, question: newQuestion },
        });
      };

      const updatePlaceholder = (newPlaceholder: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, placeholder: newPlaceholder },
        });
      };

      return (
        <div className="w-full h-full flex flex-col py-4">
          <div className="w-full h-full flex flex-col gap-2">
            {/* <div
              ref={props.contentRef}
              className="text-md text-gray-600 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
            >
              {props.block.props.question}
            </div> */}
            <input
              type="text"
              value={props.block.props.question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="text-lg font-medium text-gray-800 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
              placeholder="Type your question here..."
            />

            <Input
              type="text"
              value={props.block.props.placeholder}
              onChange={(e) => updatePlaceholder(e.target.value)}
              className=" max-w-sm text-2xl h-12 px-4 py-1"
              placeholder={props.block.props.placeholder}
            ></Input>
          </div>
        </div>
      );
    },
  }
);

// LONG TEXT BLOCK
const longTextBlock = createReactBlockSpec(
  {
    type: "longText",
    content: "none",
    propSchema: {
      question: { default: "Type your question here" },
      placeholder: { default: "Your detailed answer" },
      required: { default: false },
    },
  },
  {
    render: (props) => {
      const updateQuestion = (newQuestion: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, question: newQuestion },
        });
      };

      const updatePlaceholder = (newPlaceholder: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, placeholder: newPlaceholder },
        });
      };

      return (
        <div className="w-full h-full flex flex-col py-4">
          <div className="w-full h-full flex flex-col gap-2">
            <input
              type="text"
              value={props.block.props.question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="text-lg font-medium text-gray-800 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
              placeholder="Type your question here..."
            />
            <Textarea
              placeholder={props.block.props.placeholder}
              value={props.block.props.placeholder}
              onChange={(e) => updatePlaceholder(e.target.value)}
              className="max-w-sm min-h-[100px]"
            ></Textarea>
          </div>
        </div>
      );
    },
  }
);

// EMAIL BLOCK
const emailBlock = createReactBlockSpec(
  {
    type: "email",
    content: "none",
    propSchema: {
      question: { default: "Type your question here" },
      placeholder: { default: "your@email.com" },
      required: { default: false },
    },
  },
  {
    render: (props) => {
      const updateQuestion = (newQuestion: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, question: newQuestion },
        });
      };

      const updatePlaceholder = (newPlaceholder: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, placeholder: newPlaceholder },
        });
      };

      return (
        <div className="w-full h-full flex flex-col py-4">
          <div className="w-full h-full flex flex-col gap-2">
            <input
              type="text"
              value={props.block.props.question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="text-lg font-medium text-gray-800 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
              placeholder="Type your question here..."
            />
            <Input
              type="email"
              className="max-w-sm h-12 px-4 py-1"
              value={props.block.props.placeholder}
              onChange={(e) => updatePlaceholder(e.target.value)}
              placeholder={props.block.props.placeholder}
            ></Input>
          </div>
        </div>
      );
    },
  }
);

// NUMBER BLOCK
const numberBlock = createReactBlockSpec(
  {
    type: "number",
    content: "none",
    propSchema: {
      question: { default: "Type your question here" },
      placeholder: { default: "Enter a number" },
      required: { default: false },
    },
  },
  {
    render: (props) => {
      const updateQuestion = (newQuestion: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, question: newQuestion },
        });
      };

      const updatePlaceholder = (newPlaceholder: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, placeholder: newPlaceholder },
        });
      };

      return (
        <div className="w-full h-full flex flex-col py-4">
          <div className="w-full h-full flex flex-col gap-2">
            <input
              type="text"
              value={props.block.props.question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="text-lg font-medium text-gray-800 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
              placeholder="Type your question here..."
            />
            <Input
              type="number"
              className="max-w-sm h-12 px-4 py-1"
              value={props.block.props.placeholder}
              onChange={(e) => updatePlaceholder(e.target.value)}
              placeholder={props.block.props.placeholder}
            ></Input>
          </div>
        </div>
      );
    },
  }
);

// MULTIPLE CHOICE BLOCK
const multipleChoiceBlock = createReactBlockSpec(
  {
    type: "multipleChoice",
    content: "none",
    propSchema: {
      question: { default: "Type your question here" },
      options: { default: "Option 1,Option 2,Option 3" },
      required: { default: false },
    },
  },
  {
    render: (props) => {
      const getOptionsArray = () => {
        return typeof props.block.props.options === "string"
          ? props.block.props.options
              .split(",")
              .map((opt) => opt)
              .filter((opt) => opt != "")
          : ["Option 1", "Option 2"];
      };

      const optionsArray = getOptionsArray();

      const updateQuestion = (newQuestion: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, question: newQuestion },
        });
      };

      const updateOptions = (newOptionsArray: string[]) => {
        const optionsString = newOptionsArray.join(",");
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, options: optionsString },
        });
      };

      const addOption = () => {
        const currentOptions = getOptionsArray();
        const newOptions = [
          ...currentOptions,
          `Option ${currentOptions.length + 1}`,
        ];
        updateOptions(newOptions);
      };

      const updateOption = (index: number, newValue: string) => {
        const currentOptions = getOptionsArray();
        const newOptions = [...currentOptions];
        newOptions[index] = newValue;
        updateOptions(newOptions);
      };

      const handleOptionKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
      ) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addOption();
        }
      };

      return (
        <div className="w-full h-full flex flex-col py-4">
          <div className="w-full h-full flex flex-col gap-2">
            <input
              id={`question-${props.block.id}`}
              type="text"
              value={props.block.props.question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="text-lg font-medium text-gray-800 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
              placeholder="Type your question here..."
            />
            <div className="space-y-2 max-w-sm">
              {optionsArray.map((option: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`preview-${props.block.id}`}
                    disabled
                    className="w-4 h-4"
                  />
                  <Input
                    id={`option-${props.block.id}-${index}`}
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    onKeyDown={(e) => handleOptionKeyDown(e, index)}
                    // placeholder={`Option ${index + 1}`}
                    className="flex-1 text-sm p-1 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <button
                onClick={addOption}
                className="text-blue-500 text-sm hover:text-blue-700"
              >
                + Add option
              </button>
            </div>
          </div>
        </div>
      );
    },
  }
);

// CHECKBOX BLOCK
const checkboxBlock = createReactBlockSpec(
  {
    type: "checkbox",
    content: "none",
    propSchema: {
      question: { default: "Type your question here" },
      options: { default: "Option 1,Option 2,Option 3" },
      required: { default: false },
    },
  },
  {
    render: (props) => {
      const getOptionsArray = () => {
        return typeof props.block.props.options === "string"
          ? props.block.props.options
              .split(",")
              .map((opt) => opt)
              .filter((opt) => opt != "")
          : ["Option 1", "Option 2"];
      };

      const optionsArray = getOptionsArray();

      const updateQuestion = (newQuestion: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, question: newQuestion },
        });
      };

      const updateOptions = (newOptionsArray: string[]) => {
        const optionsString = newOptionsArray.join(",");
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, options: optionsString },
        });
      };

      const addOption = () => {
        const currentOptions = getOptionsArray();
        const newOptions = [
          ...currentOptions,
          `Option ${currentOptions.length + 1}`,
        ];
        updateOptions(newOptions);
      };

      const updateOption = (index: number, newValue: string) => {
        const currentOptions = getOptionsArray();
        const newOptions = [...currentOptions];
        newOptions[index] = newValue;
        updateOptions(newOptions);
      };

      const handleOptionKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
      ) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addOption();
        }
      };

      return (
        <div className="w-full h-full flex flex-col py-4">
          <div className="w-full h-full flex flex-col gap-2">
            <input
              id={`question-${props.block.id}`}
              type="text"
              value={props.block.props.question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="text-lg font-medium text-gray-800 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
              placeholder="Type your question here..."
            />
            <div className="space-y-2 max-w-sm">
              {optionsArray.map((option: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="checkbox" disabled className="w-4 h-4" />
                  <Input
                    id={`checkbox-option-${props.block.id}-${index}`}
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    onKeyDown={(e) => handleOptionKeyDown(e, index)}
                    className="flex-1 text-sm p-1 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <button
                onClick={addOption}
                className="text-blue-500 text-sm hover:text-blue-700"
              >
                + Add option
              </button>
            </div>
          </div>
        </div>
      );
    },
  }
);

// SCHEMA
const mySchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    formTitle: formTitleBlock,
    pageBreak: pageBreakBlock,
    shortText: shortTextBlock,
    longText: longTextBlock,
    email: emailBlock,
    number: numberBlock,
    multipleChoice: multipleChoiceBlock,
    checkbox: checkboxBlock,
  },
});

// SLASH MENU ITEMS - Clean version with only form-specific items
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  // Form Structure
  {
    title: "Form Title",
    onItemClick: () =>
      insertOrUpdateBlock(editor, { type: "formTitle" } as any),
    aliases: ["title", "header", "form"],
    group: "Form Structure",
    icon: <Type size={18} />,
  },
  {
    title: "Page Break",
    onItemClick: () =>
      insertOrUpdateBlock(editor, { type: "pageBreak" } as any),
    aliases: ["page", "break"],
    group: "Form Structure",
    icon: <Divide size={18} />,
  },

  // Basic Questions
  {
    title: "Short Text",
    onItemClick: () =>
      insertOrUpdateBlock(editor, { type: "shortText" } as any),
    aliases: ["text", "short"],
    group: "Basic Questions",
    icon: <Type size={18} />,
  },
  {
    title: "Long Text",
    onItemClick: () => insertOrUpdateBlock(editor, { type: "longText" } as any),
    aliases: ["textarea", "long"],
    group: "Basic Questions",
    icon: <AlignLeft size={18} />,
  },
  {
    title: "Email",
    onItemClick: () => insertOrUpdateBlock(editor, { type: "email" } as any),
    aliases: ["email", "mail"],
    group: "Basic Questions",
    icon: <Mail size={18} />,
  },
  {
    title: "Number",
    onItemClick: () => insertOrUpdateBlock(editor, { type: "number" } as any),
    aliases: ["number", "num"],
    group: "Basic Questions",
    icon: <Hash size={18} />,
  },

  // Advanced Questions
  {
    title: "Multiple Choice",
    onItemClick: () =>
      insertOrUpdateBlock(editor, { type: "multipleChoice" } as any),
    aliases: ["choice", "radio"],
    group: "Advanced Questions",
    icon: <Circle size={18} />,
  },
  {
    title: "Checkbox",
    onItemClick: () => insertOrUpdateBlock(editor, { type: "checkbox" } as any),
    aliases: ["checkbox", "check"],
    group: "Advanced Questions",
    icon: <Square size={18} />,
  },
];

//fucking parser function this is the heartt ngl
const parseFormByPages = (editor: any) => {
  const blocks = editor.document;
  const pages = [];
  let currentPage: any = [];
  let formMetadata = {
    title: "Untitled Form",
    description: "",
  };

  blocks.forEach((block: any) => {
    if (block.type === "formTitle") {
      // Extract form metadata
      formMetadata = {
        title: block.props.title || "Untitled Form",
        description: block.props.description || "",
      };
    } else if (block.type === "pageBreak") {
      if (currentPage.length > 0) {
        //count number of pages and create an object with all shit inisde the page break
        const pageNumber = pages.length + 1;
        pages.push({
          id: `page-${pageNumber}`,
          type: "pageBreak",
          content: currentPage,
          props: {},
        });
        currentPage = [];
      } else {
        const pageNumber = pages.length + 1;
        pages.push({
          id: `page-${pageNumber}`,
          type: "pageBreak",
          content: [],
          props: {},
        });
      }
    } else if (
      [
        "shortText",
        "longText",
        "email",
        "number",
        "multipleChoice",
        "checkbox",
      ].includes(block.type)
    ) {
      currentPage.push(block);
    }
  });

  if (currentPage.length > 0) {
    const pageNumber = pages.length + 1;
    pages.push({
      id: `page-${pageNumber}`,
      type: "pageBreak",
      content: currentPage,
      props: {},
    });
  }
  return {
    metadata: formMetadata,
    pages,
  };
};


function FormBuilder({
  formId,
  initialContent,
  formMetadata,
}: {
  formId?: string;
  initialContent?: any;
  formMetadata?: any;
}) {
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const title = formMetadata?.title

  const { getToken } = useAuth();
  //use router for routing
  const router = useRouter()

  //call the saveForm so users dont have to manually hit save to save a form when they create  a new form
  useEffect(() => {
    saveForm();
  }, []);

  const editor = useCreateBlockNote({
    schema: mySchema,
    initialContent: initialContent || [
      {
        type: "formTitle",
        props: {
          title: "Untitled Form",
        },
        content: [],
      },
      {
        type: "pageBreak",
        content: [],
      },
      {
        type: "shortText",
        content: [],
      },
      {
        type: "pageBreak",
        content: [],
      },
      {
        type: "shortText",
        content: [],
      },
    ],
  });


  const saveForm = async () => {
    try {
      const token = await getToken();
      const formStructure: any = parseFormByPages(editor);
      const formData = {
        title: formStructure.metadata?.title || "Untitled Form",
        description: formStructure.metadata?.description || "",
        content: formStructure.pages,
        isPublic: true, // Make public by default for sharing
      };

      console.log("Saving form:", formData);

      let response;
      if (formId) {
        // Update existing form
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/forms/${formId}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new form
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/forms`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Form saved successfully:", data);


      // If this was a new form, redirect to edit page
      if (!formId && data.id) {
        router.push(`/builder/${data.id}`)
      }
    } catch (error) {
      console.error("Error saving form:", error);

    }
  };

 

  if (isPreview) {
    const pages = parseFormByPages(editor);

    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Form Preview</h1>
          <button
            onClick={() => setIsPreview(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Editor
          </button>
        </div>

        <div className="space-y-8">
          {pages.pages.map((page, pageIndex) => (
            <div key={pageIndex} className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-lg font-bold mb-4">Page {pageIndex + 1}</h2>
              <div className="space-y-4">
                {page.map((block, blockIndex) => (
                  <div key={blockIndex} className="p-4 border rounded">
                    <p className="font-medium mb-2">
                      {block.content?.[0]?.text || `Question ${blockIndex + 1}`}
                    </p>
                    <p className="text-sm text-gray-500">Type: {block.type}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      {/* Tally.so style header */}
      <div className="flex items-center justify-between px-6 py-4 border-b ">
        {/* Left side - Back button and form info */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-900">
              {title}
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              Draft
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => saveForm()}
            className="text-gray-600 hover:text-gray-900"
          >
            Save
          </Button>

          <Button
            size="sm"
            onClick={() =>
              toast("Form URL copied to clipboard!", {
                description: "Share your form with others",
                action: {
                  label: "Copy",
                  onClick: () => handleShare(),
                },
              })
            }
            className="bg-black hover:bg-gray-800 text-white"
          >
            Share
          </Button>
        </div>
      </div>

      {/* Editor - Full height minus header */}
      <div className="flex-1 overflow-hidden bg-white">
        <div className="h-full max-w-2xl mx-auto bg-white overflow-y-auto scrollbar-hide ">
          <BlockNoteView
            editor={editor as any}
            slashMenu={false}
            theme="light"
            className="min-h-screen px-8 py-8" // Changed from h-full to min-h-full
          >
            <SuggestionMenuController
              triggerCharacter="/"
              getItems={async (query) =>
                //@ts-ignore
                filterSuggestionItems(getCustomSlashMenuItems(editor), query)
              }
            />
          </BlockNoteView>
        </div>
      </div>
    </div>
  );
}
import dynamic from "next/dynamic";

const FormBuilderClient = dynamic(() => Promise.resolve(FormBuilder), {
  ssr: false,
});

export default FormBuilderClient;

