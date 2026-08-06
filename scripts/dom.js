// @ts-check

/**
 * Returns a required element and fails early with a useful integration error.
 * @template {Element} T
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {T}
 */
export const queryRequired = (root, selector) => {
  const element = root.querySelector(selector);
  if (!element) throw new Error(`Required element not found: ${selector}`);
  return /** @type {T} */ (element);
};

/**
 * @param {Document} documentRef
 * @param {keyof HTMLElementTagNameMap} tag
 * @param {string} [className]
 * @param {string} [text]
 * @returns {HTMLElement}
 */
export const createElement = (documentRef, tag, className = '', text = '') => {
  const element = documentRef.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

/**
 * @param {Document} documentRef
 * @param {HTMLElement} container
 * @param {string} label
 * @param {string} value
 */
export const appendTextRow = (documentRef, container, label, value) => {
  const row = createElement(documentRef, 'p', 'detail-row');
  row.append(createElement(documentRef, 'strong', '', `${label}: `), documentRef.createTextNode(value));
  container.append(row);
};
