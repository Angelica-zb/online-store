import { Page } from "../core/templates/page";
import { SET, DATA, StorageProducts } from "../modules/data";
import { localStorageUtil } from "../modules/localStorage";
import { header } from "./header";
import { dataStore } from "./header";

export class MainPage extends Page {
  static TextObject = {
    mainTitle: "Main Page",
    total: "Cart total",
    btnPriceUp: "Price Up",
    btnPriceDown: "Price Down",
    btnStockUp: "Stock Up",
    btnStockDown: "Stock Down",
    btnItemsRow: "row",
    btnItemsColumn: "col",
    btnResetFilters: "Reset filters",
    btnCopyLink: "Copy Link",
    find: "Find:",
    addToCard: "Add to card",
    dropFromCard: "Drop from card",
    divFilterBrand: "Brand",
    divFilterCategory: "Category",
    inputFilterPrice: "Price",
    inputFilterStock: "Stock",
  };
  currentData: Array<SET>;
  static currentDATA = DATA;
  itemsContainer: HTMLElement;
  buttonSortPriceUp: HTMLElement;
  buttonSortPriceDown: HTMLElement;
  buttonSortStockUp: HTMLElement;
  buttonSortStockDown: HTMLElement;
  inputSearch: HTMLElement;
  buttonItemsRow: HTMLElement;
  buttonItemsColumn: HTMLElement;
  inputSearchForm: HTMLFormElement;
  itemsFind: HTMLElement;
  itemsFindText: HTMLElement;
  itemsFindNum: HTMLElement;
  filterCategory: HTMLElement;
  filterBrand: HTMLElement;
  filterPrice: HTMLElement;
  filterStock: HTMLElement;
  btnResetFilters: HTMLElement;
  btnCopyLink: HTMLElement;
  isFilter: boolean;

  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
    if (dataStore) {
      this.currentData = dataStore;
    } else {
      this.currentData = JSON.parse(JSON.stringify(DATA));
    }
    this.isFilter = false;
    this.itemsContainer = document.createElement("div");
    this.itemsContainer.classList.add("items__cards", "row");

    this.buttonSortPriceUp = document.createElement("button");
    this.buttonSortPriceUp.id = "price-up";
    this.buttonSortPriceUp.classList.add("button");
    this.buttonSortPriceUp.classList.add("button_price-up");
    this.buttonSortPriceUp.textContent = MainPage.TextObject.btnPriceUp;

    this.buttonSortPriceDown = document.createElement("button");
    this.buttonSortPriceDown.id = "price-down";
    this.buttonSortPriceDown.classList.add("button", "button_price-down");
    this.buttonSortPriceDown.textContent = MainPage.TextObject.btnPriceDown;

    this.buttonSortStockUp = document.createElement("button");
    this.buttonSortStockUp.id = "rating-up";
    this.buttonSortStockUp.classList.add("button", "button_rating-up");
    this.buttonSortStockUp.textContent = MainPage.TextObject.btnStockUp;

    this.buttonSortStockDown = document.createElement("button");
    this.buttonSortStockDown.id = "rating-down";
    this.buttonSortStockDown.classList.add("button", "button__rating-down");
    this.buttonSortStockDown.textContent = MainPage.TextObject.btnStockDown;

    this.inputSearchForm = document.createElement("form");
    this.inputSearchForm.setAttribute("type", "submit");
    this.inputSearchForm.id = "form-search";

    this.inputSearch = document.createElement("input");
    this.inputSearch.setAttribute("type", "text");
    this.inputSearch.setAttribute("name", "search");
    this.inputSearch.setAttribute("placeholder", "Search");
    this.inputSearch.classList.add("input-search");
    this.inputSearchForm.appendChild(this.inputSearch);

    this.itemsFind = document.createElement("div");
    this.itemsFind.classList.add("items__find");
    this.itemsFindText = document.createElement("div");
    this.itemsFindText.classList.add("items__find-text");
    this.itemsFindText.textContent = MainPage.TextObject.find;
    this.itemsFindNum = document.createElement("div");
    this.itemsFindNum.classList.add("items__find-num");
    this.itemsFindNum.textContent = String(this.currentData.length);
    this.itemsFind.append(this.itemsFindText, this.itemsFindNum);

    this.buttonItemsRow = document.createElement("button");
    this.buttonItemsRow.id = "button-row";
    this.buttonItemsRow.classList.add("button__row", "button-vie", "active");
    this.buttonItemsRow.textContent = MainPage.TextObject.btnItemsRow;

    this.buttonItemsColumn = document.createElement("button");
    this.buttonItemsColumn.id = "button-column";
    this.buttonItemsColumn.classList.add("button__column", "button-vie");
    this.buttonItemsColumn.textContent = MainPage.TextObject.btnItemsColumn;

    this.filterCategory = document.createElement("div");
    this.filterCategory.classList.add("filter__category", "filter");
    this.filterCategory.textContent = MainPage.TextObject.divFilterCategory;

    this.filterBrand = document.createElement("div");
    this.filterBrand.classList.add("filter__brand", "filter");
    this.filterBrand.textContent = MainPage.TextObject.divFilterBrand;

    this.filterPrice = document.createElement("input");
    this.filterPrice.setAttribute("type", "range");
    this.filterPrice.classList.add("filter__price", "filter-input");
    this.filterPrice.textContent = MainPage.TextObject.inputFilterPrice;

    this.filterStock = document.createElement("input");
    this.filterStock.setAttribute("type", "range");
    this.filterStock.classList.add("filter__stock", "filter-input");
    this.filterStock.textContent = MainPage.TextObject.inputFilterStock;

    this.btnResetFilters = document.createElement("button");
    this.btnResetFilters.id = "reset-filters";
    this.btnResetFilters.classList.add("button", "button__reset-filters");
    this.btnResetFilters.textContent = MainPage.TextObject.btnResetFilters;

    this.btnResetFilters = document.createElement("button");
    this.btnResetFilters.id = "reset-filters";
    this.btnResetFilters.classList.add("button", "button__reset");
    this.btnResetFilters.textContent = MainPage.TextObject.btnResetFilters;

    this.btnCopyLink = document.createElement("button");
    this.btnCopyLink.id = "copy-link";
    this.btnCopyLink.classList.add("button", "button__copy");
    this.btnCopyLink.textContent = MainPage.TextObject.btnCopyLink;

    this.buttonSortPriceUp.addEventListener("click", this.sortItemsPriceUp);
    this.buttonSortPriceDown.addEventListener("click", this.sortItemsPriceDown);

    this.buttonSortStockUp.addEventListener("click", this.sortItemsStockUp);
    this.buttonSortStockDown.addEventListener("click", this.sortItemsStockDown);

    this.buttonItemsColumn.addEventListener("click", this.cardsShowColumn);
    this.buttonItemsRow.addEventListener("click", this.cardsShowRow);

    this.btnResetFilters.addEventListener("click", this.resetFilters);

    this.inputSearchForm.addEventListener("change", function (event: Event) {
      event.preventDefault();
      const target = document.getElementById("form-search") as HTMLFormElement;
      const formData = new FormData(target);
      const text = formData.get("search") as string;
      getInput(text.trim());
      return false;
    });
  }
  public resetFilters = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("products");
    this.isFilter = false;
    this.currentData = JSON.parse(JSON.stringify(DATA));
    this.generateProducts(this.currentData);
    this.setCardsNumber(this.currentData.length);
    this.createFilters(DATA);
    const target = document.getElementsByTagName("input");
    for (let i = 0; i < target.length; i++) {
      if (target[i].type === "checkbox") {
        target[i].checked = false;
      }
    }
  };
  changeCurrentData(data: Array<SET>) {
    this.currentData.length = 0;
    this.currentData.push(...data);
    return this.currentData;
  }

  public createFilters(data: Array<SET>) {
    const filtersHeader = document.createElement("div");
    filtersHeader.classList.add("items__filters");

    const filtersButtons = document.createElement("div");
    filtersButtons.classList.add("filters-buttons");
    filtersButtons.append(this.btnResetFilters, this.btnCopyLink);

    const setCategory = new Set();

    DATA.map((a: SET): void => {
      setCategory.add(a.category);
    });

    const filterCategoryBlock = document.createElement("form");
    filterCategoryBlock.id = "form-category";
    filterCategoryBlock.setAttribute("name", "form-category");
    filterCategoryBlock.classList.add("input-checkbox-block");

    setCategory.forEach((item) => {
      const filterDataCategory = DATA.filter((el) => el.category === item);
      const count = filterDataCategory.length;

      const filterDataCategoryPage = data.filter((el) => el.category === item);
      const countPage = filterDataCategoryPage.length;

      const filterCategoryItem = document.createElement("input");
      filterCategoryItem.setAttribute("type", "checkbox");
      filterCategoryItem.setAttribute("name", "category");
      filterCategoryItem.classList.add("input-checkbox");
      filterCategoryItem.value = `${item}`;
      const filterCategoryText = document.createElement("label");
      filterCategoryText.classList.add("input-checkbox-text");
      filterCategoryText.innerHTML = `${item} (${countPage}/${count})`;

      filterCategoryText.append(filterCategoryItem);
      filterCategoryBlock.append(filterCategoryText);

      filterCategoryItem.addEventListener("change", function (event: Event) {
        event.preventDefault();
        if (this.checked) {
          getFilter(item as string);
        } else {
          remove(item as string);
        }
      });

      // const checkboxes = document.querySelectorAll('.input-checkbox');
      //   let items:[string];
      //   for (let i=0;i<checkboxes.length;i++){

      //     if (checkboxes[i].checked) {
      //       items.push(checkboxes[i].value)
      //   } else {
      //     console.log("Checkbox is not checked..");
      //   }
      //   }
    });
    this.filterCategory.append(filterCategoryBlock);

    const setBrand = new Set();

    DATA.map((a: SET): void => {
      setBrand.add(a.brand);
    });

    const filterBrandBlock = document.createElement("form");
    filterBrandBlock.id = "form-brand";
    filterBrandBlock.setAttribute("name", "form-brand");
    filterBrandBlock.classList.add("input-checkbox-block");

    setBrand.forEach((item) => {
      const filterDataBrand = DATA.filter((el) => el.brand === item);
      const count = filterDataBrand.length;

      const filterDataBrandPage = data.filter((el) => el.brand === item);
      const countPage = filterDataBrandPage.length;

      const filterBrandItem = document.createElement("input");
      filterBrandItem.setAttribute("type", "checkbox");
      filterBrandItem.setAttribute("name", "brand");
      filterBrandItem.classList.add("input-checkbox");
      const filterBrandText = document.createElement("label");
      filterBrandText.classList.add("input-checkbox-text");
      filterBrandText.innerHTML = `${item} (${countPage}/${count})`;

      filterBrandText.append(filterBrandItem);

      filterBrandBlock.append(filterBrandText);
      filterBrandItem.addEventListener("change", function (event: Event) {
        event.preventDefault();
        if (this.checked) {
          getFilter(item as string);
        } else {
          remove(item as string);
        }
      });
    });
    this.filterBrand.append(filterBrandBlock);

    const filtersHeaderPrice = document.createElement("div");

    filtersHeaderPrice.classList.add("items__filters-input");

    const filtersHeaderStock = document.createElement("div");
    filtersHeaderStock.classList.add("items__filters-input");

    filtersHeaderPrice.append(this.filterPrice);
    filtersHeaderStock.append(this.filterStock);
    filtersHeader.append(
      filtersButtons,
      this.filterCategory,
      this.filterBrand,
      filtersHeaderPrice,
      filtersHeaderStock
    );
    return filtersHeader;
  }

  public makeFilters(item: string) {
    if (!this.isFilter) {
      this.isFilter = true;
      this.currentData.length = 0;
    }

    const filterDataCategory = DATA.filter(
      (el) => el.brand === item || el.category === item
    );

    this.currentData.push(...filterDataCategory);
    console.log(this.currentData);

    const mainItems = document.querySelector(".items__cards") as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;

    mainItems.innerHTML = "";
    mainItems.append(allCards);
    this.setCardsNumber(this.currentData.length);
    this.createFilters(this.currentData);
    localStorageUtil.putData(this.currentData);
    return this.currentData;
  }

  public removeFilter(item: string) {
    console.log(item);
    // const target = document.getElementsByTagName("input");
    // for (let i = 0; i < target.length; i++) {
    //   if (target[i].type === "checkbox") {
    //     target[i].checked = true;
    //     this.isFilter = true;
    //   }
    //   this.isFilter = false;
    // }
    const filterDataCategory = this.currentData.filter(
      (el) => el.brand !== item || el.category !== item
    );
    this.currentData.length = 0;
    this.currentData.push(...filterDataCategory);
    console.log(this.currentData);
    const mainItems = document.querySelector(".items__cards") as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;
    mainItems.innerHTML = "";
    mainItems.append(allCards);
    this.setCardsNumber(this.currentData.length);
    this.createFilters(this.currentData);
    localStorageUtil.putData(this.currentData);
    return this.currentData;
  }

  private createSorts() {
    const sortsHeader = document.createElement("div");

    sortsHeader.classList.add("items__sorts");
    sortsHeader.append(
      this.buttonSortPriceDown,
      this.buttonSortPriceUp,
      this.buttonSortStockDown,
      this.buttonSortStockUp,
      this.itemsFind,
      this.inputSearchForm,
      this.buttonItemsRow,
      this.buttonItemsColumn
    );
    return sortsHeader;
  }
  public searchCards(input: string) {
    const sortedData = DATA.filter(
      (el) =>
        el.price.toString().toLowerCase().includes(input) ||
        el.discountPercentage.toString().toLowerCase().includes(input) ||
        el.rating.toString().toLowerCase().includes(input) ||
        el.stock.toString().toLowerCase().includes(input) ||
        el.title.toLocaleLowerCase().includes(input) ||
        el.description.toLocaleLowerCase().includes(input) ||
        el.brand.toLocaleLowerCase().includes(input) ||
        el.category.toLocaleLowerCase().includes(input)
    );
    this.currentData.length = 0;
    this.currentData.push(...sortedData);

    const mainItems = document.querySelector(".items__cards") as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;

    mainItems.innerHTML = "";
    mainItems.append(allCards);
    this.setCardsNumber(this.currentData.length);
    this.changeCurrentData(sortedData);
    this.createFilters(this.currentData);
    localStorageUtil.putData(this.currentData);
    return this.currentData;
  }

  private setCardsNumber(num: number) {
    this.itemsFindNum.textContent = String(num);
    const number = document.querySelector(".items__find-num");
    if (number) number.textContent = this.itemsFindNum.textContent;
  }

  private createCards(data: Array<SET>) {
    console.log("data" + this.currentData);
    const productsStore = localStorageUtil
      .getProducts()
      .map((x: StorageProducts) => x.id);
    let itemsHTML = "";

    data.forEach(({ id, thumbnail, title, brand, price, stock, category }) => {
      let activeClass = "";
      let activeText = "";

      if (productsStore.indexOf(id) === -1) {
        activeText = MainPage.TextObject.addToCard;
      } else {
        activeText = MainPage.TextObject.dropFromCard;
        activeClass = " active-btn";
      }

      itemsHTML += `
      <div class="cards__item card">
      <div class="card__image">
        <img src=${thumbnail} alt="product image" class="card__img">
      </div>
      <div class="card__about-act">
      <div class="card__about">
        <h3 class="card__title">${title}</h3>
        <p class="card__category">Category: ${category}</p>
        <p class="card__brand">Brand: ${brand}</p>
        <p class="card__price">Price: ${price.toLocaleString()} USD</p>
        <p class="card__stock">Stock: ${stock}</p>
      </div>
      <div class="card__act">
        <button class="card__btn${activeClass}" data-price=${price} data-id=${id}>${activeText}</button>
      </div>
      </div>
    </div>
      `;
    });

    this.itemsContainer.innerHTML = "";
    this.itemsContainer.innerHTML = itemsHTML;
    this.setCardsNumber(this.currentData.length);
    console.log(this.currentData);
    return this.itemsContainer;
  }

  public sortItemsPriceUp = () => {
    this.currentData.sort((a: SET, b: SET) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
    this.generateProducts(this.currentData);
    this.setCardsNumber(this.currentData.length);
    this.toggleClassActive(this.buttonSortPriceUp);
  };
  private toggleClassActive(btn: HTMLElement) {
    this.buttonSortStockUp.classList.remove("active-btn");
    this.buttonSortStockDown.classList.remove("active-btn");
    this.buttonSortPriceUp.classList.remove("active-btn");
    this.buttonSortPriceDown.classList.remove("active-btn");
    btn.classList.add("active-btn");
  }
  public sortItemsPriceDown = () => {
    this.currentData.sort((a: SET, b: SET) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });
    this.generateProducts(this.currentData);
    this.setCardsNumber(this.currentData.length);
    this.toggleClassActive(this.buttonSortPriceDown);
  };

  private generateProducts(data: Array<SET>) {
    const mainItems = document.querySelector("section") as HTMLElement;
    const allCards = this.createCards(data) as HTMLElement;
    mainItems.append(allCards);
    this.container.append(mainItems);
    return this.container;
  }

  public sortItemsStockUp = () => {
    this.currentData.sort((a: SET, b: SET) => {
      if (a.stock > b.stock) {
        return 1;
      }
      if (a.stock < b.stock) {
        return -1;
      }
      return 0;
    });
    this.generateProducts(this.currentData);
    this.setCardsNumber(this.currentData.length);
    this.toggleClassActive(this.buttonSortStockUp);
  };
  public sortItemsStockDown = () => {
    this.currentData.sort((a: SET, b: SET) => {
      if (a.stock < b.stock) {
        return 1;
      }
      if (a.stock > b.stock) {
        return -1;
      }
      return 0;
    });
    this.generateProducts(this.currentData);
    this.setCardsNumber(this.currentData.length);
    this.toggleClassActive(this.buttonSortStockDown);
  };

  public cardsShowRow() {
    const container = document.querySelector(".items__cards");
    const btnAdd = document.querySelector("#button-row");
    const btnRemove = document.querySelector("#button-column");

    if (container) {
      if (!container.classList.contains("row")) {
        container.classList.remove("column");
        container.classList.add("row");
      }
    }

    btnAdd?.classList.add("active");
    btnRemove?.classList.remove("active");
  }
  public cardsShowColumn = () => {
    const container = document.querySelector(".items__cards");
    const btnAdd = document.querySelector("#button-column");
    const btnRemove = document.querySelector("#button-row");

    if (container) {
      if (!container.classList.contains("column")) {
        container.classList.add("column");
        container.classList.remove("row");
      }
    }
    btnAdd?.classList.add("active");
    btnRemove?.classList.remove("active");
  };

  render() {
    const mainItems = document.createElement("section") as HTMLElement;
    const sorts = this.createSorts() as HTMLElement;
    const filters = this.createFilters(this.currentData) as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;

    mainItems.classList.add("main__items");

    this.container.append(filters); // блок с фильтрами
    mainItems.append(sorts); // блок с сортировками
    mainItems.append(allCards); // все товары
    this.container.append(mainItems);
    return this.container;
  }
}

const P = new MainPage("div", "main-container", "main__container");

console.log(P);

function getInput(input: string) {
  P.searchCards(input.toLowerCase());
}

function getFilter(item: string) {
  P.makeFilters(item);
}

function remove(item: string) {
  console.log(item);
  P.removeFilter(item);
}

window.onload = function () {
  (document.getElementById("main-container") as HTMLElement).onclick =
    function (event: Event) {
      const target = event.target as HTMLElement;
      const id = target.getAttribute("data-id");
      const price = target.getAttribute("data-price");

      if (id && price) {
        if (target.classList.contains("card__btn")) {
          const { pushProduct } = localStorageUtil.putProducts(+id, +price);

          if (pushProduct) {
            target.classList.add("active-btn");
            target.innerHTML = MainPage.TextObject.dropFromCard;

            header.addProduct(+price);
          } else {
            target.classList.remove("active-btn");
            target.innerHTML = MainPage.TextObject.addToCard;
            header.removeProduct(+price);
          }
        }
      }
    };
};
