import { Product } from "../../data-access/models/product";

export const productsMockError: Product[] = [
  {
    id: "trj-crd2",
    name: "Tarjeta de Credito",
    description: "Tarjeta de consumo bajo la modalidad de credito",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-02-01T00:00:00.000+00:00",
    date_revision: "2024-02-01T00:00:00.000+00:00"
  },
  {
    id: "trj-crd6",
    name: "Tarjeta de Debito",
    description: "Tarjeta de consumo bajo la modalidad de credito",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-02-01T00:00:00.000+00:00",
    date_revision: "2024-02-01T00:00:00.000+00:00"
  },
  {
    id: "trj-crd3",
    name: "Tarjeta de Debito",
    description: "Tarjeta de consumo bajo la modalidad de credito",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-02-01T00:00:00.000+00:00",
    date_revision: "2024-02-01T00:00:00.000+00:00"
  },
  {
    id: "trj-crd5",
    name: "Tarjeta de Debito",
    description: "Tarjeta de consumo bajo la modalidad de credito",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-02-01T00:00:00.000+00:00",
    date_revision: "2024-02-01T00:00:00.000+00:00"
  },
  {
    id: "trj-crd8",
    name: "Tarjeta de Debito X",
    description: "Tarjeta de consumo bajo la modalidad de credito",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-02-01T00:00:00.000+00:00",
    date_revision: "2024-02-01T00:00:00.000+00:00"
  },
  {
    id: "   ",
    name: "     ",
    description: "           ",
    logo: "    ",
    date_release: "2023-11-24T00:00:00.000+00:00",
    date_revision: "2024-11-24T00:00:00.000+00:00"
  },
  {
    id: "    ",
    name: "      ",
    description: "           ",
    logo: "ghnmhg",
    date_release: "2023-11-01T00:00:00.000+00:00",
    date_revision: "2024-11-01T00:00:00.000+00:00"
  },
  {
    id: "dfd3434",
    name: "dfdfd3",
    description: "dfdf3333333",
    logo: "",
    date_release: "2023-11-23T00:00:00.000+00:00",
    date_revision: "2024-11-23T00:00:00.000+00:00"
  }
]

export const productsMockSuccess: Product[] = [
  {
    id: "0101",
    name: "VISA Multipuntos Golden",
    description: "Cash Back 8%",
    logo: "https://www.bancocuscatlan.com.hn/images/tarjetas/multipremios-oro.png",
    date_release: "2023-11-22T00:00:00.000+00:00",
    date_revision: "2024-11-22T00:00:00.000+00:00"
  },
  {
    id: "0103",
    name: "VISA Multipuntos Platinum",
    description: "Miles Lempiras",
    logo: "https://www.bancocuscatlan.com.hn/images/tarjetas/multipremios-platinum.png",
    date_release: "2023-11-23T00:00:00.000+00:00",
    date_revision: "2024-11-23T00:00:00.000+00:00"
  }
]

//generate a 4 digits ramdom number
function generateRandomNumber(): number{
  return Math.floor(Math.random() * 10000);
}
export const productMockValid: Product = {
  id: generateRandomNumber().toString(),
  name: "TEST VALID",
  description: "Cash Back 8%",
  logo: "https://www.bancocuscatlan.com.hn/images/tarjetas/multipremios-oro.png",
  date_release: "2023-11-22",
  date_revision: "2024-11-22"
}

export const productMockInvalid: Product = {
  id: "01",
  name: "REPEATED",
  description: "NONE",
  logo: "some logo",
  date_release: "2023-11-24",
  date_revision: "2024-11-24"
}

export const productMockEdit: Product = {
  id: "0101",
  name: "REPEATED",
  description: "NONE",
  logo: "some logo",
  date_release: "2023-11-24",
  date_revision: "2024-11-24"
}

export const productMockNonExists: Product = {
  id: "0909",
  name: "REPEATED",
  description: "NONE",
  logo: "some logo",
  date_release: "2023-11-24",
  date_revision: "2024-11-24"
}