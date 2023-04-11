import { MouseEventHandler } from "react";

export interface TextEditorProps {
  text?: string,
  primary?: boolean,
  disabled?: boolean,
  size?: "small" | "medium" | "large",
  onClick?: MouseEventHandler<HTMLButtonElement>
}