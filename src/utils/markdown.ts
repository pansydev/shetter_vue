import markdownIt from "markdown-it";
import markdownMention from "@shetter/utils/markdown-mention";
import markdownHighlight from "@shetter/utils/markdown-highlight";

const markdown = markdownIt({
  linkify: true,
  breaks: true,
  highlight: markdownHighlight
});

// Constraints
markdown.disable(["lheading", "heading", "image"]);

// Plugins
markdown.use(markdownMention, {
  accountUrl(username: string) {
    return `${import.meta.env.VITE_APP_URL}/user/${username}`;
  },
});

export default function (input: string): string {
  return markdown.render(input);
}
