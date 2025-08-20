let arr = [];
for (let i = 1; i < 51; i++) {
  arr.push(i);
}

const target = Math.floor(Math.random() * 50) + 1;

document.getElementById(
  "target"
).innerText = `Target: ${target}, Start: 0, Mid: 25, End : 49`;

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

function binarySearchStart() {
  let start = 0;
  let end = arr.length - 1;
  const bars = document.querySelectorAll(".bar");

  function searchStep() {
    if (start > end) {
      document.getElementById(
        "target"
      ).innerText = `Target: ${target}, Not found`;
      return;
    }

    let mid = Math.floor((start + end) / 2);

    // update status each step
    document.getElementById(
      "target"
    ).innerHTML += `<hr style="width: 300px;">Target: ${target}, Start: ${start}, Mid: ${mid}, End: ${end}`;

    if (arr[mid] === target) {
      bars[mid].style.background = "red";
      document.getElementById(
        "target"
      ).innerHTML += `<br><br>Target: ${target}, ✅ Found at Index: ${mid}`;
      return;
    } else if (arr[mid] < target) {
      bars[mid].style.background = "yellow";
      bars[start].style.background = "black";
      bars[end].style.background = "black";
      start = mid + 1;
    } else {
      bars[mid].style.background = "yellow";
      bars[start].style.background = "black";
      bars[end].style.background = "black";
      end = mid - 1;
    }

    setTimeout(searchStep, 700);
  }

  searchStep();
}
