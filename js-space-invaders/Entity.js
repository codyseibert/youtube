export class Entity {
  constructor({ tag = 'div' } = {}) {
    this.el = document.createElement(tag);
    document.body.appendChild(this.el);
    this.shouldRemove = false;
    this.position = new Proxy(
      {
        x: 0,
        y: 0,
      },
      {
        set: (target, prop, value) => {
          target[prop] = value;
          this.refreshEl();
          return true;
        },
      }
    );
  }

  markForRemoval() {
    this.shouldRemove = true;
  }

  remove() {
    this.el.remove();
    this.el = null;
  }

  refreshEl() {
    this.el.style.left = `${this.position.x}px`;
    this.el.style.top = `${this.position.y}px`;
  }
}
