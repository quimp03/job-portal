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

// none-apply
const buttonApply = document.querySelector("[none-apply]");
if (buttonApply) {
  buttonApply.addEventListener("click", (event) => {
    alert("Vui lòng tạo hồ sơ cá nhân");
  });
}
// end none apply
//button-delete-cv
const listButtonDeleteCv = document.querySelectorAll('[button-delete-cv]')
if(listButtonDeleteCv.length  > 0){
  listButtonDeleteCv.forEach(button => {
    const formDeletedCv = document.querySelector("[form-delete-cv]")
    button.addEventListener("click", () => {
      const id = button.getAttribute('data-id')
      const dataPath = formDeletedCv.getAttribute("data-path")
      const action = `${dataPath}/${id}?_method=DELETE`
      const isConfirm = confirm("Bạn có chắc muốn xóa không?")
      if(isConfirm){
        formDeletedCv.action = action
        formDeletedCv.submit()
      }
    })
  })
}
//end button-delete-cv
//button-change-status-cv
const buttonChangeStatusCv = document.querySelectorAll("[button-change-status-cv]")
if(buttonChangeStatusCv.length > 0){
  buttonChangeStatusCv.forEach(button => {
    const formChangeStatusCv = document.querySelector("[form-change-status-cv]")
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const status = button.getAttribute("data-status")
      if(status == "inactive"){
        return
      }
      const dataPath = formChangeStatusCv.getAttribute("data-path")
      const action = `${dataPath}/${status}/${id}?_method=PATCH`
      const isConfirm = confirm("Bạn có chắc muốn duyệt đơn tuyển dụng này?")
      if(isConfirm){
        formChangeStatusCv.action = action 
        formChangeStatusCv.submit()
      }
    })
  })
}
//button-change-status-cv

//Button Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0) {
  let url = new URL(window.location.href);
  listButtonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// End Button Pagination