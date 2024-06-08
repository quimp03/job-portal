// Form Search
const formSearch = document.querySelector("#search-box")
if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        }else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}
// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  let time = showAlert.getAttribute("data-time");
  time = parseInt(time);

  // Sau time giây sẽ đóng thông báo
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  // Khi click vào nút close-alert sẽ đóng luôn
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End show-alert
// upload anh bên employer
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    console.log(uploadImage)
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]")
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change",()  => {
        const file =uploadImageInput.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}