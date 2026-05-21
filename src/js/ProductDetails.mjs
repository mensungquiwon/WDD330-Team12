// js/ProductDetails.mjs
import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    document.querySelector('#product-detail').innerHTML = `
      <img src="${this.product.Image}" alt="${this.product.Name}" />
      <div class="product-detail__info">
        <h3 class="product-detail__brand">${this.product.Brand.Name}</h3>
        <h2 class="product-detail__name">${this.product.Name}</h2>
        <p class="product-detail__color">${this.product.Colors[0].ColorName}</p>
        <p class="product-detail__price">$${this.product.FinalPrice}</p>
        <p class="product-detail__description">
          ${this.product.DescriptionHtmlSimple}
        </p>
        <button id="addToCart">Add to Cart</button>
      </div>
    `;
  }
}