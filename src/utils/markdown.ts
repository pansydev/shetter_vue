import markdownIt from "markdown-it";

const markdown = markdownIt({
  breaks: true,
});

// Disable all headings
markdown.disable(["lheading", "heading"]);

export default function (input: string): string {
  return markdown.render(input);
}
