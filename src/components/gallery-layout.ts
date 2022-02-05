import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { getPhotos } from "../services/getPhotos";
import type { Photo } from "../services/getPhotos";
import "./gallery-item";
import { dayCompleted } from "../utils/dayCompleted";

@customElement("gallery-layout")
export class GalleryLayout extends LitElement {
  static styles = [
    css`
      .gallery-grid {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, minmax(100px, 200px));
        gap: 0.5rem;
        grid-auto-flow: dense;
      }
      gallery-item {
        width: 100%;
        aspect-ratio: 1/1;
        height: 100%;
        cursor: pointer;
        overflow: hidden;
      }
      gallery-item:nth-child(6n + 1):not(:last-child) {
        grid-area: span 2 / span 2;
      }
      gallery-item:nth-child(8n + 1):not(:last-child) {
        aspect-ratio: 1/2;
        grid-area: span 2;
      }
    `,
  ];

  @query(".ref-bottom")
  bottomRef!: HTMLElement;

  @property()
  images: Photo[] = [];

  @property()
  page = 1;

  private observer!: IntersectionObserver;

  async getInitialData() {
    try {
      // this is for update the photos every day
      if (dayCompleted()) {
        localStorage.removeItem("photos");
      }

      const dataStorage = localStorage.getItem("photos");
      if (!dataStorage) {
        this.images = await getPhotos();
        localStorage.setItem("photos", JSON.stringify(this.images));
        return "done with api";
      }
      this.images = JSON.parse(dataStorage);
      return "done with localStorage";
    } catch (err) {
      console.log({ err });
      return "error";
    }
  }

  async getNextPage() {
    try {
      const data = await getPhotos(this.page + 1);
      this.images = [...this.images, ...data];
      this.page += 1;
    } catch (err) {
      console.log({ err });
    }
  }

  firstUpdated() {
    this.getInitialData().then(console.log);

    // initialize the observer
    const options = { rootMargin: "0px 0px 200px 0px" };
    const callback = (entries: IntersectionObserverEntry[]) => {
      const [element] = entries;
      if (!element.isIntersecting) return;
      this.getNextPage();
    };
    this.observer = new IntersectionObserver(callback, options);
    this.observer.observe(this.bottomRef);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // revoke the observer when the element is removed
    this.observer.disconnect();
  }

  render() {
    return html`
      <ul class="gallery-grid">
        ${this.images.map((image) => {
          return html`
            <gallery-item
              src="${image?.urls?.regular}"
              alt="${image?.id}"
            ></gallery-item>
          `;
        })}
      </ul>
      <div class="ref-bottom"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gallery-layout": GalleryLayout;
  }
}
