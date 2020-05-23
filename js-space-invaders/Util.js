class Util {
  static isOverlapping(a, b) {
    const rect1 = a.el.getBoundingClientRect();
    const rect2 = b.el.getBoundingClientRect();
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }
}
