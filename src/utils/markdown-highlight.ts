import highlight from "highlight.js";

export default function(input: string, language?: string): string {
  if (!language || !highlight.getLanguage(language)) {
    return "";
  }

  try {
    return highlight.highlight(input, { language }).value;
  } catch(_) {
    return "";
  }
}