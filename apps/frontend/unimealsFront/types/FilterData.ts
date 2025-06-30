export type FilterData = {
  location: string[];
  category: string[];
  orderBy: string | null;
};

export const categories = ['Tacos', 'Dulces', 'Hamburguesas'];
export const locations = ['FCFM', 'FIME', 'FCQ', 'FCB'];
export const orderBy = ['Precio: bajo a alto', 'Precio: alto a bajo', 'Más reciente', 'Más antiguos', 'Mejor calificados'];
