import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef, StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { toast } from "sonner";
function Logo() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "fixed top-[var(--top,7dvh)] w-[var(--size,5dvh)] h-[var(--size,5dvh)] left-2/4 animate-[rotate_20s_linear_infinite]",
      "aria-label": "리액트",
      viewBox: "0 0 21 21",
      fill: "none",
      children: [
        /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip-0zk)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M10.5 12.45C11.6046 12.45 12.5 11.5546 12.5 10.45C12.5 9.34543 11.6046 8.45 10.5 8.45C9.39543 8.45 8.5 9.34543 8.5 10.45C8.5 11.5546 9.39543 12.45 10.5 12.45Z",
              fill: "currentColor"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M10.5 14.95C16.0228 14.95 20.5 12.9353 20.5 10.45C20.5 7.96472 16.0228 5.95 10.5 5.95C4.97715 5.95 0.5 7.96472 0.5 10.45C0.5 12.9353 4.97715 14.95 10.5 14.95Z",
              stroke: "currentColor"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M6.60289 12.7C9.36431 17.4829 13.3477 20.3529 15.5 19.1103C17.6523 17.8676 17.1585 12.9829 14.3971 8.2C11.6357 3.41707 7.65232 0.547105 5.5 1.78975C3.34768 3.03239 3.84146 7.91707 6.60289 12.7Z",
              stroke: "currentColor"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M6.60289 8.2C3.84146 12.9829 3.34768 17.8676 5.5 19.1103C7.65232 20.3529 11.6357 17.4829 14.3971 12.7C17.1585 7.91707 17.6523 3.03239 15.5 1.78975C13.3477 0.547105 9.36431 3.41707 6.60289 8.2Z",
              stroke: "currentColor"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip-0zk", children: /* @__PURE__ */ jsx("rect", { width: 21, height: 19, fill: "#fff", transform: "translate(0 1)" }) }) })
      ]
    }
  );
}
function Output({ count, targetCount }) {
  const isCompleted = count >= targetCount;
  const classNames = `${baseClass} ${isCompleted ? "" : animateClass}`.trim();
  return /* @__PURE__ */ jsx("output", { className: classNames, children: count });
}
const baseClass = `select-none [cursor:inherit] text-[30vh] font-['Spoqa_Han_Sans_Neo'] font-thin leading-none`;
const animateClass = "animate-[wiggle_600ms_infinite_alternate]";
function Shortcut() {
  return /* @__PURE__ */ jsxs("p", { className: "fixed left-0 right-0 bottom-[var(--bottom,7vh)] text-sm leading-5 text-center", children: [
    /* @__PURE__ */ jsx("code", { children: "Shift + Enter" }),
    " 키를 누르면 애니메이션이 다시 시작됩니다."
  ] });
}
function getRandomCount(min = 1, max = 10) {
  return Math.round(Math.random() * (max - min) + min);
}
function getRandomHueColor() {
  return getRandomCount(0, 360);
}
function setAppColor() {
  const value = getRandomHueColor();
  document.body.style.setProperty("--hue", `${value}`);
}
const setDocumentTitle = (() => {
  if (typeof document === "undefined") return () => {
  };
  const ORIGIN_TITLE = document.title;
  return function setDocumentTitle2(targetCount) {
    document.title = `(${targetCount}) ${ORIGIN_TITLE}`;
  };
})();
const MIN = 50;
const MAX = 90;
const getTargetCount = () => getRandomCount(MIN, MAX);
function RandomCountUp() {
  const [targetCount, setTargetCount] = useState(getTargetCount);
  useEffect(() => {
    setDocumentTitle(targetCount);
    setAppColor();
  }, [targetCount]);
  const [count, setCount] = useState(0);
  const animateRef = useRef(0);
  useEffect(() => {
    animateRef.current = requestAnimationFrame(() => {
      if (count < targetCount) {
        setCount((c) => c + 1);
      } else {
        toast.success("카운트 업 애니메이션 종료!", {
          action: {
            label: "리플레이",
            onClick: () => {
              setReplay((r) => r + 1);
            }
          }
        });
      }
    });
    return () => {
      cancelAnimationFrame(animateRef.current);
    };
  }, [count, targetCount]);
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleReplay = () => {
      setCount(0);
      setTargetCount(getTargetCount());
      setReplay((r) => r + 1);
    };
    const handleShortcut = (e) => {
      if (e.shiftKey && e.code === "Enter") handleReplay();
    };
    document.addEventListener("click", handleReplay);
    document.addEventListener("keydown", handleShortcut);
    return () => {
      document.removeEventListener("click", handleReplay);
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "randomCountUpApp", children: [
    /* @__PURE__ */ jsx(Logo, {}),
    /* @__PURE__ */ jsx(Output, { count, targetCount }, replay),
    /* @__PURE__ */ jsx(Shortcut, {})
  ] });
}
function render(_url) {
  const html = renderToString(
    /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(RandomCountUp, {}) })
  );
  return { html };
}
export {
  render
};
