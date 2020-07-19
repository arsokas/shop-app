export default class ProductService {
  getProducts() {
    return MOCK_PRODUCTS;
  }

  // TO DO: addProduct
  // deleteProduct
  // editProduct or updateProduct
  addProduct(product) {
    console.log(product);
  }
}

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Margherita",
    description:
      "Italian sausage, pesto, feta cheese, bell peppers, tomato sauce",
    price: 10,
    img: "https://i.imgur.com/7uVYUlY.jpg",
    quantity: 0,
  },
  {
    id: 2,
    name: "Salami",
    description: "Ground beef, tomato sauce, mozzarella cheese, green pepper",
    price: 8,
    img: "https://i.imgur.com/EJq2okb.jpg",
    quantity: 0,
  },
  {
    id: 3,
    name: "Vegetarian",
    description:
      "Ricotta cheese, tomato sauce, fresh basil pesto, fresh olives",
    price: 17,
    img: "https://i.imgur.com/Z84g4Sb.jpg",
    quantity: 0,
  },
  {
    id: 4,
    name: "House Special",
    description: "Cherry tomatoes, bread flour, mozzarella, olive oil",
    price: 17,
    img: "https://i.imgur.com/27uOWcU.jpg",
    quantity: 0,
  },
];
