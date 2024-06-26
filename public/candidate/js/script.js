//Delete Item
const listButtonDelete = document.querySelectorAll("[button-delete-myPost]")
if(listButtonDelete.length > 0){
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const formDeleteItem = document.querySelector("[form-delete-myPost]")
      const path = formDeleteItem.getAttribute("data-path")
      const id = button.getAttribute("data-id")
      const isConfirm = confirm("Bạn có chắc muốn xóa không?")
      const action = `${path}/${id}?_method=DELETE`
      if(isConfirm){
        formDeleteItem.action = action
        formDeleteItem.submit()
      }
    })
  })
}
//End delete Item

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
// upload anh bên candidate
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
// end upload imag ben candidate