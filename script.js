let form = document.querySelector(".register-form");
let table = document.querySelector(".table-form");
let tbody = document.createElement("tbody");
let cardGroup = document.querySelector(".card-group");
let legend = document.querySelector("legend");
let buttons = document.querySelector(".submit");
let signUP = document.querySelector(".sign-up");
let cancel = document.createElement("input");
let restore = document.createElement("input");

let firstName = document.getElementById("fname");
let lastName = document.getElementById("lname");
let phoneNumber = document.getElementById("phone");
let emailAdr = document.getElementById("email");

let modal = document.querySelector(".modal");
let modFirstName = document.getElementById("modal-fname");
let modLastName = document.getElementById("modal-lname");
let modPhoneNumber = document.getElementById("modal-phone");
let modEmailAdr = document.getElementById("modal-email");


let modButtons = document.createElement("div");
modButtons.setAttribute("class", "submit d-flex justify-content-end");

let modCancel = document.createElement("input");
let modRestore = document.createElement("input");



modCancel.setAttribute("type", "reset");
modCancel.setAttribute("class", "btn btn-danger");
modCancel.setAttribute("value", "İmtina et");
modCancel.style.display = "none";
modButtons.appendChild(modCancel);


modRestore.setAttribute("type", "button");
modRestore.setAttribute("class", "btn btn-warning ms-2");
modRestore.setAttribute("value", "Yenilə");
modRestore.style.display = "none";
modButtons.appendChild(modRestore);


modal.appendChild(modButtons);


const ID = new Date().getTime();


cancel.setAttribute("type", "reset");
cancel.setAttribute("class", "btn btn-danger");
cancel.setAttribute("value", "İmtina et");
cancel.style.display = "none";
buttons.appendChild(cancel);



restore.setAttribute("type", "button");
restore.setAttribute("class", "btn btn-warning ms-2");
restore.setAttribute("value", "Yenilə");
restore.style.display = "none";
buttons.appendChild(restore);

table.appendChild(tbody);



form.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = firstName.value;
    let surname = lastName.value;
    let telephone = phoneNumber.value;
    let email = emailAdr.value;

    if (!name || !surname || !telephone || !email) {
        alert("Bütün sahələr doldurulmalıdır");
        return;
    }

    let data = {
        id: ID,
        name: {
            firstname: name.charAt(0).toUpperCase() + name.slice(1),
            lastname: surname.charAt(0).toUpperCase() + surname.slice(1),
        },
        phone: telephone,
        email: email,
    };


    addRow(data);
    addCard(data);
});

function add() {
    fetch(`https://fakestoreapi.com/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Şəbəkə hal-hazırda sizə cavab vermir...");
            }
            form.reset();
            return res.json();
        })
        .then(function (newUser) {
            addRow(newUser);
            addCard(newUser);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function addRow(user) {
    let tr = document.createElement("tr");
    tr.setAttribute("data-id", user.id);
    console.log(user.id);

    tr.innerHTML = `
        <td scope="col">${user.name.firstname}</td>
        <td scope="col">${user.name.lastname}</td>
        <td scope="col">${user.phone}</td>
        <td scope="col">${user.email}</td>
        <td scope="col">
            <button class="btn btn-outline-danger py-1 px-2" onclick="remove('${user.id}')">Sil</button>
            <button class="btn btn-outline-warning p-1" onclick="get('${user.id}')">Düzəliş et</button>
        </td>
    `;

    tbody.appendChild(tr);
    form.reset();

    get(user.id);
}

function addCard(user) {
    let card = document.createElement("div");
    card.setAttribute("class", "card border mb-1");
    card.setAttribute("data-id", `${user.id}`);

    card.innerHTML = `
                <div class="card-desc">Şəxsi məlumat</div>
                 <div class="card-body">
                    <div class="fname"> 
                        <span class="fw-bold">Ad :</span>
                        <span>${user.name.firstname}</span>
                    </div>
                    <div class="lname"> 
                        <span class="fw-bold">Soyad :</span>
                        <span>${user.name.lastname}</span>
                    </div>
                    <div class="tel"> 
                        <span class="fw-bold">Telefon :</span>
                        <span>${user.phone}</span>
                    </div>
                    <div class="email"> 
                        <span class="fw-bold">Elektron poçt</span>
                        <span>${user.email}</span>
                    </div>
                    <div class="buttons"> <span class="fw-bold">Əməliyyatlar</span>
                        <button class="btn btn-outline-danger py-1 px-3" onclick="remove('${user.id}')">Sil</button>
                        <button class="btn btn-outline-warning p-1 px-3 ms-1" onclick="get('${user.id}')">Düzəliş et</button>
                    </div>
                </div>
    `;

    cardGroup.appendChild(card);
    form.reset();
}

function getAll() {
    fetch("https://fakestoreapi.com/users?limit=2")
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Şəbəkə hal-hazırda sizə cavab vermir...");
            }

            return res.json();
        })
        .then(function (users) {

            users.map(function (user) {
                let tr = document.createElement("tr");
                tr.setAttribute("data-id", `${user.id}`);

                let firstName = document.createElement("td");
                firstName.innerHTML =
                    user.name.firstname.charAt(0).toUpperCase() +
                    user.name.firstname.slice(1);
                firstName.setAttribute("scope", "col");
                tr.appendChild(firstName);

                let lastName = document.createElement("td");
                lastName.innerHTML =
                    user.name.lastname.charAt(0).toUpperCase() +
                    user.name.lastname.slice(1);
                lastName.setAttribute("scope", "col");
                tr.appendChild(lastName);

                let phone = document.createElement("td");
                phone.innerHTML = user.phone;
                phone.setAttribute("scope", "col");
                tr.appendChild(phone);

                let email = document.createElement("td");
                email.innerHTML = user.email;
                email.setAttribute("scope", "col");
                tr.appendChild(email);

                let td = document.createElement("td");
                td.setAttribute("scope", "col");
                tr.appendChild(td);

                let del = document.createElement("button");
                del.setAttribute("class", "btn btn-outline-danger py-1 px-2");
                del.setAttribute("onclick", `remove('${user.id}')`);
                del.innerHTML = "Sil";
                td.appendChild(del);

                let fix = document.createElement("button");
                fix.setAttribute("class", "btn btn-outline-warning p-1 ms-1");
                fix.setAttribute("onclick", `get('${user.id}')`);
                fix.innerHTML = "Düzəliş et";
                td.appendChild(fix);

                tbody.appendChild(tr);

                let card = document.createElement("div");
                card.setAttribute("class", "card border my-3");
                card.setAttribute("data-id", `${user.id}`);

                let cardDesc = document.createElement("div");
                cardDesc.setAttribute("class", "card-desc");
                cardDesc.innerHTML = "Şəxsi məlumat";
                card.appendChild(cardDesc);

                let cardBody = document.createElement("div");
                cardBody.setAttribute("class", "card-body");
                card.appendChild(cardBody);

                let divFirstName = document.createElement("div");
                divFirstName.setAttribute("class", "fname");
                cardBody.appendChild(divFirstName);

                let spanFirstNameDes = document.createElement("span");
                spanFirstNameDes.setAttribute("class", "fw-bold");
                spanFirstNameDes.innerHTML = "Ad : ";
                divFirstName.appendChild(spanFirstNameDes);

                let spanFN = document.createElement("span");
                spanFN.innerHTML =
                    user.name.firstname.charAt(0).toUpperCase() +
                    user.name.firstname.slice(1);
                divFirstName.appendChild(spanFN);

                let divLastName = document.createElement("div");
                divLastName.setAttribute("class", "lname");
                cardBody.appendChild(divLastName);

                let spanLastNameDes = document.createElement("span");
                spanLastNameDes.setAttribute("class", "fw-bold");
                spanLastNameDes.innerHTML = "Soyad : ";
                divLastName.appendChild(spanLastNameDes);

                let spanLN = document.createElement("span");
                spanLN.innerHTML =
                    user.name.lastname.charAt(0).toUpperCase() +
                    user.name.lastname.slice(1);
                divLastName.appendChild(spanLN);

                let divPhone = document.createElement("div");
                divPhone.setAttribute("class", "tel");
                cardBody.appendChild(divPhone);

                let spanPhoneDes = document.createElement("span");
                spanPhoneDes.setAttribute("class", "fw-bold");
                spanPhoneDes.innerHTML = "Telefon : ";
                divPhone.appendChild(spanPhoneDes);

                let spanPn = document.createElement("span");
                spanPn.innerHTML = user.phone;
                divPhone.appendChild(spanPn);

                let divEmail = document.createElement("div");
                divEmail.setAttribute("class", "email");
                cardBody.appendChild(divEmail);

                let spanEmailDes = document.createElement("span");
                spanEmailDes.setAttribute("class", "fw-bold");
                spanEmailDes.innerHTML = "Elektron poçt : ";
                divEmail.appendChild(spanEmailDes);

                let spanEm = document.createElement("span");
                spanEm.innerHTML = user.email;
                divEmail.appendChild(spanEm);

                let divButtons = document.createElement("div");
                divButtons.setAttribute("class", "buttons");
                cardBody.appendChild(divButtons);

                let spanButtons = document.createElement("span");
                spanButtons.setAttribute("class", "fw-bold");
                spanButtons.innerHTML = "Əməliyyatlar  ";
                divButtons.appendChild(spanButtons);

                let cardDel = document.createElement("button");
                cardDel.setAttribute("class", "btn btn-outline-danger py-1 px-2");
                cardDel.setAttribute("onclick", `remove('${user.id}')`);
                cardDel.innerHTML = "Sil";
                divButtons.appendChild(cardDel);

                let cardFix = document.createElement("button");
                cardFix.setAttribute("class", "btn btn-outline-warning p-1 ms-1");
                cardFix.setAttribute("onclick", `get('${user.id}')`);
                cardFix.innerHTML = "Düzəliş et";
                divButtons.appendChild(cardFix);


                cardFix.addEventListener("click", function (e) {
                    e.preventDefault();


                    modal.style.display = "block";
                    modCancel.style.display = "block";
                    modRestore.style.display = "block";
                    modFirstName.value =
                        user.name.firstname.charAt(0).toUpperCase() +
                        user.name.firstname.slice(1);
                    modLastName.value =
                        user.name.lastname.charAt(0).toUpperCase() +
                        user.name.lastname.slice(1);
                    modPhoneNumber.value = user.phone;
                    modEmailAdr.value = user.email;
                    signUP.style.display = "none";
                    form.reset();
                })

                cardGroup.appendChild(card);

            });

        })
        .catch(function (err) {
            console.log(err);
        });
}

function remove(id) {
    fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE",
    })
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Şəbəkə hal-hazırda sizə cavab vermir...");
            }

            let removeBox = confirm("Silmək istədiyinizdən əminsiniz?");

            if (removeBox == true) {
                let row = document.querySelector(`tr[data-id="${id}"]`);
                let card = document.querySelector(`div[data-id="${id}"]`);

                if (row && card) {
                    row.remove();
                    card.remove();
                } else {
                    return alert("İstəyiniz ləğv olundu.");
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function get(id) {
    fetch(`https://fakestoreapi.com/users/${id}`)
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Şəbəkə hal-hazırda sizə cavab vermir...");
            }

            return res.json();
        })
        .then(function (user) {
            firstName.value =
                user.name.firstname.charAt(0).toUpperCase() +
                user.name.firstname.slice(1);
            lastName.value =
                user.name.lastname.charAt(0).toUpperCase() +
                user.name.lastname.slice(1);
            phoneNumber.value = user.phone;
            emailAdr.value = user.email;



            legend.innerHTML = "Qeydiyyatı yenilə";
            legend.style.width = "230px";
            document.querySelector(".btn-success").style.display = "none";
            cancel.style.display = "block";
            restore.style.display = "block";


            update(id);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function update(id) {
    let data = {
        name: {
            firstname:
                firstName.value.charAt(0).toUpperCase() +
                firstName.value.slice(1).toLowerCase(),
            lastname:
                lastName.value.charAt(0).toUpperCase() +
                lastName.value.slice(1).toLowerCase(),
        },
        phone: phoneNumber.value,
        email: emailAdr.value,
    };

    fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Şəbəkə hal-hazırda sizə cavab vermir...");
            }

            restore.addEventListener("click", function (e) {
                e.preventDefault();

                let tableRow = document.querySelector(`tr[data-id="${id}"]`);
                let card = document.querySelector(`div[data-id="${id}"]`);

                console.log(firstName.value);
                tableRow.querySelector("td:nth-child(1)").textContent = firstName.value;
                tableRow.querySelector("td:nth-child(2)").textContent = lastName.value;
                tableRow.querySelector("td:nth-child(3)").textContent = phoneNumber.value;
                tableRow.querySelector("td:nth-child(4)").textContent = emailAdr.value;

                card.querySelector(".fname span:nth-child(2)").textContent = firstName.value;
                card.querySelector(".lname span:nth-child(2)").textContent = lastName.value;
                card.querySelector(".tel span:nth-child(2)").textContent = phoneNumber.value;
                card.querySelector(".email span:nth-child(2)").textContent = emailAdr.value;

                form.reset();
            });

            modRestore.addEventListener("click", function (e) {

                e.preventDefault();
                modal.style.display = "none";

                let tableRow = document.querySelector(`tr[data-id="${id}"]`);
                let card = document.querySelector(`div[data-id="${id}"]`);

                tableRow.querySelector("td:nth-child(1)").textContent =
                    modFirstName.value;
                tableRow.querySelector("td:nth-child(2)").textContent =
                    modLastName.value;
                tableRow.querySelector("td:nth-child(3)").textContent =
                    modPhoneNumber.value;
                tableRow.querySelector("td:nth-child(4)").textContent =
                    modEmailAdr.value;


                card.querySelector(".fname span:nth-child(2)").textContent = modFirstName.value;
                card.querySelector(".lname span:nth-child(2)").textContent = modLastName.value;
                card.querySelector(".tel span:nth-child(2)").textContent = modPhoneNumber.value;
                card.querySelector(".email span:nth-child(2)").textContent = modEmailAdr.value;

                form.reset();
            });

            modCancel.addEventListener("click", function (e) {

                e.preventDefault();
                modal.style.display = "none";
                signUP.style.display = "block";
                restore.style.display = "none";
                cancel.style.display = "none";
                legend.innerHTML = "Qeydiyyat";
                legend.style.width = "150px";
                form.reset();
            });

            cancel.addEventListener("click", function (e) {
                e.preventDefault();
                e.target.style.display = "none";
                restore.style.display = "none";
                signUP.style.display = "block";
                legend.innerHTML = "Qeydiyyat";
                legend.style.width = "150px";
                form.reset();
            })
        })
        .catch(function (err) {
            console.log(err);
        });
}

getAll();