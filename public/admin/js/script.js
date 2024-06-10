//button-status
const filterStatus = document.querySelectorAll("[button-status]")
if(filterStatus.length > 0){
    const url = new URL(window.location.href)
   filterStatus.forEach((button) => {
    button.addEventListener("click", () => {
        const status = button.getAttribute("button-status")
        console.log(status)
        if(status){
            url.searchParams.set("status", status)
        }else{
            url.searchParams.delete("status")
        }
        window.location.href = url.href
    })
   })
}
//end-button-status
// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;
    if(keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search

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
//button-change-status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(listButtonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status]");
  listButtonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const status = button.getAttribute("data-status");
      if(status == "inactive"){
        return
      }
      const path = formChangeStatus.getAttribute("data-path");
      const action = `${path}/${status}/${id}?_method=PATCH`;
      const isConfirm = confirm("Bạn có chắc muốn duyệt bài viết này?")
      if(isConfirm){
        formChangeStatus.action = action;
        formChangeStatus.submit();
      }
    });
  });
}
//end button-change-status

// checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const listInputId = checkboxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", () => {
    if(inputCheckAll.checked) {
      listInputId.forEach(input => {
        input.checked = true;
      });
    } else {
      listInputId.forEach(input => {
        input.checked = false;
      });
    }
  });
  listInputId.forEach(inputId => {
    inputId.addEventListener("click", () => {
      const countInputIdChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      const lengthInputId = listInputId.length;

      if(countInputIdChecked == lengthInputId) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox-multi

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();
    const type = formChangeMulti.querySelector("select[name='type']").value;
    const listInputIdChecked = document.querySelectorAll("input[name='id']:checked");
    if(listInputIdChecked.length > 0) {
      const ids = [];
      listInputIdChecked.forEach(input => {
        const id = input.value;
        ids.push(id);
      });
      const stringIds = ids.join(", ");
      const input = formChangeMulti.querySelector("input[name='ids']");
      input.value = stringIds;
      if(type == "delete-all") {
        const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");
        if(!isConfirm) {
          return;
        }
      }
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi!");
    }
  });
}
// End form-change-multi

//Delete Item
const listButtonDelete = document.querySelectorAll("[button-delete]")
if(listButtonDelete.length > 0){
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const formDeleteItem = document.querySelector("[form-delete]")
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
//upload-img
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]")
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change",()  => {
        const file =uploadImageInput.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
//end-upload-img

// button-changeStatus-jobs-category
const listBtnChangeStatusJobsCategory = document.querySelectorAll("[button-change-status-category]")
if(listBtnChangeStatusJobsCategory.length > 0){
  const formChangeStatusJobsCategory = document.querySelector("[form-change-status-jobscategory]")
  listBtnChangeStatusJobsCategory.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")
      const path = formChangeStatusJobsCategory.getAttribute("data-path")
      const action = `${path}/${status}/${id}?_method=patch`
      formChangeStatusJobsCategory.action = action
      formChangeStatusJobsCategory.submit();
    })
  })
}
//end button-changeStatus-jobs-category
//delete-category
const listBtnDeleteCategory = document.querySelectorAll("[button-delete-category]")
if(listBtnDeleteCategory.length > 0){
  const formDeleteCategory = document.querySelector("[form-delete-category]")
  listBtnDeleteCategory.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const path = formDeleteCategory.getAttribute("data-path")
      const isConfirm = confirm("Bạn có chắc muốn xóa không?")
      const action = `${path}/${id}?_method=DELETE`
      if(isConfirm){
        formDeleteCategory.action = action
      formDeleteCategory.submit()
      }
    })
  })
}
//end delete-category

//delete role
const listBtnDeleteRole = document.querySelectorAll("[button-delete-role]")
if(listBtnDeleteRole.length > 0){
  const frmDeleteRole = document.querySelector("[form-delete-role]")
  listBtnDeleteRole.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const path = frmDeleteRole.getAttribute("data-path")
      const action = `${path}/${id}?_method=DELETE`
      const isConfirm = confirm("Bạn có chắc muốn xóa không?")
      if(isConfirm){
        frmDeleteRole.action = action
        frmDeleteRole.submit()
      }
    })
  })
}
//Table permisstions
const buttonSubmitPermission = document.querySelector("[button-submit-permissions]")
if(buttonSubmitPermission){
  buttonSubmitPermission.addEventListener("click",() => {
  const roles = []
  const tablePermissions = document.querySelector("[table-permissions]")
  const rows = tablePermissions.querySelectorAll("tbody tr[data-name]")
  rows.forEach((row, index) => {//lap qua tung hang
    const dataName = row.getAttribute("data-name")
    const inputs = row.querySelectorAll("input")
    if(dataName == "id"){
      //nếu dataName == id thì lập qua từng pt của 2 cái input đó
      // và roles sẽ thêm vào id và một pt mảng là permissions vào theo từng ô input lập qua
      inputs.forEach(input => {
        const id = input.value
        roles.push({
          id: id,
          permissions : []
        })
      })
    }else{
      inputs.forEach((input, index) => {
        const inputChecked = input.checked;
        if(inputChecked){
          //đầu tiên duyệt qua index = 0 tai hàng 1 neu input.checked == true thi them vao roles[0] với
          //permission->dataName
          //tiep theo index = 1  tai hàng 1 nếu input.checked == true hi them vao roles[1] với permissions->dataName
          roles[index].permissions.push(dataName)
        }
      })
    }
  })
    if(roles.length > 0) {
      const formChangePermissions = document.querySelector("[form-change-permissions]");
      const inputRoles = formChangePermissions.querySelector("input[name='roles']");
      inputRoles.value = JSON.stringify(roles);//chuyển thành chuỗi JSON
      formChangePermissions.submit();
    }
  })
}
// Data default Table Permissions
const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");
  records.forEach((record, index) => {
    const permissions = record.permissions
    permissions.forEach(permission => {
      const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`);
      const input = row.querySelectorAll(`input`)[index];
      input.checked = true;
    });
  });
}
// End Data default Table Permissions
// button-changeStatus-account
const listBtnChangeStatusAccount = document.querySelectorAll("[button-change-status-account]")
if(listBtnChangeStatusAccount.length > 0){
  const formChangeStatusAccount = document.querySelector("[form-change-status-account]")
  listBtnChangeStatusAccount.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")
      const path = formChangeStatusAccount.getAttribute("data-path")
      const action = `${path}/${status}/${id}?_method=patch`
      formChangeStatusAccount.action = action
      formChangeStatusAccount.submit();
    })
  })
}
//end button-changeStatus-jobs-category
//delete account
const listBtnDeleteAccount = document.querySelectorAll("[button-delete-account]")
if(listBtnDeleteAccount.length > 0){
  const formDeleteAccount = document.querySelector("[form-delete-account]")
  listBtnDeleteAccount.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const path = formDeleteAccount.getAttribute("data-path")
      const isConfirm = confirm("Bạn có chắc muốn xóa?")
      const action = `${path}/${id}?_method=delete`
      if(isConfirm){
        formDeleteAccount.action = action
        formDeleteAccount.submit()
      }
    })
  })
}
//end delete account
//

// button-changeStatus-positions-category
const listBtnChangeStatusPositionCategory = document.querySelectorAll("[button-change-status-position-category]")
if(listBtnChangeStatusPositionCategory.length > 0){
  const formChangeStatusPositionsCategory = document.querySelector("[form-change-status-positionscategory]")
  listBtnChangeStatusPositionCategory.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")
      const path = formChangeStatusPositionsCategory.getAttribute("data-path")
      const action = `${path}/${status}/${id}?_method=patch`
      formChangeStatusPositionsCategory.action = action
      formChangeStatusPositionsCategory.submit();
    })
  })
}
//end button-changeStatus-jobs-category
//delete-category
const listBtnDeletePositionCategory = document.querySelectorAll("[button-delete-positon-category]")
if(listBtnDeletePositionCategory.length > 0){
  const formDeletePosition = document.querySelector("[form-delete-position-category ]")
  listBtnDeletePositionCategory.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const path = formDeletePosition.getAttribute("data-path")
      const isConfirm = confirm("Bạn có chắc muốn xóa không?")
      const action = `${path}/${id}?_method=DELETE`
      if(isConfirm){
        formDeletePosition.action = action
        formDeletePosition.submit()
      }
    })
  })
}
//end delete-category
//button-change-status-outstanding
const listButtonChangeStatusOutstanding = document.querySelectorAll("[button-change-status-outstanding]");
if(listButtonChangeStatusOutstanding.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status-outstanding]");
  listButtonChangeStatusOutstanding.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const status = button.getAttribute("data-status");
      const path = formChangeStatus.getAttribute("data-path");
      const action = `${path}/${status}/${id}?_method=PATCH`;
        formChangeStatus.action = action;
        formChangeStatus.submit()
    });
  });
}
//end button-change-status-outstanding

//button-change-status-blog
const listButtonChangeStatusBlog = document.querySelectorAll("[button-change-status-blog]");
if(listButtonChangeStatusBlog.length > 0) {
  const formChangeStatusBlog = document.querySelector("[form-change-status-blog]");
  listButtonChangeStatusBlog.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const status = button.getAttribute("data-status");
      const path = formChangeStatusBlog.getAttribute("data-path");
      const action = `${path}/${status}/${id}?_method=PATCH`;
      const isConfirm = confirm("Bạn có chắc muốn duyệt bài viết này?")
      if(isConfirm){
        formChangeStatusBlog.action = action;
        formChangeStatusBlog.submit();
      }
    });
  });
}
//end button-change-status-blog
//Delete Item-blog
const listButtonDeleteBlog = document.querySelectorAll("[button-delete-blog]")
if(listButtonDeleteBlog.length > 0){
  console.log(listButtonDeleteBlog)
  listButtonDeleteBlog.forEach(button => {
    button.addEventListener("click", () => {
      const formDeleteItemBlog = document.querySelector("[form-delete-blog]")
      const path = formDeleteItemBlog.getAttribute("data-path")
      const id = button.getAttribute("data-id")
      const isConfirm = confirm("Bạn có chắc muốn xóa không?")
      const action = `${path}/${id}?_method=DELETE`
      if(isConfirm){
        formDeleteItemBlog.action = action
        formDeleteItemBlog.submit()
      }
    })
  })
}
//End delete blog