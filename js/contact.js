/* ==========================================================================
   Contact form

   There is no back-end behind this site, so the form does not send anything
   by itself. It checks the fields and then hands the message over to the
   visitor's own mail app with everything already filled in.

   The message on screen says exactly that, so nobody is left thinking their
   message arrived when it did not.

   Messages come from js/i18n.js, so they follow the chosen language.
   ========================================================================== */

(function () {
  'use strict';

  var EMAIL_ADDRESS = 'shakeelramdhiansing@gmail.com';

  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var note = form.querySelector('[data-form-note]');
  var mailLink = form.querySelector('[data-mail-link]');

  function t(key, fallback) {
    return window.I18n ? window.I18n.t(key) : fallback;
  }

  var fields = [
    { input: form.elements.name, error: 'form.error.name', fallback: 'Please fill in your name.' },
    { input: form.elements.email, error: 'form.error.email', fallback: 'Please fill in a valid email address.' },
    { input: form.elements.message, error: 'form.error.message', fallback: 'Please write a short message.' }
  ];

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showError(field) {
    var wrapper = field.input.closest('.field');
    wrapper.classList.add('field--invalid');
    field.input.setAttribute('aria-invalid', 'true');
    wrapper.querySelector('.field__error').textContent = t(field.error, field.fallback);
  }

  function clearError(field) {
    var wrapper = field.input.closest('.field');
    wrapper.classList.remove('field--invalid');
    field.input.removeAttribute('aria-invalid');
    wrapper.querySelector('.field__error').textContent = '';
  }

  function isValid(field) {
    var value = field.input.value.trim();
    return field.input.type === 'email' ? isValidEmail(value) : value.length > 0;
  }

  function validate() {
    var firstInvalid = null;

    fields.forEach(function (field) {
      if (isValid(field)) {
        clearError(field);
      } else {
        showError(field);
        if (!firstInvalid) firstInvalid = field.input;
      }
    });

    return firstInvalid;
  }

  function buildMailtoLink() {
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();

    var subject = t('form.subject', 'Portfolio message from') + ' ' + name;
    var body = message + '\n\n---\n' + name + '\n' + email;

    return (
      'mailto:' +
      EMAIL_ADDRESS +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body)
    );
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstInvalid = validate();

    if (firstInvalid) {
      note.hidden = true;
      firstInvalid.focus();
      return;
    }

    mailLink.href = buildMailtoLink();
    note.hidden = false;
  });

  /* Clear an error as soon as the visitor starts fixing that field. */
  fields.forEach(function (field) {
    field.input.addEventListener('input', function () {
      if (field.input.closest('.field').classList.contains('field--invalid')) {
        clearError(field);
      }
    });
  });

  /* If the language changes while an error is on screen, translate it too. */
  if (window.I18n) {
    window.I18n.onChange(function () {
      fields.forEach(function (field) {
        if (field.input.closest('.field').classList.contains('field--invalid')) {
          showError(field);
        }
      });

      if (note && !note.hidden) mailLink.href = buildMailtoLink();
    });
  }
})();
