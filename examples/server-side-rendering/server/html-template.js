import fs from 'fs';
import path from 'path';
import { html } from 'common-tags';

export const createScriptTag = ({ src }) => `<script defer="defer" src="${src}"></script>`;

export const getHeader = ({ nonce }) => {
  // prettier-ignore
  return html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="user-scalable=no,initial-scale=1.0001,maximum-scale=1.0001,viewport-fit=cover">
        </head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <div id="root">`;
};

export const getFooter = ({ extractor, nonce }) => {
  const loadableScripts = extractor.getScriptTags();
  const loadedNonce = `<script nonce="${nonce}">`;
  const loadableScriptsWithNonce = loadableScripts.replace('<script>', loadedNonce);
  return html`</div>
      ${loadableScriptsWithNonce}
    </body>
    </html>
  `;
};
