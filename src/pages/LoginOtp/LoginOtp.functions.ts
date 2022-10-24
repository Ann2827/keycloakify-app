// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const $: any;

const selector = '.card-pf-view-single-select';

export const evaluateInlineScript = () => {
  $(document).ready(function () {
    // Card Single Select
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $(selector).click(function (this: any) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).children().removeAttr('name');
      } else {
        $(selector).removeClass('active');
        $(selector).children().removeAttr('name');
        $(this).addClass('active');
        $(this).children().attr('name', 'selectedCredentialId');
      }
    });

    const defaultCred = $(selector)[0];
    if (defaultCred) {
      defaultCred.click();
    }
  });
};

export const join = (...paths: string[]): string =>
  paths.map((i) => i.replace(/^\/|\/$/, '')).reduce((prev, item) => `${prev}/${item}`, '');
