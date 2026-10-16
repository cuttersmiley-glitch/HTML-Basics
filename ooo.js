const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const saveButton = document.getElementById("save");

let selectedImage = null;

upload.addEventListener("change", (event) => {
  const files = event.target.files;
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.draggable = true;
      img.style.top = "50px";
      img.style.left = "50px";
      img.style.transform = "scale(1)";
      canvas.appendChild(img);

      // Add drag functionality
      img.addEventListener("mousedown", (e) => {
        selectedImage = img;
        let shiftX = e.clientX - img.getBoundingClientRect().left;
        let shiftY = e.clientY - img.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
          img.style.left = pageX - shiftX + "px";
          img.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(e) {
          moveAt(e.pageX, e.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        img.onmouseup = () => {
          document.removeEventListener("mousemove", onMouseMove);
          img.onmouseup = null;
        };
      });

      img.ondragstart = () => false; // Disable drag ghost image
    };
    reader.readAsDataURL(file);
  }
});

saveButton.addEventListener("click", () => {
  html2canvas(canvas).then((canvasResult) => {
    const link = document.createElement("a");
    link.download = "photo-mix.png";
    link.href = canvasResult.toDataURL("image/png");
    link.click();
  });
});

// External library for rendering canvas
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.body.appendChild(script);