/**
 * A util function which converts a raw html string into a html dom node
 *
 * @param {string} html the html string to convert
 */
function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('.close');

closeButton.addEventListener('click', () => {
  modal.classList.add('hide');
});

lives.forEach((life) => {
  const personHTML = `
    <div class="square">
      <div 
        class="person" 
        style="background-image: url('${life.image}')"
      >
        <div class="name">${life.name}</div>
      </div>
      <div class="gray"></div>
    </div>
  `;
  const personDom = htmlToElement(personHTML);
  document.querySelector('.grid').appendChild(personDom);

  personDom.addEventListener('click', () => {
    modal.classList.remove('hide');
    modal.querySelector('.modal-name').innerHTML =
      life.name;
    modal.querySelector('.modal-bio').innerHTML = life.bio;
  });
});
