let arr = Array.from({ length: 70 }, (_, i) => i + 1);

arr = arr.sort(() => Math.random() - 0.5);

arr = arr.slice(0, 50);

const visualBox = document.getElementById("visualBox");

const maxVal = Math.max(...arr); // highest number for scaling

function createBars() {
  visualBox.innerHTML = "";

  arr.forEach((num) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.classList.add(num);

    bar.style.height = (num / maxVal) * 100 + "%";

    visualBox.appendChild(bar);
  });
}

createBars();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function insertionSortStart() {
  const bars = document.querySelectorAll(".bar");

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    bars[i].style.background = "red"; // highlight current key

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];

      // update DOM bar height
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].style.background = "yellow";

      j--;

      await sleep(document.getElementById("speed").value);
    }

    arr[j + 1] = key;

    // place key visually
    bars[j + 1].style.height = (key / Math.max(...arr)) * 100 + "%";
    bars[j + 1].style.background = "red";

    document.getElementById(
      "target"
    ).innerText = `Key: ${key}, Inserted At Index: ${j + 1}`;

    // reset colors
    for (let k = 0; k <= i; k++) {
      bars[k].style.background = "green";
    }
  }
}

async function selectionSortStart() {
  const bars = document.querySelectorAll(".bar");
  const maxVal = Math.max(...arr);

  for (let i = 0; i < arr.length; i++) {
    let min = i;

    bars[i].style.background = "red";
    await sleep(speed);

    for (let j = i + 1; j < arr.length; j++) {
      bars[j].style.background = "yellow";
      await sleep(document.getElementById("speed").value);
      document.getElementById(
        "target"
      ).innerText = `Comparing: ${arr[j]} with ${arr[min]}`;

      if (arr[j] < arr[min]) {
        if (min !== i) bars[min].style.background = "cyan";
        min = j;
        bars[min].style.background = "orange";
      } else {
        bars[j].style.background = "cyan";
      }
    }

    if (min !== i) {
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;

      bars[i].style.height = (arr[i] / maxVal) * 100 + "%";
      bars[min].style.height = (arr[min] / maxVal) * 100 + "%";
    }

    bars[i].style.background = "green";
  }
}
