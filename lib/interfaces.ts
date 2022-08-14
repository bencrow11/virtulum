export interface Item {
  quantity: number;
  description: string;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  company: Company;
  items: Item[];
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
}

export interface Address {
  address: string;
  city: string;
  postcode: string;
}

export interface Company {
  name: string;
  contact: string;
  bill: Address;
  ship: Address;
  invoices: Invoice[];
  invoiceNumber: number;
}

export interface Account {
  credentials: {
    email: string;
    password: string;
  };
  details: {
    name: string;
    company: string;
    address: Address;
    number?: number;
    email?: string;
    website?: string;
  };
  companies: Company[];
}
export interface HeaderProps {
  links: {
    category: string;
    linkList: { link: string; label: string; icon: any }[];
  }[];
  isSignedIn: boolean;
}
