"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BlockNoteEditor,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
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
      const [options, setOptions] = useState(
        props.block.props.options || ["Option 1", "Option 2"]
      );

      const optionsArray = typeof props.block.props.options === 'string' 
      ? props.block.props.options.split(',').map(opt => opt.trim())
      : props.block.props.options || [];

      const updateQuestion = (newQuestion: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, question: newQuestion },
        });
      };

      const updateOptions = (newOptions: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, options: newOptions },
        });
      };

      const addOption = () => {
        const newOptions = [...options, `Option ${options.length + 1}`];
        setOptions(newOptions);
        updateOptions(newOptions);
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
            <div className="space-y-2 max-w-sm">
            {optionsArray.map((option:any, index:number) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`preview-${props.block.id}`}
                    disabled
                    className="w-4 h-4"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                      updateOptions(newOptions);
                    }}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm"
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
      const [options, setOptions] = useState(
        props.block.props.options || ["Option 1", "Option 2"]
      );

      const optionsArray = typeof props.block.props.options === 'string' 
      ? props.block.props.options.split(',').map(opt => opt.trim())
      : props.block.props.options || [];

      const updateQuestion = (newQuestion: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, question: newQuestion },
        });
      };

      const updateOptions = (newOptions: any) => {
        props.editor.updateBlock(props.block, {
          props: { ...props.block.props, options: newOptions },
        });
      };

      const addOption = () => {
        const newOptions = [...options, `Option ${options.length + 1}`];
        setOptions(newOptions);
        updateOptions(newOptions);
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
            <div className="space-y-2 max-w-sm">
              {optionsArray.map((option:any, index:number) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="checkbox" disabled className="w-4 h-4" />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                      updateOptions(newOptions);
                    }}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm"
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
    pageBreak: pageBreakBlock,
    shortText: shortTextBlock,
    longText: longTextBlock,
    email: emailBlock,
    number: numberBlock,
    multipleChoice: multipleChoiceBlock,
    checkbox: checkboxBlock,
  },
});

// SLASH MENU ITEMS
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),

  // Page Controls
  {
    title: "Page Break",
    onItemClick: () => insertOrUpdateBlock(editor, { type: "pageBreak" } as any),
    aliases: ["page", "break"],
    group: "Page Controls",
    icon: <Divide size={18} />,
  },

  // Basic Questions
  {
    title: "Short Text",
    onItemClick: () => insertOrUpdateBlock(editor, { type: "shortText" } as any),
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
  {
    title: "Multiple Choice",
    onItemClick: () => insertOrUpdateBlock(editor, { type: "multipleChoice" } as any),
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

// PARSER FUNCTION
const parseFormByPages = (editor: any) => {
  const blocks = editor.document;
  const pages = [];
  let currentPage:any = [];

  blocks.forEach((block:any) => {
    if (block.type === "pageBreak") {
      if (currentPage.length > 0) {
        //count number of pages and create an object with all shit inisde the page break
        const pageNumber = pages.length + 1;
        pages.push({
            id: `page-${pageNumber}`,
            type: "pageBreak",
            content: currentPage,
            props: {}
        });
        currentPage = [];
      }else {
        const pageNumber = pages.length + 1;
        pages.push({
            id: `page-${pageNumber}`,
            type: "pageBreak",
            content: [],
            props: {}
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

  if (currentPage.length > 0){
    const pageNumber = pages.length + 1;
    pages.push({
      id: `page-${pageNumber}`,
      type: "pageBreak",
      content: currentPage, 
      props: {}
    });
  }
  return pages;
};

const exportFormv2 = (editor:any) => {
    const pages = parseFormByPages(editor);
    console.log("Form Pages:", pages);
    alert(`Form has ${pages.length} pages. Check console for structure.`);
}

export default function FormBuilder() {
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [title, setTitle] = useState<string>("Form Title");

  const editor = useCreateBlockNote({
    schema: mySchema,
    initialContent: [
      {
        type: "paragraph",
        content:
          "Build your form below. Use / to add questions and page breaks.",
      },
    ],
  });

  const exportForm = () => {
    const pages = parseFormByPages(editor);
    console.log("Form Pages:", pages);
    alert(`Form has ${pages.length} pages. Check console for structure.`);
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
          {pages.map((page, pageIndex) => (
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

  return (
    <div className="h-full w-full flex flex-col">
      {/* <div className="border-b p-4 flex justify-between items-center bg-white">
        <h1 className="text-xl font-bold">Form Builder</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPreview(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Preview
          </button>
          <button
            onClick={exportForm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Export
          </button>
        </div>
      </div> */}
      <div className="w-full h-full flex flex-col">
        <div className="border-b border-gray-200 w-full flex-none"></div>
        <div className="flex flex-row justify-between items-center px-14 py-8">
          <div>stupidforms</div>
          <div className="flex flex-row gap-2">
            <Button onClick={() => setIsPreview(true)}>
              <Plus /> Preview
            </Button>
            <Button onClick={() => exportFormv2(editor)}>
              <Download /> Export
            </Button>
          </div>
        </div>
      </div>

      {/* Make the editor take full remaining height */}
      <div className="w-full h-full not-first:flex-1">
        <BlockNoteView
          editor={editor}
          slashMenu={false}
          theme="light"
          className="h-full w-full"
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
  );
}
