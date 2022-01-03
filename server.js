const express = require('express');
const app = express();
const port = 3000; 
const PDFDocument = require('pdfkit');

app.use(express.json())

//RUNING SERVER//
app.listen(port, () => {
    console.log(`App is listening at localhost:${port}`);
})

//CHECKING IF SERVER IS RUNING BY GET REQUEST AND BY NODE CMD//
app.get('/', (req, res) => {
    res.send('Server is live');
})

//GETING DATA FROM JSON FILE//
app.post('/', (req, res) => {
    const doc = new PDFDocument;
    let invoicejson = req.body;
    
    let firstName = invoicejson.order.buyer.firstName;
    let shippingAddress = invoicejson.order.shippingAddress;
    let billingAddress = invoicejson.order.billingAddress;

    //CHECKING IF BILLING ADDRESS IS DIFERENT THAN SHIPPING ADDRESS//
    if (billingAddress == null) {
        billingAddress = shippingAddress; 
    }else{
        billingAddress = invoicejson.order.billingAddress;
    };
    //RENDERING PDF//
    doc.pipe(res);

    //IMAGE//
    const maxWidth = 150;
    const maxHeight = 90;
    doc.image('logo.png',
    doc.page.width / 2 - maxWidth / 2, 60, {fit: [maxWidth, maxHeight], align: 'center',});
    doc.moveDown(8)
    //UPPER TEXT//
    doc.fontSize(30);
    doc.text(`Danke ${JSON.stringify(firstName).replace(/"/g,"")},`);
    doc.moveDown;
    doc.text('für deine Bestellung!');
    doc.moveDown()
    doc.fontSize(20);
    doc.text('Hiermit bestätigen wir deine Bestellung bei ', {
        continued : true
    });
    doc.font('Helvetica-Bold').text('beeanco', {
        continued : true   
    });
    doc.font('Helvetica')
    doc.text('. Bite überprüfe noch einmal unten aufgelistet deine bestellten Artikel und deine angebene Lieferadresse.')
    doc.moveDown(3)
    doc.fontSize(10);
    //ADDRESS PART//
    doc
        .font('Helvetica-Bold')
        .text('Angegebene Lieferadresse:',{continued:true})
        .text('Angegebene Rechnungadresse:',{align:'right'})
        .font('Helvetica')
        .moveDown()
        .text(`${JSON.stringify(shippingAddress.name).replace(/"/g,"")}`,{continued:true})
        .text(`${JSON.stringify(billingAddress.name).replace(/"/g,"")}`,{align:'right'})
        .text(`${JSON.stringify(shippingAddress.address1).replace(/"/g,"")}`,{continued:true})
        .text(`${JSON.stringify(billingAddress.address1).replace(/"/g,"")}`,{align:'right'})
        .text(`${JSON.stringify(shippingAddress.address2).replace(/"/g,"")}`,{continued:true})
        .text(`${JSON.stringify(billingAddress.address2).replace(/"/g,"")}`,{align:'right'})
        .text(`${JSON.stringify(shippingAddress.zip).replace(/"/g,"")} ${JSON.stringify(shippingAddress.city).replace(/"/g,"")} ${JSON.stringify(shippingAddress.countryCode).replace(/"/g,"")}`,{continued:true} )
        .text(`${JSON.stringify(billingAddress.zip).replace(/"/g,"")} ${JSON.stringify(billingAddress.city).replace(/"/g,"")} ${JSON.stringify(billingAddress.countryCode).replace(/"/g,"")}`,{align:'right'});
    doc.moveDown(5)    
    //ITEMS PART
    for (const item of invoicejson.order.items) {
        doc
            .font('Helvetica-Bold')
            .text(`${JSON.stringify(item.product.name).replace(/"/g,"")} - ${JSON.stringify(item.product.vendor.name).replace(/"/g,"")}`)
            .font('Helvetica')
            .text(`#${JSON.stringify(item.product.sku).replace(/"/g,"")} MENGE: ${JSON.stringify(item.quantity).replace(/"/g,"")} PREIS: ${JSON.stringify(item.price).replace(/"/g,"")} €`)
        doc.moveDown()
    };
    doc.end();

    console.log('PDF Created');
    
});

