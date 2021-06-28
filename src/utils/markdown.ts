// import unified from "unified";
// import remarkParse from "remark-parse";
// import remarkBreaks from "remark-breaks";
// import remarkGithub from "remark-gfm";
// import remarkRehype from "remark-rehype";
// import rehypeStringify from "rehype-stringify";
//
// const processor = unified()
//   .use(remarkParse)
//   .use(remarkBreaks)
//   .use(remarkGithub)
//   .use(remarkRehype, {
//     allowDangerousHtml: true
//   })
//   .use(rehypeStringify);
//
// export default function (input: string): string {
//   const { contents } = processor.processSync(input);
//   return contents.toString();
// }

import markdownIt from "markdown-it";
import markdownMention from "@shetter/utils/markdown-mention";

const markdown = markdownIt({
  breaks: true
});

// Constraints
markdown.disable(["lheading", "heading", "image"])

// Plugins
markdown.use(markdownMention, {
  accountUrl(username: string) {
    return `https://pansy.dev/shetter/user/${username}`;
  }
});

export default function (input: string): string {
  return markdown.render(input);
}