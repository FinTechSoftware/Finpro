import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import FinproElement from "../../internals/finpro-element";
import { watch } from "../../internals/watch";
import QrCreator from 'qr-creator';
import './fp-qr-code.css'
import { styleMap } from "lit/directives/style-map.js";


@customElement("fp-qr-code")
export default class FpQrCode extends FinproElement {
    @query('canvas') canvas: HTMLElement;

    @property() value = '';

    @property() label = '';

    @property({ type: Number }) size = 128;

    @property() fill = 'black';

    @property() background = 'white';

    @property({ type: Number }) radius = 0;

    @property({ attribute: 'error-correction' }) errorCorrection: 'L' | 'M' | 'Q' | 'H' = 'H';

    firstUpdated() {
        this.generate();
    }

    @watch(['background', 'errorCorrection', 'fill', 'radius', 'size', 'value'])
    generate() {
        if (!this.hasUpdated) {
            return;
        }

        QrCreator.render(
            {
                text: this.value,
                radius: this.radius,
                ecLevel: this.errorCorrection,
                fill: this.fill,
                background: this.background,
                size: this.size * 2
            },
            this.canvas
        );
    }

    render() {
        return html`
        <canvas
          part="base"
          class="qr-code"
          role="img"
          aria-label=${this.label?.length > 0 ? this.label : this.value}
          style=${styleMap({
            width: `${this.size}px`,
            height: `${this.size}px`
        })}
        ></canvas>
      `;
    }
}