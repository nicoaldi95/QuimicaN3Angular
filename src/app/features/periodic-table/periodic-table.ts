import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  category: string;
  mass: number;
  electronConfig: string;
  density: number;
  desc: string;
}

@Component({
  selector: 'app-periodic-table',
  imports: [RouterLink, CommonModule],
  templateUrl: './periodic-table.html',
  styleUrls: ['./periodic-table.css']
})
export class PeriodicTable {
  
  selectedElement = signal<PeriodicElement | null>(null);
  searchTerm = signal('');
  activeFilter = signal('Todos');

  categoryLabels: Record<string, string> = {
    'alkali': 'Metales Alcalinos',
    'alkaline-earth': 'Metales Alcalinotérreos',
    'transition': 'Metales Transicionales',
    'post-transition': 'Metales Postransicionales',
    'metalloid': 'Metaloides',
    'nonmetal': 'No Metales Reactivos',
    'noble': 'Gases Nobles',
    'lanthanide': 'Lantánidos',
    'actinide': 'Actinoides',
    'unknown': 'Propiedades Desconocidas'
  };

  filterOptions = ['Todos', ...Object.values(this.categoryLabels)];

  // Lógica computada para el filtrado (necesaria para el HTML)
  filteredElements = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const filter = this.activeFilter();
    
    return this.elements.filter(el => {
      const matchesSearch = el.name.toLowerCase().includes(term) || 
                           el.symbol.toLowerCase().includes(term) ||
                           el.number.toString().includes(term);
      
      const currentCategoryLabel = this.categoryLabels[el.category];
      const matchesFilter = filter === 'Todos' || currentCategoryLabel === filter;

      return matchesSearch && matchesFilter;
    });
  });

  // Métodos de interacción (necesarios para el HTML)
  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  setActiveFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  selectElement(el: PeriodicElement) {
    this.selectedElement.set(el);
  }

  closeSelection() {
    this.selectedElement.set(null);
  }

  // Helpers visuales y cálculos (necesarios para el HTML)
  getCategoryColor(category: string): string {
    switch (category) {
      case 'alkali': return 'text-rose-400 border-rose-400/40 bg-rose-400/5 shadow-rose-400/10';
      case 'alkaline-earth': return 'text-orange-400 border-orange-400/40 bg-orange-400/5 shadow-orange-400/10';
      case 'transition': return 'text-sky-400 border-sky-400/40 bg-sky-400/5 shadow-sky-400/10';
      case 'post-transition': return 'text-teal-400 border-teal-400/40 bg-teal-400/5 shadow-teal-400/10';
      case 'metalloid': return 'text-amber-300 border-amber-300/40 bg-amber-300/5 shadow-amber-300/10';
      case 'nonmetal': return 'text-emerald-400 border-emerald-400/40 bg-emerald-400/5 shadow-emerald-400/10';
      case 'noble': return 'text-violet-400 border-violet-400/40 bg-violet-400/5 shadow-violet-400/10';
      case 'lanthanide': return 'text-pink-400 border-pink-400/40 bg-pink-400/5 shadow-pink-400/10';
      case 'actinide': return 'text-indigo-400 border-indigo-400/40 bg-indigo-400/5 shadow-indigo-400/10';
      case 'unknown': return 'text-slate-400 border-slate-400/40 bg-slate-400/5';
      default: return 'text-slate-400 border-slate-400/40 bg-slate-400/5';
    }
  }

  getNeutrons(el: PeriodicElement): number {
    return Math.round(el.mass - el.number);
  }

  getRange(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  // Aproximación simple de capas electrónicas para visualización
  getShellDistribution(atomicNumber: number): number[] {
    const shells = [];
    let electrons = atomicNumber;
    let n = 1;
    while (electrons > 0) {
      const capacity = 2 * n * n;
      const count = Math.min(electrons, capacity); // Simplificado
      shells.push(count);
      electrons -= count;
      n++;
    }
    return shells; 
  }

  // DATASET (Truncado en tu ejemplo, asegúrate de tener todos los datos aquí)
  elements: PeriodicElement[] = [
      { number: 1, symbol: 'H', name: 'Hidrógeno', category: 'nonmetal', mass: 1.008, electronConfig: '1s¹', density: 0.00008988, desc: 'Elemento más abundante del universo.' },
      { number: 2, symbol: 'He', name: 'Helio', category: 'noble', mass: 4.0026, electronConfig: '1s²', density: 0.0001785, desc: 'Segundo elemento más ligero.' },
      { number: 3, symbol: 'Li', name: 'Litio', category: 'alkali', mass: 6.94, electronConfig: '[He] 2s¹', density: 0.534, desc: 'Metal más ligero, usado en baterías.' },
      { number: 4, symbol: 'Be', name: 'Berilio', category: 'alkaline-earth', mass: 9.0122, electronConfig: '[He] 2s²', density: 1.85, desc: 'Metal duro de color gris.' },
      { number: 5, symbol: 'B', name: 'Boro', category: 'metalloid', mass: 10.81, electronConfig: '[He] 2s² 2p¹', density: 2.08, desc: 'Metaloides para semiconductores.' },
      { number: 6, symbol: 'C', name: 'Carbono', category: 'nonmetal', mass: 12.011, electronConfig: '[He] 2s² 2p²', density: 2.267, desc: 'Base de la química orgánica.' },
      { number: 7, symbol: 'N', name: 'Nitrógeno', category: 'nonmetal', mass: 14.007, electronConfig: '[He] 2s² 2p³', density: 0.00125, desc: '78% de la atmósfera terrestre.' },
      { number: 8, symbol: 'O', name: 'Oxígeno', category: 'nonmetal', mass: 15.999, electronConfig: '[He] 2s² 2p⁴', density: 0.00143, desc: 'Vital para la respiración aeróbica.' },
      { number: 9, symbol: 'F', name: 'Flúor', category: 'nonmetal', mass: 18.998, electronConfig: '[He] 2s² 2p⁵', density: 0.0017, desc: 'El más electronegativo.' },
      { number: 10, symbol: 'Ne', name: 'Neón', category: 'noble', mass: 20.180, electronConfig: '[He] 2s² 2p⁶', density: 0.0009, desc: 'Gas noble para iluminación.' },
      { number: 11, symbol: 'Na', name: 'Sodio', category: 'alkali', mass: 22.990, electronConfig: '[Ne] 3s¹', density: 0.968, desc: 'Metal reactivo en sal común.' },
      { number: 12, symbol: 'Mg', name: 'Magnesio', category: 'alkaline-earth', mass: 24.305, electronConfig: '[Ne] 3s²', density: 1.738, desc: 'Usado en aleaciones ligeras.' },
      { number: 13, symbol: 'Al', name: 'Aluminio', category: 'post-transition', mass: 26.982, electronConfig: '[Ne] 3s² 3p¹', density: 2.70, desc: 'Metal ligero y muy común.' },
      { number: 14, symbol: 'Si', name: 'Silicio', category: 'metalloid', mass: 28.085, electronConfig: '[Ne] 3s² 3p²', density: 2.329, desc: 'Base de microchips.' },
      { number: 15, symbol: 'P', name: 'Fósforo', category: 'nonmetal', mass: 30.974, electronConfig: '[Ne] 3s² 3p³', density: 1.823, desc: 'Crucial para el ADN.' },
      { number: 16, symbol: 'S', name: 'Azufre', category: 'nonmetal', mass: 32.06, electronConfig: '[Ne] 3s² 3p⁴', density: 2.07, desc: 'Presente en aminoácidos.' },
      { number: 17, symbol: 'Cl', name: 'Cloro', category: 'nonmetal', mass: 35.45, electronConfig: '[Ne] 3s² 3p⁵', density: 0.0032, desc: 'Desinfectante potente.' },
      { number: 18, symbol: 'Ar', name: 'Argón', category: 'noble', mass: 39.948, electronConfig: '[Ne] 3s² 3p⁶', density: 0.00178, desc: 'Gas inerte en soldaduras.' },
      { number: 19, symbol: 'K', name: 'Potasio', category: 'alkali', mass: 39.098, electronConfig: '[Ar] 4s¹', density: 0.89, desc: 'Electrolito esencial.' },
      { number: 20, symbol: 'Ca', name: 'Calcio', category: 'alkaline-earth', mass: 40.078, electronConfig: '[Ar] 4s²', density: 1.55, desc: 'Metal de huesos y dientes.' },
      { number: 21, symbol: 'Sc', name: 'Escandio', category: 'transition', mass: 44.956, electronConfig: '[Ar] 3d¹ 4s²', density: 2.985, desc: 'Lámparas de alta intensidad.' },
      { number: 22, symbol: 'Ti', name: 'Titanio', category: 'transition', mass: 47.867, electronConfig: '[Ar] 3d² 4s²', density: 4.506, desc: 'Resistente a la corrosión.' },
      { number: 23, symbol: 'V', name: 'Vanadio', category: 'transition', mass: 50.942, electronConfig: '[Ar] 3d³ 4s²', density: 6.11, desc: 'Endurece el acero.' },
      { number: 24, symbol: 'Cr', name: 'Cromo', category: 'transition', mass: 51.996, electronConfig: '[Ar] 3d⁵ 4s¹', density: 7.19, desc: 'Proporciona brillo metálico.' },
      { number: 25, symbol: 'Mn', name: 'Manganeso', category: 'transition', mass: 54.938, electronConfig: '[Ar] 3d⁵ 4s²', density: 7.21, desc: 'Importante en metalurgia.' },
      { number: 26, symbol: 'Fe', name: 'Hierro', category: 'transition', mass: 55.845, electronConfig: '[Ar] 3d⁶ 4s²', density: 7.874, desc: 'El más usado industrialmente.' },
      { number: 27, symbol: 'Co', name: 'Cobalto', category: 'transition', mass: 58.933, electronConfig: '[Ar] 3d⁷ 4s²', density: 8.9, desc: 'Usado en imanes potentes.' },
      { number: 28, symbol: 'Ni', name: 'Níquel', category: 'transition', mass: 58.693, electronConfig: '[Ar] 3d⁸ 4s²', density: 8.908, desc: 'Resistente a la oxidación.' },
      { number: 29, symbol: 'Cu', name: 'Cobre', category: 'transition', mass: 63.546, electronConfig: '[Ar] 3d¹⁰ 4s¹', density: 8.96, desc: 'Excelente conductor eléctrico.' },
      { number: 30, symbol: 'Zn', name: 'Zinc', category: 'transition', mass: 65.38, electronConfig: '[Ar] 3d¹⁰ 4s²', density: 7.134, desc: 'Protección galvánica.' },
      { number: 31, symbol: 'Ga', name: 'Galio', category: 'post-transition', mass: 69.723, electronConfig: '[Ar] 3d¹⁰ 4s² 4p¹', density: 5.91, desc: 'Se funde a 29.76 °C.' },
      { number: 32, symbol: 'Ge', name: 'Germanio', category: 'metalloid', mass: 72.63, electronConfig: '[Ar] 3d¹⁰ 4s² 4p²', density: 5.323, desc: 'Semiconductor de alta eficiencia.' },
      { number: 33, symbol: 'As', name: 'Arsénico', category: 'metalloid', mass: 74.922, electronConfig: '[Ar] 3d¹⁰ 4s² 4p³', density: 5.727, desc: 'Conocido tóxico industrial.' },
      { number: 34, symbol: 'Se', name: 'Selenio', category: 'nonmetal', mass: 78.971, electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁴', density: 4.81, desc: 'Fotosensibilidad luminosa.' },
      { number: 35, symbol: 'Br', name: 'Bromo', category: 'nonmetal', mass: 79.904, electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁵', density: 3.102, desc: 'Único no metal líquido.' },
      { number: 36, symbol: 'Kr', name: 'Kriptón', category: 'noble', mass: 83.798, electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁶', density: 0.00373, desc: 'Gas noble luminoso.' },
      { number: 37, symbol: 'Rb', name: 'Rubidio', category: 'alkali', mass: 85.468, electronConfig: '[Kr] 5s¹', density: 1.532, desc: 'Muy reactivo, color violeta.' },
      { number: 38, symbol: 'Sr', name: 'Estroncio', category: 'alkaline-earth', mass: 87.62, electronConfig: '[Kr] 5s²', density: 2.64, desc: 'Usado en fuegos artificiales.' },
      { number: 39, symbol: 'Y', name: 'Itrio', category: 'transition', mass: 88.906, electronConfig: '[Kr] 4d¹ 5s²', density: 4.472, desc: 'Fósforos rojos en LEDs.' },
      { number: 40, symbol: 'Zr', name: 'Zirconio', category: 'transition', mass: 91.224, electronConfig: '[Kr] 4d² 5s²', density: 6.52, desc: 'Resistente a neutrones.' },
      { number: 41, symbol: 'Nb', name: 'Niobio', category: 'transition', mass: 92.906, electronConfig: '[Kr] 4d⁴ 5s¹', density: 8.57, desc: 'Superconductores MRI.' },
      { number: 42, symbol: 'Mo', name: 'Molibdeno', category: 'transition', mass: 95.95, electronConfig: '[Kr] 4d⁵ 5s¹', density: 10.28, desc: 'Aguanta altas temperaturas.' },
      { number: 43, symbol: 'Tc', name: 'Tecnecio', category: 'transition', mass: 98, electronConfig: '[Kr] 4d⁵ 5s²', density: 11, desc: 'Elemento artificial médico.' },
      { number: 44, symbol: 'Ru', name: 'Rutenio', category: 'transition', mass: 101.07, electronConfig: '[Kr] 4d⁷ 5s¹', density: 12.45, desc: 'Contactos eléctricos duros.' },
      { number: 45, symbol: 'Rh', name: 'Rodio', category: 'transition', mass: 102.91, electronConfig: '[Kr] 4d⁸ 5s¹', density: 12.41, desc: 'Metal muy raro y costoso.' },
      { number: 46, symbol: 'Pd', name: 'Paladio', category: 'transition', mass: 106.42, electronConfig: '[Kr] 4d¹⁰', density: 12.023, desc: 'Absorbe hidrógeno.' },
      { number: 47, symbol: 'Ag', name: 'Plata', category: 'transition', mass: 107.87, electronConfig: '[Kr] 4d¹⁰ 5s¹', density: 10.49, desc: 'Máxima conductividad térmica.' },
      { number: 48, symbol: 'Cd', name: 'Cadmio', category: 'transition', mass: 112.41, electronConfig: '[Kr] 4d¹⁰ 5s²', density: 8.65, desc: 'Usado en baterías de níquel.' },
      { number: 49, symbol: 'In', name: 'Indio', category: 'post-transition', mass: 114.82, electronConfig: '[Kr] 4d¹⁰ 5s² 5p¹', density: 7.31, desc: 'Recubrimiento de espejos.' },
      { number: 50, symbol: 'Sn', name: 'Estaño', category: 'post-transition', mass: 118.71, electronConfig: '[Kr] 4d¹⁰ 5s² 5p²', density: 7.287, desc: 'Aleaciones para latas.' },
      { number: 51, symbol: 'Sb', name: 'Antimonio', category: 'metalloid', mass: 121.76, electronConfig: '[Kr] 4d¹⁰ 5s² 5p³', density: 6.685, desc: 'Retardante de llama.' },
      { number: 52, symbol: 'Te', name: 'Telurio', category: 'metalloid', mass: 127.6, electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁴', density: 6.24, desc: 'Paneles solares delgados.' },
      { number: 53, symbol: 'I', name: 'Yodo', category: 'nonmetal', mass: 126.9, electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁵', density: 4.933, desc: 'Sólido púrpura volátil.' },
      { number: 54, symbol: 'Xe', name: 'Xenón', category: 'noble', mass: 131.29, electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁶', density: 0.00588, desc: 'Lámparas de destello Xe.' },
      { number: 55, symbol: 'Cs', name: 'Cesio', category: 'alkali', mass: 132.91, electronConfig: '[Xe] 6s¹', density: 1.93, desc: 'Relojes atómicos ultraprecisos.' },
      { number: 56, symbol: 'Ba', name: 'Bario', category: 'alkaline-earth', mass: 137.33, electronConfig: '[Xe] 6s²', density: 3.51, desc: 'Usado en perforación petrolera.' },
      { number: 57, symbol: 'La', name: 'Lantano', category: 'lanthanide', mass: 138.91, electronConfig: '[Xe] 5d¹ 6s²', density: 6.162, desc: 'Lentes de alta refracción.' },
      { number: 58, symbol: 'Ce', name: 'Cerio', category: 'lanthanide', mass: 140.12, electronConfig: '[Xe] 4f¹ 5d¹ 6s²', density: 6.77, desc: 'Piedras para encendedores.' },
      { number: 59, symbol: 'Pr', name: 'Praseodimio', category: 'lanthanide', mass: 140.91, electronConfig: '[Xe] 4f³ 6s²', density: 6.77, desc: 'Vidrios de seguridad dicroicos.' },
      { number: 60, symbol: 'Nd', name: 'Neodimio', category: 'lanthanide', mass: 144.24, electronConfig: '[Xe] 4f⁴ 6s²', density: 7.01, desc: 'Imanes súper fuertes NdFeB.' },
      { number: 61, symbol: 'Pm', name: 'Prometio', category: 'lanthanide', mass: 145, electronConfig: '[Xe] 4f⁵ 6s²', density: 7.26, desc: 'Baterías atómicas beta.' },
      { number: 62, symbol: 'Sm', name: 'Samario', category: 'lanthanide', mass: 150.36, electronConfig: '[Xe] 4f⁶ 6s²', density: 7.52, desc: 'Imanes de alta temperatura.' },
      { number: 63, symbol: 'Eu', name: 'Europio', category: 'lanthanide', mass: 151.96, electronConfig: '[Xe] 4f⁷ 6s²', density: 5.244, desc: 'Fósforos rojos en billetes.' },
      { number: 64, symbol: 'Gd', name: 'Gadolinio', category: 'lanthanide', mass: 157.25, electronConfig: '[Xe] 4f⁷ 5d¹ 6s²', density: 7.9, desc: 'Contraste para RMN.' },
      { number: 65, symbol: 'Tb', name: 'Terbio', category: 'lanthanide', mass: 158.93, electronConfig: '[Xe] 4f⁹ 6s²', density: 8.23, desc: 'Fósforos verdes brillantes.' },
      { number: 66, symbol: 'Dy', name: 'Disprosio', category: 'lanthanide', mass: 162.5, electronConfig: '[Xe] 4f¹⁰ 6s²', density: 8.54, desc: 'Reactores y discos duros.' },
      { number: 67, symbol: 'Ho', name: 'Holmio', category: 'lanthanide', mass: 164.93, electronConfig: '[Xe] 4f¹¹ 6s²', density: 8.795, desc: 'Magnetismo muy alto.' },
      { number: 68, symbol: 'Er', name: 'Erbio', category: 'lanthanide', mass: 167.26, electronConfig: '[Xe] 4f¹² 6s²', density: 9.066, desc: 'Filtros para fotografía.' },
      { number: 69, symbol: 'Tm', name: 'Tulio', category: 'lanthanide', mass: 168.93, electronConfig: '[Xe] 4f¹³ 6s²', density: 9.321, desc: 'Equipos rayos X miniatura.' },
      { number: 70, symbol: 'Yb', name: 'Iterbio', category: 'lanthanide', mass: 173.05, electronConfig: '[Xe] 4f¹⁴ 6s²', density: 6.9, desc: 'Dopaje en láseres.' },
      { number: 71, symbol: 'Lu', name: 'Lutecio', category: 'lanthanide', mass: 174.97, electronConfig: '[Xe] 4f¹⁴ 5d¹ 6s²', density: 9.841, desc: 'Detección de meteoritos.' },
      { number: 72, symbol: 'Hf', name: 'Hafnio', category: 'transition', mass: 178.49, electronConfig: '[Xe] 4f¹⁴ 5d² 6s²', density: 13.31, desc: 'Lámparas de filamento.' },
      { number: 73, symbol: 'Ta', name: 'Tantalio', category: 'transition', mass: 180.95, electronConfig: '[Xe] 4f¹⁴ 5d³ 6s²', density: 16.69, desc: 'Capacitores en móviles.' },
      { number: 74, symbol: 'W', name: 'Wolframio', category: 'transition', mass: 183.84, electronConfig: '[Xe] 4f¹⁴ 5d⁴ 6s²', density: 19.25, desc: 'Dureza máxima.' },
      { number: 75, symbol: 'Re', name: 'Renio', category: 'transition', mass: 186.21, electronConfig: '[Xe] 4f¹⁴ 5d⁵ 6s²', density: 21.02, desc: 'Turbinas de aviones.' },
      { number: 76, symbol: 'Os', name: 'Osmio', category: 'transition', mass: 190.23, electronConfig: '[Xe] 4f¹⁴ 5d⁶ 6s²', density: 22.59, desc: 'El más denso de todos.' },
      { number: 77, symbol: 'Ir', name: 'Iridio', category: 'transition', mass: 192.22, electronConfig: '[Xe] 4f¹⁴ 5d⁷ 6s²', density: 22.56, desc: 'Muy resistente al calor.' },
      { number: 78, symbol: 'Pt', name: 'Platino', category: 'transition', mass: 195.08, electronConfig: '[Xe] 4f¹⁴ 5d⁹ 6s¹', density: 21.45, desc: 'Metal noble catalizador.' },
      { number: 79, symbol: 'Au', name: 'Oro', category: 'transition', mass: 196.97, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', density: 19.3, desc: 'Precioso e inalterable.' },
      { number: 80, symbol: 'Hg', name: 'Mercurio', category: 'transition', mass: 200.59, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', density: 13.534, desc: 'Metal líquido plateado.' },
      { number: 81, symbol: 'Tl', name: 'Talio', category: 'post-transition', mass: 204.38, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', density: 11.85, desc: 'Altamente tóxico.' },
      { number: 82, symbol: 'Pb', name: 'Plomo', category: 'post-transition', mass: 207.2, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', density: 11.34, desc: 'Protección contra rayos X.' },
      { number: 83, symbol: 'Bi', name: 'Bismuto', category: 'post-transition', mass: 208.98, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', density: 9.78, desc: 'Bajo punto de fusión.' },
      { number: 84, symbol: 'Po', name: 'Polonio', category: 'post-transition', mass: 209, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', density: 9.196, desc: 'Fuertemente radiactivo.' },
      { number: 85, symbol: 'At', name: 'Astato', category: 'metalloid', mass: 210, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', density: 7, desc: 'Extremadamente raro.' },
      { number: 86, symbol: 'Rn', name: 'Radón', category: 'noble', mass: 222, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', density: 0.00973, desc: 'Gas radiactivo pesado.' },
      { number: 87, symbol: 'Fr', name: 'Francio', category: 'alkali', mass: 223, electronConfig: '[Rn] 7s¹', density: 1.87, desc: 'El menos estable de todos.' },
      { number: 88, symbol: 'Ra', name: 'Radio', category: 'alkaline-earth', mass: 226, electronConfig: '[Rn] 7s²', density: 5.5, desc: 'Brilla con luz propia.' },
      { number: 89, symbol: 'Ac', name: 'Actinio', category: 'actinide', mass: 227, electronConfig: '[Rn] 6d¹ 7s²', density: 10, desc: 'Brillo azul radiactivo.' },
      { number: 90, symbol: 'Th', name: 'Torio', category: 'actinide', mass: 232.04, electronConfig: '[Rn] 6d² 7s²', density: 11.724, desc: 'Posible fuente nuclear.' },
      { number: 91, symbol: 'Pa', name: 'Protactinio', category: 'actinide', mass: 231.04, electronConfig: '[Rn] 5f² 6d¹ 7s²', density: 15.37, desc: 'Metal denso radiactivo.' },
      { number: 92, symbol: 'U', name: 'Uranio', category: 'actinide', mass: 238.03, electronConfig: '[Rn] 5f³ 6d¹ 7s²', density: 19.05, desc: 'Energía nuclear concentrada.' },
      { number: 93, symbol: 'Np', name: 'Neptunio', category: 'actinide', mass: 237, electronConfig: '[Rn] 5f⁴ 6d¹ 7s²', density: 20.45, desc: 'En residuos nucleares.' },
      { number: 94, symbol: 'Pu', name: 'Plutonio', category: 'actinide', mass: 244, electronConfig: '[Rn] 5f⁶ 7s²', density: 19.816, desc: 'Armas y energía espacial.' },
      { number: 95, symbol: 'Am', name: 'Americio', category: 'actinide', mass: 243, electronConfig: '[Rn] 5f⁷ 7s²', density: 13.67, desc: 'Detector de humo.' },
      { number: 96, symbol: 'Cm', name: 'Curio', category: 'actinide', mass: 247, electronConfig: '[Rn] 5f⁷ 6d¹ 7s²', density: 13.51, desc: 'Llamado por los Curie.' },
      { number: 97, symbol: 'Bk', name: 'Berkelio', category: 'actinide', mass: 247, electronConfig: '[Rn] 5f⁹ 7s²', density: 14.78, desc: 'Hallado en Berkeley.' },
      { number: 98, symbol: 'Cf', name: 'Californio', category: 'actinide', mass: 251, electronConfig: '[Rn] 5f¹⁰ 7s²', density: 15.1, desc: 'Emisor de neutrones.' },
      { number: 99, symbol: 'Es', name: 'Einstenio', category: 'actinide', mass: 252, electronConfig: '[Rn] 5f¹¹ 7s²', density: 8.84, desc: 'Hallado en pruebas Bravo.' },
      { number: 100, symbol: 'Fm', name: 'Fermio', category: 'actinide', mass: 257, electronConfig: '[Rn] 5f¹² 7s²', density: 9.7, desc: 'Muy radiactivo.' },
      { number: 101, symbol: 'Md', name: 'Mendelevio', category: 'actinide', mass: 258, electronConfig: '[Rn] 5f¹³ 7s²', density: 10.3, desc: 'Sintetizado átomo a átomo.' },
      { number: 102, symbol: 'No', name: 'Nobelio', category: 'actinide', mass: 259, electronConfig: '[Rn] 5f¹⁴ 7s²', density: 9.9, desc: 'Llamado por Alfred Nobel.' },
      { number: 103, symbol: 'Lr', name: 'Lawrencio', category: 'actinide', mass: 262, electronConfig: '[Rn] 5f¹⁴ 6d¹ 7s²', density: 15.6, desc: 'Ciclotrones pesados.' },
      { number: 104, symbol: 'Rf', name: 'Rutherfordio', category: 'transition', mass: 267, electronConfig: '[Rn] 5f¹⁴ 6d² 7s²', density: 23.2, desc: 'Primer transactinido.' },
      { number: 105, symbol: 'Db', name: 'Dubnio', category: 'transition', mass: 268, electronConfig: '[Rn] 5f¹⁴ 6d³ 7s²', density: 29.3, desc: 'Laboratorio Flerov.' },
      { number: 106, symbol: 'Sg', name: 'Seaborgio', category: 'transition', mass: 269, electronConfig: '[Rn] 5f¹⁴ 6d⁴ 7s²', density: 35, desc: 'Nombrado en vida del autor.' },
      { number: 107, symbol: 'Bh', name: 'Bohrio', category: 'transition', mass: 270, electronConfig: '[Rn] 5f¹⁴ 6d⁵ 7s²', density: 37, desc: 'Modelo atómico Bohr.' },
      { number: 108, symbol: 'Hs', name: 'Hasio', category: 'transition', mass: 269, electronConfig: '[Rn] 5f¹⁴ 6d⁶ 7s²', density: 41, desc: 'Estado alemán Hesse.' },
      { number: 109, symbol: 'Mt', name: 'Meitnerio', category: 'transition', mass: 278, electronConfig: '[Rn] 5f¹⁴ 6d⁷ 7s²', density: 37.4, desc: 'Científica Lise Meitner.' },
      { number: 110, symbol: 'Ds', name: 'Darmstadtio', category: 'transition', mass: 281, electronConfig: '[Rn] 5f¹⁴ 6d⁸ 7s²', density: 34.8, desc: 'Descubierto en GSI.' },
      { number: 111, symbol: 'Rg', name: 'Roentgenio', category: 'transition', mass: 282, electronConfig: '[Rn] 5f¹⁴ 6d⁹ 7s²', density: 28.7, desc: 'Rayos X Roentgen.' },
      { number: 112, symbol: 'Cn', name: 'Copernicio', category: 'transition', mass: 285, electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', density: 23.7, desc: 'Astrónomo Copérnico.' },
      { number: 113, symbol: 'Nh', name: 'Nihonio', category: 'post-transition', mass: 286, electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', density: 16, desc: 'Japón (Nihon).' },
      { number: 114, symbol: 'Fl', name: 'Flerovio', category: 'post-transition', mass: 289, electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', density: 14, desc: 'Isla de estabilidad.' },
      { number: 115, symbol: 'Mc', name: 'Moscovio', category: 'post-transition', mass: 290, electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', density: 13.5, desc: 'Región de Moscú.' },
      { number: 116, symbol: 'Lv', name: 'Livermorio', category: 'post-transition', mass: 293, electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', density: 12.9, desc: 'Lab Lawrence Livermore.' },
      { number: 117, symbol: 'Ts', name: 'Teneso', category: 'unknown', mass: 294, electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', density: 7.2, desc: 'Nombre por Tennessee.' },
      { number: 118, symbol: 'Og', name: 'Oganesón', category: 'unknown', mass: 294, electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', density: 5, desc: 'Final de la tabla.' }
  ];
}