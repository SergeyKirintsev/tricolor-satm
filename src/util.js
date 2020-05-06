export function createModal(title, content) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
        <h1>${title}</h1>
        <div class="modal-content">${content}</div>
    `;

  // eslint-disable-next-line no-undef
  mui.overlay("on", modal);
}
