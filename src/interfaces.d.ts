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
  domainId: string;
}

// Defines the interface of the properties of the Email component
interface IEmailProps {
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
  emails: Array<IEmailProps>;
}

// Defines the interface of the properties of the EmailBox component
interface IEmailBoxProps {
  domainId: string;
}

interface IEmailFormProps {
  domainId: string;
  addEmail: (email: IEmail) => void;
}

interface IEmailFormState {
  username: string;
  quota: string;
  password: string;
  showModal: boolean;
}

interface ISomeHash {
    [key: string]: string;
}
