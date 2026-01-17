import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DragDropModule, CdkDragDrop, copyArrayItem } 
from '@angular/cdk/drag-drop';

interface Atom {
  symbol: string;
  name: string;
  charge: string;
  electronegativity: number;
  type: 'metal' | 'non-metal';
}

@Component({
  selector: 'app-molecular-bond',
  imports: [
    RouterLink,
    CommonModule, 
    DragDropModule
  ],
  templateUrl: './molecular-bond.html',
  styleUrl: './molecular-bond.css',
})
export class MolecularBond {
  // Catálogo de elementos disponibles
  availableAtoms: Atom[] = [
    { symbol: 'Na', name: 'Sodio', charge: '+1', electronegativity: 0.9, type: 'metal' },
    { symbol: 'Mg', name: 'Magnesio', charge: '+2', electronegativity: 1.2, type: 'metal' },
    { symbol: 'Cl', name: 'Cloro', charge: '-1', electronegativity: 3.0, type: 'non-metal' },
    { symbol: 'O', name: 'Oxígeno', charge: '-2', electronegativity: 3.5, type: 'non-metal' },
    { symbol: 'F', name: 'Flúor', charge: '-1', electronegativity: 4.0, type: 'non-metal' }
  ];

  // Átomos activos en el simulador (máximo 2 para el ejemplo)
  workspaceAtoms: Atom[] = [];

  drop(event: CdkDragDrop<Atom[]>) {
    // Si el elemento viene de la lista de abajo y el espacio no está lleno
    if (event.previousContainer !== event.container && this.workspaceAtoms.length < 2) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.currentIndex,
        event.container.data.length // Añadir al final
      );
    }
  }

  get deltaE(): number {
    if (this.workspaceAtoms.length < 2) return 0;
    return Math.abs(this.workspaceAtoms[0].electronegativity - this.workspaceAtoms[1].electronegativity);
  }

  get bondType(): string {
    const diff = this.deltaE;
    if (diff >= 1.7) return 'Iónico';
    if (diff > 0.4) return 'Covalente Polar';
    return 'Covalente No Polar';
  }

  clearWorkspace() {
    this.workspaceAtoms = [];
  }
}