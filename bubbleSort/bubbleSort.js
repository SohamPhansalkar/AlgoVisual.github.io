let arr = Array.from({ length: 70 }, (_, i) => i + 1);

arr = arr.sort(() => Math.random() - 0.5);

arr = arr.slice(0, 50);

// document.getElementById(
//   "target"
// ).innerText = `Target: ${target}, Current Value: ${arr[0]}, Index : 0`;

const visualBox = document.getElementById("visualBox");

const maxVal = Math.max(...arr); // highest number for scaling

function createBars(bar1 = false, bar2 = false) {
  visualBox.innerHTML = "";

  arr.forEach((num) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.classList.add(num);

    bar.style.height = (num / maxVal) * 100 + "%";

    if ((bar1 && bar2 && num === bar1) || num === bar2) {
      bar.style.background = "orange";
    }

    visualBox.appendChild(bar);
  });
}

createBars();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSortStart() {
  const bars = document.querySelectorAll(".bar");

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      bars[j].style.background = "yellow";
      bars[j + 1].style.background = "yellow";

      document.getElementById("target").innerText = `bar a: ${arr[j]}, bar b: ${
        arr[j + 1]
      }`;

      await sleep(document.getElementById("speed").value);

      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        let tempHeight = bars[j].style.height;
        bars[j].style.height = bars[j + 1].style.height;
        bars[j + 1].style.height = tempHeight;
      }

      bars[j].style.background = "linear-gradient(135deg, #00c6ff, #0072ff)";
      bars[j + 1].style.background =
        "linear-gradient(135deg, #00c6ff, #0072ff)";
    }
    bars[arr.length - i - 1].style.background = "green";
  }

  bars.forEach((bar) => (bar.style.background = "green"));
}
