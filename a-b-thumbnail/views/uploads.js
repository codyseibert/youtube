const { html } = require('./html');
const { default: layout } = require('./layouts/default.js');

exports.uploads = ({ pathA, pathB }) => {
  return layout({
    content: html`
      <div class="row">
        <div class="col-md-6">
          <div
            class="card text-center"
            style="width: 18rem;"
          >
            <img alt="a" src="${pathA}" />

            <div class="card-body">
              <h5 class="card-title">Thumbnail A</h5>
              <a href="#" class="btn btn-primary">Vote</a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="card text-center"
            style="width: 18rem;"
          >
            <img alt="a" src="${pathB}" />

            <div class="card-body">
              <h5 class="card-title">Thumbnail B</h5>
              <a href="#" class="btn btn-primary">Vote</a>
            </div>
          </div>
        </div>
      </div>
    `,
    style: html`
      <style>
        img {
          max-width: 300px;
        }
      </style>
    `,
    script: html`
      <script></script>
    `
  });
};
