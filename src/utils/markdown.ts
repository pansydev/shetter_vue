import markdownIt from "markdown-it";

export const markdown = markdownIt({
  breaks: true,
});

// Disable all headings
markdown.disable(["lheading", "heading"]);
