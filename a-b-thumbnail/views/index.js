const { html } = require('./html');
const { default: layout } = require('./layouts/default.js');

exports.index = () => {
  return layout({
    content: html`
      <div>
        <form
          action="./upload"
          method="post"
          enctype="multipart/form-data"
        >
          <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
            />
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1"
              >Thumbnail Image A</label
            >
            <input
              type="file"
              class="form-control"
              name="thumbnailA"
            />
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1"
              >Thumbnail Image B</label
            >
            <input
              type="file"
              class="form-control"
              name="thumbnailB"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    `,
    style: html`
      <style>
        body {
          margin: 0;
        }

        .header {
          background-color: orange;
          height: 30px;
          padding: 1px;
        }
      </style>
    `,
    script: html`
      <script>
        const x = 1;
        console.log(x);
      </script>
    `
  });
};
