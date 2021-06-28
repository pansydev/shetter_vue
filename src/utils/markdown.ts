import markdownIt from "markdown-it";
import markdownMention from "@shetter/utils/markdown-mention";

const markdown = markdownIt({
  breaks: true,
});

// Constraints
markdown.disable(["lheading", "heading", "image"]);

// Plugins
markdown.use(markdownMention, {
  accountUrl(username: string) {
    return `${import.meta.env.APP_URL}/user/${username}`;
  },
});

export default function (input: string): string {
  return markdown.render(input);
}
