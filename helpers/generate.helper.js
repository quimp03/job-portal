module.exports.generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    //thuc hien  0 den length - 1 vong lap(so nhap vao)
    //cong dan ki tu vao chuoi result
    //math.floor lam tron xuong(4.7->4)
    //math.random(chay tu kc 0->1)
    //nhu vay moi lan lap ta duoc mot tu trong str characters
    //vid math.random = 0.6 -> character tai vi tri 0.6*62=37.2 ta lay vi tri 37
    //tiep tuc cho den vong lap = length-1
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };