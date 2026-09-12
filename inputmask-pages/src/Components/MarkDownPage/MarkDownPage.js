import { createElement, Fragment, useEffect, useContext } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import styles from "./MarkDownPage.module.scss";
import "highlight.js/scss/github-dark-dimmed.scss";
import { MarkDownPageContext } from "./MarkDownPageContext";

const DANGEROUS_TAGS = new Set(["script", "iframe", "object", "embed", "style"]);
const UNSAFE_URL = /^\s*(javascript|data|vbscript):/i;

// Strips executable content (script/iframe tags, on*-handlers and
// javascript:/data: URLs) from the fetched markdown's HTML tree before it
// is turned into React elements, since the markdown is fetched from a
// caller-supplied, potentially untrusted `md` URL.
const sanitizeHast = () => (tree) => {
  visit(tree, "element", (node) => {
    if (DANGEROUS_TAGS.has(node.tagName)) {
      node.tagName = "span";
      node.children = [];
      node.properties = {};
      return;
    }
    if (node.properties) {
      Object.keys(node.properties).forEach((key) => {
        const value = node.properties[key];
        if (/^on/i.test(key) || ((key === "href" || key === "src") && typeof value === "string" && UNSAFE_URL.test(value))) {
          delete node.properties[key];
        }
      });
    }
  });
};

export const MarkDownPage = (props) => {
  const { className, md, children } = props,
    { Content, setContent } = useContext(MarkDownPageContext);

  useEffect(() => {
    fetch(md)
      .then((res) => res.text())
      .then((text) =>
        unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehype, { Fragment: true })
          .use(rehypeSlug)
          .use(rehypeAutolinkHeadings)
          .use(rehypeHighlight, { detect: true })
          .use(sanitizeHast)
          .use(rehypeReact, { createElement, Fragment })
          .process(text.replace(/{{year}}/g, new Date().getFullYear()))
          .then((file) => {
            setContent(file.result);
          })
      );
    return () => {
      setContent(<></>);
    };
  }, [md, setContent]);

  return (
    <div
      className={`${styles.MarkDownPage} ${className}`}
      data-testid="MarkDownPage">
      {Content}
      {children}
    </div>
  );
};
