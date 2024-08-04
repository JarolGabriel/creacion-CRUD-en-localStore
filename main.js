function validateForm() {
  let email = document.getElementById("inputEmail").value;
  let name = document.getElementById("inputName").value;
  let phone = document.getElementById("inputPhone").value;

  if (email === "") {
    alert("The email field is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Email isn't valid");
    return false;
  }

  if (name === "") {
    alert("The name field is required");
    return false;
  }

  if (phone === "") {
    alert("The Phone numbers field is required");
    return false;
  }

  return true;
}

//read

function readData() {
  let listPeople;

  if (localStorage.getItem("listPeople") === null) {
    listPeople = [];
  } else {
    listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  var html = "";

  listPeople.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.phone + "</td>";
    html += "<td>";
    html +=
      '<button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger"> remove Data</button>';
    html +=
      '<button onclick="editData(' +
      index +
      ')" class="btn btn-warning"> Edit Data</button>';
    html += "</td>";
    html += "</tr>";
  });

  document.querySelector("#tableData tbody").innerHTML = html;
}

window.onload = readData;

function AddData() {
  if (validateForm() === true) {
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    let phone = document.getElementById("inputPhone").value;

    var listPeople;

    if (localStorage.getItem("listPeople") === null) {
      listPeople = [];
    } else {
      listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    listPeople.push({
      email: email,
      name: name,
      phone: phone,
    });

    localStorage.setItem("listPeople", JSON.stringify(listPeople));

    readData();

    document.getElementById("inputEmail").value = "";
    document.getElementById("inputName").value = "";
    document.getElementById("inputPhone").value = "";
  }
}

function deleteData(index) {
  let listPeople;

  if (localStorage.getItem("listPeople") === null) {
    listPeople = [];
  } else {
    listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  listPeople.splice(index, 1);
  localStorage.setItem("listPeople", JSON.stringify(listPeople));

  readData();
}

function editData(index) {
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("btnUpdate").style.display = "block";

  let listPeople;

  if (localStorage.getItem("listPeople") === null) {
    listPeople = [];
  } else {
    listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  document.getElementById("inputEmail").value = listPeople[index].email;
  document.getElementById("inputName").value = listPeople[index].name;
  document.getElementById("inputPhone").value = listPeople[index].phone;

  document.querySelector("#btnUpdate").onclick = function () {
    if (validateForm() === true) {
      listPeople[index].email = document.getElementById("inputEmail").value;
      listPeople[index].name = document.getElementById("inputName").value;
      listPeople[index].phone = document.getElementById("inputPhone").value;

      localStorage.setItem("listPeople", JSON.stringify(listPeople));

      readData();

      document.getElementById("inputEmail").value = "";
      document.getElementById("inputName").value = "";
      document.getElementById("inputPhone").value = "";

      document.getElementById("btnAdd").style.display = "block";
      document.getElementById("btnUpdate").style.display = "none";
    }
  };
}
