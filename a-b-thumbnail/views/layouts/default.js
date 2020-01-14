const { html } = require('../html');
const { header } = require('../components/header');

exports.default = ({ content, script, style }) => {
  return html`
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css"
        />
        ${style}
      </head>

      <body>
        ${header()}

        <div class="container">
          ${content}
        </div>

        ${script}
      </body>
    </html>
  `;
};
