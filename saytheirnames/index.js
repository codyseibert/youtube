function htmlToElement(html) {
    const template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  }

  const modal = document.querySelector(".modal");

  lives.forEach((life) => {
    const personHtml = `
                <div class="wrapper">
                  <div class="square">
                    <div class="content">
                      <div class="floyd" style="background-image: url('${life.image}')"></div>
                      <div class="gray"></div>
                      <div class="name">
                        ${life.name}
                      </div>
                    </div>
                  </div>
                </div>
        `;

    const personDom = htmlToElement(personHtml);
    console.log(personDom);
    personDom.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.querySelector("#modal-name").innerHTML = life.name;
      modal.querySelector("#modal-text").innerHTML = life.bio;
    });

    document.querySelector(".grid").appendChild(personDom);
  });

  document.querySelector(".close").addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.add("hidden");
  });