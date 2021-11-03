declare const $: any;

const selector = '.card-pf-view-single-select';

export const evaluateInlineScript = () => {
  $(document).ready(function () {
    // Card Single Select
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
