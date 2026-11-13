import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const createMessageElement = (templateSelector) => {
  const templateFragment = document.querySelector(templateSelector).content;
  const templateCloneFragment = templateFragment.cloneNode(true);
  const messageElement = templateCloneFragment.firstElementChild;

  document.body.append(messageElement);

  return messageElement;
};

const showMessage = (templateSelector) => {
  const messageElement = createMessageElement(templateSelector);

  const closeButtonElement = messageElement.querySelector('.success__button, .error__button');

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown, { capture: true });
    messageElement.removeEventListener('click', onMessageClick);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      closeMessage();
    }
  }

  function onMessageClick(evt) {
    if (evt.target === messageElement) {
      closeMessage();
    }
  }

  closeButtonElement.addEventListener('click', closeMessage);

  document.addEventListener('keydown', onDocumentKeydown, { capture: true });
  messageElement.addEventListener('click', onMessageClick);
};

const showDataError = () => {
  const errorElement = createMessageElement('#data-error');

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

export { showDataError, showMessage };
