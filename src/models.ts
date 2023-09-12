export interface Text {
    id: string;
    status: string;
    div: string;
}

export interface Identifier {
    id: string;
    use: string;
    type?: any;
    system: string;
    value: string;
    period?: any;
    assigner?: any;
}

export interface Name {
    id: string;
    use: string;
    text?: any;
    family: string;
    given: string[];
    prefix: any[];
    suffix: string[];
    period?: any;
}

export interface Telecom {
    id: string;
    system: string;
    value: string;
    use: string;
    rank?: any;
    period?: any;
}

export interface Address {
    id: string;
    use?: any;
    type?: any;
    text?: any;
    line: string[];
    city: string;
    district?: any;
    state?: any;
    postalCode: string;
    country: string;
    period?: any;
}

export interface Photo {
    id: string;
    contenttype: string;
    language?: any;
    data: string;
    url?: any;
    size?: any;
    hash?: any;
    title?: any;
    creation?: any;
}

export interface Coding {
    id: string;
    system: string;
    version?: any;
    code: string;
    display: string;
    userSelected: boolean;
}

export interface Code {
    id: string;
    coding: Coding[];
    text: string;
}

export interface Period {
    id: string;
    start: Date;
    end: Date;
}

export interface Qualification {
    id: string;
    modifierExtension: any[];
    identifier: any[];
    code: Code;
    period: Period;
    reference?: any;
}

export interface Communication {
    id: string;
    coding: Coding[];
    text: string;
}

export interface Reference {
  id: string;
  reference: string;
  type: string;
  identifier: Identifier[];
  display: string;
}

export interface Practitioner {
    id: string;
    text: Text;
    identifier: Identifier[];
    active: boolean;
    name: Name[];
    telecom: Telecom[];
    address: Address[];
    gender: string;
    birthdate: string;
    photo: Photo[];
    qualification: Qualification[];
    communication: Communication[];
}

export interface Patient {
  id: string;
  text: Text;
  identifier: Identifier[];
  active: boolean;
  name: Name[];
  telecom: Telecom[];
  address: Address[];
  gender: string;
  birthdate: string;
  photo: Photo[];
  generalPractitioner: Reference[];
  deceasedBoolean: boolean;
  deceasedDateTime: Date;
}

