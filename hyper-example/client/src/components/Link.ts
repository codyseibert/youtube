import { routerHash } from "../config";
import html from "hyperhtml";

interface LinkContext {
  class?: String;
  href: String;
  text: String;
}

export const Link = (context: LinkContext) =>
  html`<a class=${context.class} href="${routerHash}${context.href}"
    >${context.text}</a
  > `;
