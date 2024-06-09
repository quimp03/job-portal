//Delete Item
const listButtonDelete = document.querySelectorAll("[button-delete-myPost]")
if(listButtonDelete.length > 0){
    console.log(listButtonDelete)
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