// TODO: This should be removed, when more advanced features are in.
/* Prevent "dragging" the web page on mobile/touch based platforms */
document.body.addEventListener("touchstart", (e) => {
  if (e.target == cd.canvas) {
    e.preventDefault();
    e.stopPropagation();
  }
}, false);
document.body.addEventListener("touchend", (e) => {
  if (e.target == cd.canvas) {
    e.preventDefault();
    e.stopPropagation();
  }
}, false);
document.body.addEventListener("touchmove", (e) => {
  if (e.target == cd.canvas) {
     e.preventDefault();
      e.stopPropagation();
  }
}, false);
