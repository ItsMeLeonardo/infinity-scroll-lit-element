import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("gallery-item")
export class GalleryItem extends LitElement {
  static styles = [
    css`
      img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        object-fit: cover;
      }
      .gallery-item {
        width: 100%;
        aspect-ratio: 1/1;
        height: 100%;
        cursor: pointer;
        overflow: hidden;
      }
      .gallery-img {
        width: 100%;
        height: 100%;
        display: block;
        transition: transform 0.5s ease-in-out;
        transform-origin: 0 0;
      }
      .gallery-item:hover .gallery-img {
        transform: scale(1.15);
      }
    `,
  ];

  @property({ type: String })
  src: string = "";

  @property({ type: String })
  alt: string = "";

  render() {
    return html`
      <li class="gallery-item">
        <picture class="gallery-img">
          <img src="${this.src}" alt="${this.alt}" />
        </picture>
      </li>
    `;
  }
}
