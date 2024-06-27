import { ReportData } from "@/types/types";
import { RefObject } from "react";
import { styledHtml } from "./sample";

export function scrollLeft(ref: RefObject<HTMLDivElement>) {
  if (ref.current) {
    ref.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }
}

export function getHostname(url: string) {
  const parsedUrl = new URL(url);
  const name = parsedUrl.hostname;
  return name;
}
export function scrollRight(ref: RefObject<HTMLDivElement>) {
  if (ref.current) {
    ref.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }
}

export function getHtmlArray(report: string) {
  const styledReport = styledHtml(report);
  const htmlArray = [styledReport];
  return htmlArray
}


export function createLink(link: string) {
  const parsedUrl = new URL(link);
  const name = parsedUrl.hostname;
  return `<a href={${link}}>${name}</a>`;
}

export function createDiv(children: string) {
  return `<div class="links">${children}</div>`;
}
export function extractReports(data: ReportData): string[] {
  const reports: string[] = [];
  Object.keys(data).forEach((reportKey) => {
    const sections = data[reportKey];
    Object.keys(sections).forEach((sectionKey) => {
      const references = Object.keys(sections[sectionKey].references);
      const linkedReferences = references.map((link) => createLink(link));
      const joinedLinks = linkedReferences.join("");
      const linkWrappper = createDiv(joinedLinks);
      const report = sections[sectionKey].report.concat(linkWrappper);
      const styledReport = styledHtml(report);
      reports.push(styledReport);
    });
  });
  return reports;
}
