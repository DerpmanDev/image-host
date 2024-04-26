function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const formData = new FormData(document.getElementById("uploadForm"));
    const outputMsg = document.getElementById("outputMessage");
    
   outputMsg.style.display = 'block';
   outputMsg.innerHTML = 'uploading file...';

    fetch("/upload", {
     method: "POST",
     body: formData,
   })
   .then((response) => {
       if (response.ok) {
       return response.text();
   } else {
       throw new Error("failed to upload image");
       outputMsg.innerHTML = "failed to upload msg!";
   }
   })
   .then((imagePath) => {
       outputMsg.href = imagePath;
       outputMsg.innerHTML = 'done, click here to view image';
       outputMsg.style.display = "block";
   })
   .catch((error) => {
       outputMsg.innerHTML = "could not upload image, please try again!";
       console.error("Error:", error);
   });
}

function displayFileName(input) {
   const fileNameDisplay = document.getElementById('fileName');
   if (input.files.length > 0) {
       fileNameDisplay.textContent = input.files[0].name;
       fileNameDisplay.style.display = 'inline';
   } else {
       fileNameDisplay.textContent = '';
       fileNameDisplay.style.display = 'none';
   }
}