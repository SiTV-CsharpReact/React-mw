export const getActiveMenu = () => {
  //   const location = window.location.href;
  const url = localStorage.getItem("activeMenuHeader");
  const parents = document.querySelectorAll(".parent");

  for (let i = 0; i < parents.length; i++) {
    const children = parents[i].querySelectorAll(".ezfu-hover-itemMenu");
    for (let j = 0; j < children.length; j++) {
      const href = children[j].getAttribute("href");
      if (url === href) {
        parents[i].classList.add("activeMenuHeader");
        break;
      } else {
        parents[i].classList.remove("activeMenuHeader");
      }
    }
  }
};
