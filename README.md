[![Build Status](https://travis-ci.org/vaadin/vcf-tooltip.svg?branch=master)](https://travis-ci.org/vaadin/vcf-tooltip)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/web-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# &lt;vcf-tooltip&gt;

[Live Demo ↗](https://incubator.app.fi/vcf-tooltip-demo/)


[&lt;vcf-tooltip&gt;](https://vaadin.com/directory/component/vaadinvcf-tooltip) is a Web Component providing an easy way to display tooltips on any html element.

```html
  <vcf-tooltip for="element-id" position="top">
    A short text describing the element.
  </vcf-tooltip>
```

[<img src="https://raw.githubusercontent.com/vaadin/vcf-tooltip/master/screenshot.png" width="200" alt="Screenshot of vcf-tooltip">](https://vaadin.com/components/vcf-tooltip)

## Installation

The Vaadin components are distributed as Bower and npm packages.
Please note that the version range is the same, as the API has not changed.
You should not mix Bower and npm versions in the same application, though.

Unlike the official Polymer Elements, the converted Polymer 3 compatible Vaadin components
are only published on npm, not pushed to GitHub repositories.

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


## License

Commercial Vaadin Add-on License version 3 (CVALv3). For license terms, see LICENSE.

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
