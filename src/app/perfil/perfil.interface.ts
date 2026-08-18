interface Servico {
  id: string;
  label: string;
  price: string;
}

interface Convenio {
  value: string;
  label: string;
}

interface Unidade {
  value: string;
  label: string;
  room: string;
  open: string;
}

export type{ Servico, Convenio, Unidade };