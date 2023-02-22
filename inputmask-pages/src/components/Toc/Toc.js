import { useEffect, useContext, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { MarkDownPageContext } from "../MarkDownPage/MarkDownPageContext";

import styles from "./Toc.module.scss";

export const Toc = (props) => {
  const {
      contentSelector,
      headingSelector = "h2, h3",
      title = "Table of contents",
      className = "",
      scrollContainer
    } = props,
    { Content } = useContext(MarkDownPageContext),
    lastSection = useRef([]),
    [Toc, setToc] = useState(),
    tocBuilder = useCallback((nodes, selectors, className = "") => {
      const [selector, ...other] = selectors,
        node = selector ? nodes.shift() : undefined;

      if (node) {
        if (node.tagName.toLowerCase() !== selector.toLowerCase()) {
          nodes.unshift(node);
          return <></>;
        }
      }

      // eslint-disable-next-line no-unused-vars
      // function clickHandler(e) {
      //   let target = e.target.closest("li, ul");
      //   if (!target) return;

      //   switch (target.tagName) {
      //     case "A":
      //       target = target.parentNode;
      //       break;
      //     case "UL":
      //       target = target.firstChild;
      //       break;
      //   }

      //   target.classList.toggle("open");
      //   target.classList.toggle("close");
      // }

      return (
        node && (
          <>
            {node.tagName.toLowerCase() === selector.toLowerCase() && (
              <ul>
                <li key={node.id} className={className}>
                  <Link to={`#${node.id}`}>{node.innerText}</Link>
                  {tocBuilder(nodes, other)}
                </li>
              </ul>
            )}
            {selector && tocBuilder(nodes, selectors, className)}
          </>
        )
      );
    }, []),
    scrollSpy = useCallback(
      (container, sections) => {
        function scrollSpyHandler() {
          sections.forEach((section) => {
            const top = section.offsetTop,
              id = section.getAttribute("id"),
              link = document.querySelector(`.${styles.Toc} a[href$="#${id}"]`);
            if (link) {
              if (
                top >= container.scrollTop + container.offsetTop &&
                top < container.scrollTop + container.offsetHeight
              ) {
                if ([...link.parentNode.classList].indexOf("close") !== -1) {
                  link.parentNode.classList.remove("close");
                  link.parentNode.classList.add("open");
                  if (lastSection.current.indexOf(link.parentNode) === -1)
                    lastSection.current.push(link.parentNode);
                }
                link.parentNode.classList.add("active");
              } else {
                link.parentNode.classList.remove("active");
                if (
                  lastSection.current.length > 1 &&
                  lastSection.current[0].querySelectorAll(".active").length ===
                    0
                ) {
                  const ulSection = lastSection.current.shift();
                  if ([...ulSection.classList].indexOf("open") !== -1) {
                    ulSection.classList.remove("open");
                    ulSection.classList.add("close");
                  }
                }
              }
            }
          });
        }
        container.addEventListener("scroll", scrollSpyHandler);
        return () => {
          container.removeEventListener("scroll", scrollSpyHandler);
        };
      },
      [lastSection]
    );

  useEffect(() => {
    const contentContainer = document.querySelector(contentSelector),
      tocElements = contentContainer.querySelectorAll(headingSelector);
    setToc(tocBuilder([...tocElements], headingSelector.split(", "), "close"));
    scrollSpy(contentContainer.parentNode, [...tocElements]);
    setTimeout(() => {
      contentContainer.parentNode.dispatchEvent(new Event("scroll"));
    }, 0);

    return () => {
      setToc(<></>);
    };
  }, [
    Content,
    contentSelector,
    headingSelector,
    scrollContainer,
    scrollSpy,
    tocBuilder
  ]);

  // eslint-disable-next-line one-var
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;
    if (hash !== "") {
      setTimeout(() => {
        const id = hash.replace("#", ""),
          element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [location]);

  return (
    <div className={`${styles.Toc} ${className}`} data-testid="Toc">
      <span>{title}</span>
      {Toc}
    </div>
  );
};
