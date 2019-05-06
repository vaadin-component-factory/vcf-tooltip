# &lt;vcf-tooltip&gt; Web Component
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/web-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Published on Vaadin  Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadin-component-factoryvcf-tooltip)

&lt;vcf-tooltip&gt; is a Web Component providing an easy way to display tooltips on any html element.

[Live Demo ↗](https://incubator.app.fi/tooltip-demo/tooltip)

<img src="https://raw.githubusercontent.com/vaadin/incubator-tooltip/master/screenshot.png" width="300" alt="Screenshot of vcf-tooltip">

## Usage
Add &lt;vcf-tooltip&gt; element with attribute `for` which will contain id of target element, to the page. Now after hovering on target element, toltip will be displayed. 


```html
  <button id="element-id">Hover me</button>
  <vcf-tooltip for="element-id" position="top">
    A short text describing the element.
  </vcf-tooltip>
```


## Installation

This components is distributed as Bower packages.

### Polymer 2 and HTML Imports compatible version

Install `vcf-tooltip`:
vcf-tooltip
```sh
bower i vaadin/vcf-tooltip --save
```

Once installed, import it in your application:

```html
<link rel="import" href="bower_components/vcf-tooltip/vcf-tooltip.html">
```
### Polymer 3 and ES Modules compatible version


Install `vcf-tooltip`:
vcf-tooltip
```sh
npm i @vaadin/vcf-tooltip --save
```

Once installed, import it in your application:

```js
import '@vaadin/vcf-tooltip/vcf-tooltip.js';
```

## Getting Started

Vaadin components use the Lumo theme by default.

## The file structure for Vaadin components

- `src/vcf-tooltip.html`
vcf-tooltip
  Unstyled component.

- `theme/lumo/vcf-tooltip.html`
vcf-tooltip
  Component with Lumo theme.

- `vcf-tooltip.html`
vcf-tooltip
  Alias for theme/lumo/vcf-tooltip.html
vcf-tooltip

## Running demos and tests in browser

1. Fork the `vcf-tooltip` repository and clone it locally.
vcf-tooltip
1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vcf-tooltip` directory, run `npm install` and then `bower install` to install dependencies.
vcf-tooltip
1. Run `polymer serve --open`, browser will automatically open the component API documentation.

1. You can also open demo or in-browser tests by adding **demo** or **test** to the URL, for example:

  - http://127.0.0.1:8080/components/vcf-tooltip/demo
  - http://127.0.0.1:8080/components/vcf-tooltip/test
vcf-tooltip

## Running tests from the command line

1. When in the `vcf-tooltip` directory, run `polymer test`
vcf-tooltip

## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `gulp lint`, which will automatically lint all `.js` files as well as JavaScript snippets inside `.html` files.


## Contributing

  - Make sure your code is compliant with our code linters: `gulp lint`
  - Check that tests are passing: `polymer test`
  - [Submit a pull request](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github) with detailed title and description
  - Wait for response from one of Vaadin components team members

# Vaadin Prime
This component is available in Vaadin Prime subscription. It is still open source, but you need to have a valid CVAL license in order to use it. Read more at: https://vaadin.com/pricing

# License

Commercial Vaadin Add-on License version 3 (CVALv3). For license terms, see LICENSE.

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
