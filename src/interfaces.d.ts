// Defines the interface of the properties of the Domain component
interface IDomainProps { 
  name: string;
  quota: string;
}

// Defines the interface of the state of the DomainBox component
interface IDomainBoxState {
  domains: Array<IDomainProps>;
}

// Defines the interface of the structure of an Email
interface IEmail {
  username: string;
  quota: string;
  password: string;
 // domain_id: string;
}

// Defines the interface of the properties of the Email component
interface IEmailProps {
  emailId: string; 
  username: string;
  quota: string;
  //changePwd: (password: string, domainId: string) => void;
}

interface IEmailBox {
  key: string; 
  username: string;
  quota: string;
}

interface IEmailPropsArray {
  //[index: number]: IEmailProps;
}

// Defines the interface of the state of the EmailBox component
interface IEmailBoxState {
  //emails: IEmailPropsArray;
  emails: Array<IEmailBox>;
  alertMessage: string;
}

// Defines the interface of the properties of the EmailBox component
interface IEmailBoxProps {
  domainId: string;
  domainName: string;
}

interface IEmailFormProps {
  domainId: string;
  domainName: string;
  addEmail: (email: IEmail) => void;
}

interface IEmailFormState {
  username: string;
  quota: string;
  password: string;
  userValidationState: string;
  passwordConfirmation: string;
  pwdValidationState: string;
  confirmationValidationState: string;
  pwdValidationMessage: string;
  userValidationMessage: string;
  disableSubmit: boolean;
  showModal: boolean;
}

interface IEmailPwdProps {
  emailId: string;
  username: string;
}

interface IEmailPwdState {
  password: string;
  passwordConfirmation: string;
  showModal: boolean;
  pwdValidationState: string;
  confirmationValidationState: string;
  validationMessage: string;
  disableSubmit: boolean;
}

interface ISomeHash {
    [key: string]: string;
}

interface IAlertDismissableProps {
  message: string;
  hideAlert: () => void;
}
