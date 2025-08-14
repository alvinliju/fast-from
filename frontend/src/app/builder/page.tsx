"use client";
import { Input } from "@/components/ui/input";
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
import { div } from "motion/react-client";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { createReactBlockSpec } from "@blocknote/react";
import { defaultBlockSchema, BlockNoteSchema } from "@blocknote/core";

type MySchema = typeof mySchema;
type MyBlock = MySchema["Block"];
type MyEditor = BlockNoteEditor<MySchema>;

// Custom Slash Menu item to insert a block after the current one.
const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: "Insert Hello World",
  onItemClick: () =>
    // If the block containing the text caret is empty, `insertOrUpdateBlock`
    // changes its type to the provided block. Otherwise, it inserts the new
    // block below and moves the text caret to it. We use this function with
    // a block containing 'Hello World' in bold.
    insertOrUpdateBlock(editor, {
      type: "paragraph",
      content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
    }),
  aliases: ["helloworld", "hw"],
  group: "Other",
  icon: <HiOutlineGlobeAlt size={18} />,
  subtext: "Used to insert a block with 'Hello World' below.",
});



// const insertShortAnswerItem = (editor: BlockNoteEditor) => ({
//   title: "short answer",
//   onItemClick: () => {
//     insertOrUpdateBlock(editor, {
//       type: "paragraph",
//       content: [
//         { type: "text", text: "What is your name?", styles: { bold: true } },
//       ],
//       id: editor.getTextCursorPosition().block.id,
//       position: "after",
//       props: {
//         type: "text",
//       },
//     });
//   },
// });

const insertShortAnswerItem = (editor: BlockNoteEditor) => ({
    title: "short answer",
    onItemClick: () => {
        insertOrUpdateBlock(editor, {
            type: "shortAnswer",
            props:{
                question: "What is your name?",
                placeholder: "Type your placeholder here bbbyy...",
                required: false,
            }
        })
    }
})
const shortAnswerBlock = createReactBlockSpec({
  type: "shortAnswer",
  content: "inline",
  propSchema: {
    question: {
      default: "What is your name?",
    },
    placeholder: {
      default: "Type your placeholder here bbbyy...",
    },
    required: {
      default: false,
    },
  },

},
{
render:(props) => (
    <div className="border-2 border-blue-200 rounded-lg p-4 my-4 bg-blue-50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-blue-600">Short Answer</span>
        </div>
        <div className="question-title mb-3" ref={props.contentRef}>
          {props.block.props.question}
        </div>
        <Input 
          type="text"
          placeholder={props.block.props.placeholder} 
        />
      </div>
  ),
});

const mySchema = BlockNoteSchema.create({
    blockSpecs: {
        // enable the default blocks if desired
        ...defaultBlockSpecs,
        // Add your own custom blocks:
        shortAnswer:shortAnswerBlock,
        // customBlock: CustomBlock,
      },
});

// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertHelloWorldItem(editor),
  insertShortAnswerItem(editor),
];



export default function App() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    schema: mySchema,
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "Press the '/' key to open the Slash Menu",
      },
      {
        type: "paragraph",
        content: "Notice the new 'Insert Hello World' item - try it out!",
      },
      {
        type: "paragraph",
      },
    ],
  });

  // Renders the editor instance.
  return (
    <BlockNoteView editor={editor} slashMenu={false}>
      <SuggestionMenuController
        triggerCharacter={"/"}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) =>
          // @ts-ignore
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
    </BlockNoteView>
  );
}
