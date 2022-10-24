export const openLinkSelf = (href: string): void => {
  window.open(href, '_self');
};

export const openLinkBlank = (href: string): void => {
  window.open(href, '_blank');
};
