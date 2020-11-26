let count = 0;
const warpper = document.querySelector("header");
warpper.addEventListener("mouseleave", function () {
  count = 0;
});

warpper.addEventListener("mousemove", function ({ offsetX, offsetY }) {
  count++;

  if (count % 5 !== 1) return;
  const docFrag = document.createDocumentFragment(); // 메모리에만 존재하며 마크업에 표현되지 않음

  let bubble = document.createElement("div");
  bubble.classList.add("bubble");

  bubble.style.left = offsetX + "px";
  bubble.style.top = offsetY + "px";

  docFrag.appendChild(bubble); // 메모리상에서 조작후
  warpper.appendChild(docFrag);

  (function (bubble) {
    setTimeout(function () {
      bubble.remove();
    }, 1800);
  })(bubble);
});

// for (const timeoutID of timeoutIDs) {
// clearTimeout(timeoutID);
//   timeoutIDs.shift();
// }
