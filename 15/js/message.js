import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const showMessage = (templateSelector) => {
  const template = document.querySelector(templateSelector).content;
  const templateClone = template.cloneNode(true);
  const messageElement = templateClone.firstElementChild;
  document.body.append(messageElement);

  const closeButton = messageElement.querySelector('.success__button, .error__button');

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

  closeButton.addEventListener('click', closeMessage);

  document.addEventListener('keydown', onDocumentKeydown, { capture: true });
  messageElement.addEventListener('click', onMessageClick);
};

const showDataError = () => {
  const errorTemplate = document.querySelector('#data-error').content;
  const errorClone = errorTemplate.cloneNode(true);
  const errorElement = errorClone.firstElementChild;
  document.body.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

export { showDataError, showMessage };
