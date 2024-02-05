export default class UnorderedList {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        label: "Other list",
        data: Array.from({ length: 46 }, (_, i) => {
          return `List no ${i + 1}`;
        }),
        visible: 5,
      },
      options
    );

    this.current = 1; // DEFAULT
    this.count = this.current * this.options.visible;
  }

  render() {
    this.element = document.createElement("ol");
    this.element.classList.add("unordered-list");
    this.element.ariaLabel = this.options.label + ": ";
    this.element.innerHTML = this._append();
    this._addListener();
    this.options.container.append(this.element);
  }

  _append() {
    const arr = this.options.data.slice(0, this.count);
    return arr
      .map((r, i) => {
        const last = i === this.options.data.length - 1 ? "last--li" : "";

        return `<li class="unordered-list__list ${last}">${r}</li>`;
      })
      .join(" ");
  }

  _update() {
    this.count = this.current * this.options.visible;

    this.element.innerHTML = this._append();
  }

  _addListener() {
    this.element.addEventListener("click", (e) => {
      const lists = this.element.querySelectorAll("li");

      if (e.target != lists[lists.length - 1]) return;

      if (e.target.matches(".last-li")) {
        console.log("here");
        this.current = 1;
      } else {
        if (this.count >= this.options.data.length) return;
        this.current += 1;
      }

      this._update();
    });
  }
}
