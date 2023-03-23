import { createElement, Fragment, useEffect, useContext } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import styles from "./MarkDownPage.module.scss";
import "highlight.js/scss/github-dark-dimmed.scss";
import { MarkDownPageContext } from "./MarkDownPageContext";

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
