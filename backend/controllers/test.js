const allMyProducts = [
    {
        name: "awkvnkevr",
        description: "awelkwcn",
        price: 1234,
        collegeName: "lwemf",
        location: "ubnciuiew",
        image: "your_binary_data_here" // Replace with actual binary data
    },
    {
        name: "awkvnkevr",
        description: "awelkwcn",
        price: 1234,
        collegeName: "lwemf",
        location: "ubnciuiew",
        image: "your_binary_data_here" // Replace with actual binary data
    }
];

for(let i = 0; i<allMyProducts.length; i++){
    allMyProducts[i].image = Buffer.from(allMyProducts[i].image).toString('base64')
}
console.log(allMyProducts);

// Assuming you have the binary data, convert it to a base64 string
const base64Image = Buffer.from(allMyProducts[0].image).toString('base64');

// Create the new object with the base64-encoded image
const imageString = {
    name: allMyProducts[0].name,
    description: allMyProducts[0].description,
    price: allMyProducts[0].price,
    collegeName: allMyProducts[0].collegeName,
    location: allMyProducts[0].location,
    image: base64Image // This is the base64 string of the image
};


