export type BlockType = "short_text" | "long_text" | "multiple_choice";

export const defaultBlocks = {
  short_text: { label: "Untitled question", placeholder: "Your answer" },
  long_text: { label: "Untitled long question", placeholder: "Type your answer" },
  multiple_choice: { label: "Untitled MCQ", options: ["Option 1"] }
};