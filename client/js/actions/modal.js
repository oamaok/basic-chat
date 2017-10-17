export function openModal(component) {
  return {
    type: 'OPEN_MODAL',
    data: component,
  };
}

export function closeModal() {
  return {
    type: 'CLOSE_MODAL',
  };
}
