import type { Node, NodeList } from "subtitle";

// https://github.com/gsantiago/subtitle.js/pull/101
export const resyncNode = (node: Node, time: number): Node => {
  if (node.type !== "cue") return node;

  return {
    ...node,
    data: {
      ...node.data,
      start: node.data.start + time,
      end: node.data.end + time,
    },
  };
};

export const resyncSync = (nl: NodeList, time: number): NodeList => {
  return nl.map(n => resyncNode(n, time))
};
