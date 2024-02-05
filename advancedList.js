export default class UnorderedList {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        category: "Category",
        subcategory: "Subcategory",
        data: {},
      },
      options
    );

    Array.from({ length: 8 }, (_, i) => {
      this.options.data[`Team ${i + 1}`] = Array.from({ length: 8 }, (_, j) => {
        return `Member ${j + 1}`;
      });
    });

    this.render();
  }

  render() {
    this.element = document.createElement("ol");
    this.element.classList.add("lists");
    this.element.ariaLabel = this.options.category + ": ";
    this.element.innerHTML = this._append();
    this.options.container.append(this.element);
    this.element.querySelector("input").checked = true;
  }

  _append() {
    return Object.keys(this.options.data)
      .map((key, index) => {
        return `<li>
          <label for="list${index + 1}" class="lists__label">
            ${key}
          </label>
          <input
            type="radio"
            class="lists__input"
            name="list"
            id="list${index + 1}"
            checked
          />
          <ul class="list" aria-label="${this.options.subcategory + ":"}">
            ${this.options.data[key]
              .map((datum) => `<li>${datum}</li>`)
              .join("")}
          </ul>
        </li>`;
      })
      .join(" ");
  }
}
