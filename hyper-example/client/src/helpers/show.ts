export const show = (isVisible: boolean) => (component) =>
  isVisible ? component : "";
