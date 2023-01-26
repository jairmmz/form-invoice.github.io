const formDetails = document.getElementById("formDetails");
const formModal = document.getElementById("formModal");

// Inputs de agregar producto
const inputAmount = document.getElementById("amount");
const inputSelectDescription = document.getElementById("selectDescription");
const inputPriceUnit = document.getElementById("priceUnit");
const inputPriceTotal = document.getElementById("priceTotal");
const tbody = document.getElementById("tbody");
const formHeader = document.getElementById("formFactura");
const formBoleta = document.getElementById("formBoleta");

// Para mostrar el sub total, igv, y total
const subTotal = document.getElementById("subTotal");
const igv = document.getElementById("igv");
const sumTotal = document.getElementById("sumTotal");

// Valor por default para la cantidad
inputAmount.value = 1;

// Boton para guardar
const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");

// Inputs para el formulario boleta
const inputDNI = document.getElementById("dni");
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAddressTicket = document.getElementById("addressTicket");
const inputNumberTicket = document.getElementById("numberTicket");
const inputDateIssueTicket = document.getElementById("dateIssueTicket");

// Inputs para el primer formulario factura
const inputRUC = document.getElementById("ruc");
const inputBusinessName = document.getElementById("businessName");
const inputNumber = document.getElementById("number");
const inputAddress = document.getElementById("addressInv");
const inputDateIssue = document.getElementById("dateIssue");

// Inputs para agregar del modal a la tabla
const inputModalProduct = document.getElementById("modalProduct");
const inputModalPrice = document.getElementById("modalPrice");
const inputModalAmount = document.getElementById("modalAmount");

// Arrays
let invoices = [];
let detailtArray = [];
let productArray = [
    { id:1, name: "Teclado Gamer Razer", price: 91.5}, 
    { id:2, name: "Mouse Gamer Radeon", price: 100.0 }, 
    { id:3, name: "Cooler para laptop", price: 40.0 }, 
    { id:4, name: "Tarjeta RTX 4090TI", price: 4200.0 }, 
    { id:5, name: "Monitor 28 pulgadas", price: 400.0 }
];
let ticketArray = [
    { dni:74589625, firstName: "Juan", lastName: "Perez Ortega", addressTicket: "Av. Daniel Henriquez N 0"}, 
    { dni:12345678, firstName: "Alicia", lastName: "Aedo Valdivia", addressTicket: "Av. Daniel Salas N 23" }, 
    { dni:87654321, firstName: "Maria", lastName: "Rojaz Alvarez", addressTicket: "Jr. Rodrigo Concepcion N 4" }, 
    { dni:15236547, firstName: "Oscar", lastName: "Juro Quispe", addressTicket: "Urb. Dylan Trevino N 6964" }, 
    { dni:25414785, firstName: "Alonzo", lastName: "Huamani Sanchez", addressTicket: "Av. Emiliano Jurado N 23422" }
];
let invoicetArray = [
    { ruc:10164090588, businessName: "SELVA INDUSTRIAS MELITA E.I.R.L.", addressInvoice: "Av. Daniel Henriquez N 0"}, 
    { ruc:10164120517, businessName: "AGROSORIA E.I.R.L", addressInvoice: "Av. Daniel Vallejo N 101" }, 
    { ruc:12345678910, businessName: "AGRINOVA DEL PERU S.R.L", addressInvoice: "Jr. Rodrigo Concepcion N 4" }, 
    { ruc:15236547233, businessName: "SOCIEDAD COMERCIAL DE PRODUCTOS AG", addressInvoice: "Urb. Dylan Trevino N 6964" }, 
    { ruc:25414785424, businessName: "BENDICIoN DE DIOS LP", addressInvoice: "Av. Emiliano Jurado N 23422" }
];


inputDNI.addEventListener("change", function() {
    let foundTicket = ticketArray.find(ticket => ticket.dni == inputDNI.value);
    if(foundTicket) {
        inputFirstName.value = foundTicket.firstName;
        inputLastName.value = foundTicket.lastName;
        inputAddressTicket.value = foundTicket.addressTicket;
    } else {
        // Mostrar un mensaje de error si el dni no se encuentra en el array
        console.log("No se ha encontrado un registro con ese DNI");
    }
});

inputRUC.addEventListener("change", function() {
    let foundInvoice = invoicetArray.find(invoice => invoice.ruc == inputRUC.value);
    if(foundInvoice) {
        inputBusinessName.value = foundInvoice.businessName;
        inputAddress.value = foundInvoice.addressInvoice;
    } else {
        // Mostrar un mensaje de error si el ruc no se encuentra en el array
        console.log("No se ha encontrado un registro con ese ruc");
    }
});


const verifyInvoice = () => {
    const invoicesLS = JSON.parse(localStorage.getItem("Factura"));
    // if(invoicesLS){
    //     invoices = invoicesLS;
    // }

    invoices = invoicesLS || [];
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
    let subtotalSum = 0;
    let igvSum = 0;
    let totalSum = 0;
    detailtArray.forEach((details) => {

        const priceTotal = details.amount * details.priceUnit;
        subtotalSum += priceTotal/1.18;
        igvSum = subtotalSum * 0.18;
        totalSum += priceTotal;


        let row = document.createElement("tr");
        let rowTwo = document.createElement("tr");
        let rowThree = document.createElement("tr");
        let rowFour = document.createElement("tr");

        row.innerHTML = `<td>${details.amount}</td>
                        <td>${getProductNameById(details.description)}</td>
                        <td>${details.priceUnit}</td>
                        <td>${details.subTotal.toFixed(2)}</td>
                        <td>${details.priceTotal}</td>`;
        let tdDelete = document.createElement("td");
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
        tbody.appendChild(rowTwo);
        tbody.appendChild(rowThree);
        tbody.appendChild(rowFour);
    }); 
    subTotal.innerText = subtotalSum.toFixed(2);
    igv.innerText = igvSum.toFixed(2);
    sumTotal.innerText = totalSum.toFixed(2);
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
                    subTotal: ((+detail.amount + +objDetails.amount)* +detail.priceUnit)/1.18,
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
        subTotal: inputPriceTotal.value/1.18,
        priceTotal: inputPriceTotal.value
    };
    addDetails(objDetails);
    console.log(detailtArray);
    redrawTable();
};

formModal.onsubmit = (e) => {
    e.preventDefault();
    //Creando objeto temporal
    const objDetails = {
        description: inputModalProduct.value,
        priceUnit: inputModalPrice.value,
        amount: inputModalAmount.value,
        subTotal: (inputModalPrice.value*inputModalAmount)*1.18,
        priceTotal: inputModalPrice.value*inputModalAmount
    };
    addDetails(objDetails);
    console.log(detailtArray);
    redrawTable();
};

/* btnSave.onclick = () => {
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
    
    // Guardar en el LocalStorage
    localStorage.setItem("Facturas", JSON.stringify(invoices));
    //Limpiar la tabla
    detailtArray = [];
    redrawTable();
}; */

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
