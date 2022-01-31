# Formix MUI

![npm](https://img.shields.io/npm/v/@euk-labs/formix-mui)
![NPM](https://img.shields.io/npm/l/@euk-labs/formix-mui)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Eureka-Shoulders/formix-mui/CI)
![npm](https://img.shields.io/npm/dw/@euk-labs/formix-mui)

Formix-mui is a Formix and MUI library that can provide a simple way of connecting MUI Fields with your Formix form.

### Dependencies

- MUI: A UI library that serves as the basis for the project
  - You can learn more about MUI [here](mui.com/)
- MobX is used to generate Stores and Hooks powered by these stores to make a beautiful reactive way to control the data on your interfaces.
  - Meet this wonderful lib [here](mobx.js.org/)

## Installation

Our dependencies:

```bash
# Using npm:
npm install @mui/material @mui/icons-material @mui/lab @emotion/react @emotion/styled mobx mobx-react-lite @euk-labs/formix @euk-labs/componentz

# Using yarn:
yarn add @mui/material @mui/icons-material @mui/lab @emotion/react @emotion/styled mobx mobx-react-lite @euk-labs/formix @euk-labs/componentz
```

Installing formix-mui 🤩

```bash
# Using npm:
npm i @euk-labs/formix-mui

# Using yarn:
yarn add @euk-labs/formix-mui
```

## Usage

We've separated the logical part of the component, which has the minimum responsibilities to be as generic as possible, so we use Mobx for state management to make this happen.

The complete documentation is under construction, we will soon make it available.

A simple example of what a component's usage pattern looks like:

_In this example we are using Next but the idea can be used for other React applications_

```ts
import { Formix } from '@euk-labs/formix';
import { FXPasswordField } from '@euk-labs/formix-mui';

function MyForm() {
  return (
    <Formix
      initialValues={{
        email: '',
        password: '',
        birthDate: '',
      }}
      onSubmit={(values: any) => alert(JSON.stringify(values))}
    >
      <FXTextField label="E-mail" name="email" />
      <FXPasswordField label="Senha" name="password" />
      <FXDatePicker label="Data nascimento" name="birthDate" />
    </Formix>
  );
}

export default MyForm;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
