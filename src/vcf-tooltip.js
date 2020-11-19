import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ElementMixin } from '@vaadin/vaadin-element-mixin';
import '@vaadin/vaadin-lumo-styles/icons';
import '@polymer/iron-icon';
import './vcf-tooltip-styles';

/**
 * `<vcf-tooltip>` Web Component providing an easy way to display tooltips for any html element.
 *
 * ```html
 * <vcf-tooltip for="element-id" position="top">
 *   A short text describing the element.
 * </vcf-tooltip>
 * ```
 *
 * ### Styling
 *
 * The following parts are available for styling:
 *
 * Part name | Description
 * --|--
 * `container` | Container for content and close button
 * `content` | Tooltip content
 * `close-button` | Tooltip close button
 *
 * The following themes are available:
 *
 * Theme name | Description
 * --|--
 * `dark` (default) | Lumo dark theme
 * `light` | Lumo light theme
 *
 * @memberof Vaadin
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @demo demo/index.html
 */
class VcfTooltip extends ElementMixin(ThemableMixin(PolymerElement)) {
  static get template() {
    return html`
      <style>
        :host {
          box-sizing: border-box;
          padding: 0;
          display: block;
          position: absolute;
          outline: none;
          z-index: 1000;
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          cursor: default;
          box-shadow: var(--lumo-box-shadow-xs);
        }

        :host([close-button]) [part='close-button'] {
          display: inline-block;
        }

        :host([close-button]) [part='container'] {
          padding-right: 0;
        }

        [part='close-button'] {
          display: none;
          margin: 0;
          padding: 0;
          margin-top: calc(-1 * var(--lumo-tooltip-size) / 6);
          cursor: pointer;
        }

        [part='content'] {
          box-sizing: border-box;
          width: 100%;
        }

        [part='container'] {
          display: flex;
          padding: calc(var(--lumo-tooltip-size) / 6) calc(var(--lumo-tooltip-size) / 4);
          color: var(--lumo-body-text-color);
          background-color: var(--lumo-base-color);
          border-radius: var(--lumo-border-radius);
          border: 1px solid var(--lumo-contrast-20pct);
        }

        :host([hidden]) [part='content'] {
          display: none !important;
        }

        :host ::slotted(*) {
          box-sizing: border-box;
        }
      </style>

      <div part="container" theme$="[[theme]]">
        <div part="content">
          <slot></slot>
        </div>
        <vaadin-button part="close-button" theme="icon tertiary small" on-click="hide" title="Close tooltip">
          <iron-icon icon="lumo:cross"></iron-icon>
        </vaadin-button>
      </div>
    `;
  }

  static get is() {
    return 'vcf-tooltip';
  }

  static get version() {
    return '1.3.9';
  }

  static get properties() {
    return {
      /**
       * The id of the target element. Must be a sibling.
       */
      for: {
        type: String
      },

      /**
       * Tooltip position. Possible values: top, right, left and bottom.
       */
      position: {
        type: String,
        value: 'top'
      },

      /*
       * Alignment to the target element. Possible values: top, bottom, left, right and center.
       */
      align: {
        type: String,
        value: 'center'
      },

      /**
       * Is the tooltip hidden.
       */
      hidden: {
        type: Boolean,
        value: true,
        notify: true,
        reflectToAttribute: true,
        observer: '_hiddenChanged'
      },

      /**
       * Enable manual mode.
       */
      manual: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * The tooltip is attached to this element.
       */
      targetElement: {
        type: Object,
        observer: '_attachToTarget'
      },

      /**
       * Show/hide tooltip close button if on manual mode.
       */
      closeButton: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * Set tooltip theme.
       */
      theme: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  static get observers() {
    return ['_setPosition(targetElement, hidden, position, align)', '_updateTarget(for)', '_manualObserver(manual)'];
  }

  constructor() {
    super();
    this._boundShow = this.show.bind(this);
    this._boundHide = this.hide.bind(this);
    this._boundOnKeyup = this._onKeyup.bind(this);
    this._setDefaultId();
  }

  connectedCallback() {
    this._attachToTarget();
    super.connectedCallback();
  }

  ready() {
    super.ready();
    // Debounced re-position on window resize
    window.addEventListener('resize', () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(() => {
        const { targetElement, hidden, position } = this;
        if (!this.hidden) this._setPosition(targetElement, hidden, position);
      }, 100);
    });
    // Set default theme
    if (!this.getAttribute('theme')) this.setAttribute('theme', 'dark');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._detachFromTarget();
  }

  _manualObserver() {
    if (this.manual) this._removeEvents();
    else this._addEvents();
  }

  _attachToTarget(targetElement, oldTargetElement) {
    if (oldTargetElement) {
      this._removeTargetEvents(oldTargetElement);
      if (oldTargetElement.describedby) {
        oldTargetElement.removeAttribute('aria-describedby');
        delete oldTargetElement.describedby;
      }
    }
    if (targetElement) {
      this._addEvents();
      if (!targetElement.getAttribute('aria-describedby')) {
        targetElement.setAttribute('aria-describedby', this.id);
        targetElement.describedby = true;
      }
    }
  }

  _addEvents() {
    if (this.targetElement && !this.manual) {
      this.targetElement.addEventListener('mouseenter', this._boundShow);
      this.targetElement.addEventListener('focus', this._boundShow);
      this.targetElement.addEventListener('mouseleave', this._boundHide);
      this.targetElement.addEventListener('blur', this._boundHide);
      this.targetElement.addEventListener('tap', this._boundHide);
    }

    if (!this.manual) {
      this.addEventListener('mouseenter', this._boundShow);
      this.addEventListener('mouseleave', this._boundHide);
    }

    window.addEventListener('keyup', this._boundOnKeyup);
  }

  _onKeyup(e) {
    // Hide on Escape key press
    if (e.keyCode === 27) this.hide();
  }

  _detachFromTarget() {
    if (!this.manual) this._removeEvents();
    if (this.targetElement.describedby) {
      this.targetElement.removeAttribute('aria-describedby');
      delete this.targetElement.describedby;
    }
  }

  _removeEvents() {
    if (this.targetElement) this._removeTargetEvents(this.targetElement);
    this.removeEventListener('mouseenter', this._boundShow);
    this.removeEventListener('mouseleave', this._boundHide);
    window.removeEventListener('keyup', this._boundOnKeyup);
  }

  _removeTargetEvents(target) {
    target.removeEventListener('mouseenter', this._boundShow);
    target.removeEventListener('focus', this._boundShow);
    target.removeEventListener('mouseleave', this._boundHide);
    target.removeEventListener('blur', this._boundHide);
    target.removeEventListener('tap', this._boundHide);
  }

  _updateTarget() {
    this.targetElement = this.parentNode.querySelector(`#${this.for}`);
  }

  _setPosition(targetElement, hidden, position) {
    if (targetElement && !hidden) {
      const parentRect = this.offsetParent.getBoundingClientRect();
      const parentRectTop = parentRect.top;
      const parentRectLeft = parentRect.left;
      const parentRectHeight = parentRect.height;
      const targetRect = this.targetElement.getBoundingClientRect();
      const thisRect = this.getBoundingClientRect();
      const horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
      const verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
      let targetLeft = targetRect.left;
      let targetTop = targetRect.top;
      let pageYOffset = window.pageYOffset;
      let tooltipLeft, tooltipTop;

      // Detect if the offsetParent is 'positioned'
      if (window.getComputedStyle(this.offsetParent).position !== 'static') {
        targetTop = this.targetElement.offsetTop;
        targetLeft = this.targetElement.offsetLeft;
        pageYOffset = 0;
      }

      switch (position) {
        case 'top':
          tooltipTop = targetTop - thisRect.height + pageYOffset;
          tooltipLeft = this._calculateLeft(targetLeft, targetRect, thisRect, horizontalCenterOffset);
          break;
        case 'bottom':
          tooltipTop = targetTop + targetRect.height + pageYOffset;
          tooltipLeft = this._calculateLeft(targetLeft, targetRect, thisRect, horizontalCenterOffset);
          break;
        case 'left':
          tooltipLeft = targetLeft - thisRect.width;
          tooltipTop = this._calculateTop(targetTop, targetRect, thisRect, verticalCenterOffset, pageYOffset);
          break;
        case 'right':
          tooltipLeft = targetLeft + targetRect.width;
          tooltipTop = this._calculateTop(targetTop, targetRect, thisRect, verticalCenterOffset, pageYOffset);
          break;
      }

      this._setPositionInVisibleBounds(
        parentRectHeight,
        parentRectLeft,
        parentRectTop,
        tooltipLeft,
        tooltipTop,
        thisRect
      );
    }
  }

  _setPositionInVisibleBounds(parentRectHeight, parentRectLeft, parentRectTop, tooltipLeft, tooltipTop, thisRect) {
    // Check and fix horizontal position
    if (parentRectLeft + tooltipLeft + thisRect.width > window.innerWidth) {
      this.style.right = '0px';
      this.style.left = 'auto';
    } else {
      this.style.left = Math.max(0, tooltipLeft) + 'px';
      this.style.right = 'auto';
    }
    // Check and fix vertical position
    const parentHeight = this.offsetParent ? this.offsetParent.scrollHeight : window.innerHeight;
    if (parentRectTop + tooltipTop + thisRect.height > parentHeight) {
      this.style.bottom = parentRectHeight + 'px';
      this.style.top = 'auto';
    } else {
      this.style.top = Math.max(-parentRectTop, tooltipTop) + 'px';
      this.style.bottom = 'auto';
    }
  }

  _calculateLeft(targetLeft, targetRect, thisRect, horizontalCenterOffset) {
    switch (this.align) {
      case 'left':
        return targetLeft;
      case 'right':
        return targetRect.left + targetRect.width - thisRect.width;
      default:
        return targetLeft + horizontalCenterOffset;
    }
  }

  _calculateTop(targetTop, targetRect, thisRect, verticalCenterOffset, pageYOffset) {
    switch (this.align) {
      case 'top':
        return targetTop + pageYOffset;
      case 'bottom':
        return targetTop + targetRect.height - thisRect.height + pageYOffset;
      default:
        return targetTop + verticalCenterOffset + pageYOffset;
    }
  }

  show() {
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

  _hiddenChanged(hidden) {
    if (hidden) this.setAttribute('aria-hidden', true);
    else this.setAttribute('aria-hidden', false);
  }

  _setDefaultId() {
    if (!this.id) {
      if (!Vaadin.tooltipIndex) Vaadin.tooltipIndex = 0;
      this.id = 'vcf-tooltip' + ++Vaadin.tooltipIndex;
    }
  }
}

customElements.define(VcfTooltip.is, VcfTooltip);

/**
 * @namespace Vaadin
 */
window.Vaadin.VcfTooltip = VcfTooltip;
