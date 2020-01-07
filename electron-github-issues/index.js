const shell = require("electron").shell;

const request = require("request");

const ISSUES = ["1925"];

const getPrs = async () => {
  return new Promise((resolve, reject) => {
    if (process.env.USE_MOCK) {
      // because we get a limited number of requests an hour on github api
      resolve([
        {
          title: "1925 - SOME PR TITLE HERE YAY"
        }
      ]);
    } else {
      request(
        {
          url: "https://api.github.com/repos/flexion/ef-cms/pulls?state=open",
          headers: {
            "User-Agent": "Chrome"
          }
        },
        (err, response) => {
          resolve(JSON.parse(response.body));
        }
      );
    }
  });
};

const createPrDiv = ({ title }) => {
  ISSUES.forEach(issue => {
    if (title.includes(issue)) {
      const issueDiv = document.createElement("div");
      issueDiv.className = "issue";
      issueDiv.innerText = title;
      issueDiv.onclick = () => {
        shell.openExternal(`https://github.com/flexion/ef-cms/pull/${issue}`);
      };
      document.getElementById("issues").appendChild(issueDiv);
    }
  });
};

refresh = async () => {
  document.getElementById("issues").innerHTML = "";
  const prs = await getPrs();
  prs.forEach(createPrDiv);
};

document.addEventListener("DOMContentLoaded", async () => {
  refresh();
  setInterval(refresh, 1000 * 60 * 10);
});
