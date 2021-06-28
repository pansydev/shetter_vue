import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import StateCore from "markdown-it/lib/rules_core/state_core";

export interface MentionOptions {
  shouldMention?(username: string): boolean;

  accountUrl(username: string): string;
}

const renderMention = (tokens: Token[], index: number, options: MentionOptions): string => {
  const { content, meta } = tokens[index];
  const { username } = meta;

  const url = options.accountUrl(username);
  const shouldMention = options.shouldMention?.(username) ?? true;

  if (!shouldMention) {
    return content;
  }

  return `<a href="${url}" class="mention">${content}</a>`;
};

const coreRuler = (md: MarkdownIt, state: StateCore): boolean => {
  const MENTION_PATTERN = /(@\w+)/g;
  const { tokens: blockTokens } = state;

  const makeToken = (type: string, content: string): Token => {
    const newToken = new Token(type, "", 0);
    newToken.content = content;

    if (type === "mention") {
      const username = content.slice(1);
      newToken.meta = { username };
    }

    return newToken;
  }

  for (let i = 0; i < blockTokens.length; i++) {
    const blockToken = blockTokens[i];
    let tokens = blockToken.children!;

    if (blockToken.type !== "inline") {
      continue;
    }

    for (let j = tokens.length - 1; j >= 0; j--) {
      const token = tokens[j];

      if (token.type === "text" && MENTION_PATTERN.test(token.content)) {
        const newTokens = token.content.split(MENTION_PATTERN)
          .map((item, index) => ({ type: (index % 2 === 0 ? "text" : "mention"), content: item }))
          .filter(item => item.content.length > 0)
          .map(item => makeToken(item.type, item.content));

        blockTokens[i].children = tokens = md.utils.arrayReplaceAt(tokens, j, newTokens);
      }
    }
  }

  return true;
};

export default function(md: MarkdownIt, options: MentionOptions) {
  md.renderer.rules.mention = (tokens, index) => {
    return renderMention(tokens, index, options);
  };

  md.core.ruler.push("mention", state => {
    return coreRuler(md, state);
  });
}