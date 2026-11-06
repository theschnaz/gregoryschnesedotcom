/** Path of a page's Markdown twin: "/" -> "/index.md", "/work/x/" -> "/work/x.md". */
export const mdPathFor = (pagePath: string) => {
  const clean = pagePath.replace(/\/+$/, '');
  return clean === '' ? '/index.md' : `${clean}.md`;
};
