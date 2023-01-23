const formDetails = document.getElementById("formDetails");

// Inputs de agregar producto
const inputAmount = document.getElementById("amount");
const inputSelectDescription = document.getElementById("selectDescription");
const inputPriceUnit = document.getElementById("priceUnit");
const inputPriceTotal = document.getElementById("priceTotal");
const tbody = document.getElementById("tbody");
const formHeader = document.getElementById("formFactura");
const formBoleta = document.getElementById("formBoleta");

inputAmount.value = 1;

// Boton para guardar
const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");

// Inputs para el primer formulario
const inputBusinessName = document.getElementById("businessName");
const inputRUC = document.getElementById("ruc");
const inputNumber = document.getElementById("number");
const inputAddress = document.getElementById("address");
const inputDateIssue = document.getElementById("dateIssue");

// Arrays
let invoices = [];
let detailtArray = [];
let productArray = [
    { id:1, name: "Teclado Gamer Razer", price: 90.0 }, 
    { id:2, name: "Mouse Gamer Radeon", price: 100.0 }, 
    { id:3, name: "Cooler para laptop", price: 40.0 }, 
    { id:4, name: "Tarjeta RTX 4090TI", price: 4200.0 }, 
    { id:5, name: "Monitor 28 pulgadas", price: 400.0 }
];

const verifyInvoice = () => {
    const invoicesLS = JSON.parse(localStorage.getItem("Factura"));
    // if(invoicesLS){
    //     invoices = invoicesLS;
    // }

    // invoices = invoicesLS || [];
};

verifyInvoice();

const fillProducts = () => {
    productArray.forEach((p) => {
        const option = document.createElement("option");
        option.value = p.id
        option.innerText = p.name;
        inputSelectDescription.appendChild(option);
    });
};

fillProducts();

const getProductNameById = (id) => {
    const objProduct = productArray.find((p) => {
        if(p.id === +id){
            return p;
        }
    });
    return objProduct.name;
};

const getPriceProductById = (id) => {
    const objProduct = productArray.find((p) => {
        if(p.id === +id){
            return p;
        }
    });
    return objProduct.price;
};

const redrawTable = () => {
    tbody.innerHTML="";
    detailtArray.forEach((details) => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${details.amount}</td>
                        <td>${getProductNameById(details.description)}</td>
                        <td>${details.priceUnit}</td>
                        <td>${details.priceTotal}</td>`;
        let tdDelete = document.createElement("td")
        let btnDelete = document.createElement("button");
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.innerText = "Eliminar"
        btnDelete.onclick = () => {
            // console.log(details);
            deleteDetailById(details.description);
        }
        tdDelete.appendChild(btnDelete);
        row.appendChild(tdDelete);
        tbody.appendChild(row);
    }); 
};

const deleteDetailById = (id) => {
    detailtArray = detailtArray.filter((details) => {
        if(+id !== +details.description){
            return details;
        }
    });
    redrawTable();
};

const addDetails = (objDetails) => {
    // Buscar si el producto existe en el arreglo detalle.
    const result = detailtArray.find((detail) => {
        if(+objDetails.description === +detail.description){
            return detail;
        }
    });

    if(result){
        detailtArray = detailtArray.map((detail) => {
            if(+detail.description === +objDetails.description){
                return {
                    amount: +detail.amount + +objDetails.amount,
                    description: detail.description,
                    priceTotal: (+detail.amount + +objDetails.amount)* +detail.priceUnit,
                    priceUnit: +detail.priceUnit,
                };
            }
            return detail;
        });
    }else{
        detailtArray.push(objDetails);
    }
}

formDetails.onsubmit = (e) => {
    e.preventDefault();
    //Creando objeto temporal
    const objDetails = {
        amount: inputAmount.value,
        description: inputSelectDescription.value,
        priceUnit: inputPriceUnit.value,
        priceTotal: inputPriceTotal.value
    };
    addDetails(objDetails);
    console.log(detailtArray);
    redrawTable();
};

btnSave.onclick = () => {
    //Crear el objeto de la cabecera de la factura.
    let objInvoice = {
        businessName: inputBusinessName.value,
        ruc: inputRUC.value,
        address: inputAddress.value,
        number: inputNumber.value,
        dateIssue: inputDateIssue.value,
        details: detailtArray,
    };
    // console.log(objInvoice); 
    invoices.push(objInvoice);
    //Limpiar campos
    formHeader.reset();
    formDetails.reset();

    // Guardar en el LocalStorage
    localStorage.setItem("Facturas", JSON.stringify(invoices));
    //Limpiar la tabla
    detailtArray = [];
    redrawTable();
};

btnCancel.onclick = () => {
    formHeader.reset();
    formDetails.reset();
    formBoleta.reset();
    detailtArray = [];
    redrawTable();
}

inputSelectDescription.onchange = () => {
    if(inputSelectDescription.value == "0"){
        formDetails.reset();
        return;
    }
    const price = getPriceProductById(inputSelectDescription.value);
    // console.log(inputSelectDescription.value);
    if(price){
        inputPriceUnit.value = price;
        calculateTotal();
    }
}

const calculateTotal = () => {
    const amount = + inputAmount.value;
    const pUnit = + inputPriceUnit.value;
    const total = amount * pUnit;
    inputPriceTotal.value = total.toFixed(2);
}

inputAmount.onkeyup = () => {
    calculateTotal();
}

inputAmount.onchange = () => {
    calculateTotal();
}
