let arr = Array.from({ length: 70 }, (_, i) => i + 1);

arr = arr.sort(() => Math.random() - 0.5);

arr = arr.slice(0, 50);

const target = Math.floor(Math.random() * 50) + 1;

document.getElementById(
  "target"
).innerText = `Target: ${target}, Current Value: ${arr[0]}, Index : 0`;

const visualBox = document.getElementById("visualBox");

const maxVal = Math.max(...arr); // highest number for scaling

arr.forEach((num) => {
  const bar = document.createElement("div");
  bar.classList.add("bar");
  bar.classList.add(num);

  bar.style.height = (num / maxVal) * 100 + "%";

  if (num === target) {
    bar.style.background = "orange";
  }

  visualBox.appendChild(bar);
});

function linearSearchStart() {
  const bars = document.querySelectorAll(".bar");
  let i = 0;

  function searchStep() {
    if (i >= arr.length) {
      document.getElementById(
        "target"
      ).innerText = `Target: ${target}, Not found`;
      return;
    }

    // Update info display
    document.getElementById(
      "target"
    ).innerText = `Target: ${target}, Current Value: ${arr[i]}, Index: ${i}`;

    // Highlight current bar
    bars[i].style.background = "yellow";

    if (arr[i] === target) {
      bars[i].style.background = "green";
      document.getElementById(
        "target"
      ).innerText = `Target: ${target}, Current Value: ${arr[i]}, ✅ Found at Index: ${i}`;
      return;
    }

    // Reset previous bar
    if (i > 0) {
      bars[i - 1].style.background = "blue";
    }

    i++;
    setTimeout(searchStep, 300); // delay
  }

  searchStep();
}
