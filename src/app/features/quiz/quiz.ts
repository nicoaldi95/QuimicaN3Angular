import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
selectedOption = signal<number | null>(null);
  showFeedback = signal(false);

  selectOption(val: number) {
    if (this.showFeedback()) return;
    this.selectedOption.set(val);
    
    // Simulación de lógica de respuesta correcta (7 es el valor correcto)
    if (val === 7) {
      setTimeout(() => {
        this.showFeedback.set(true);
      }, 500);
    }
  }

  getOptionClass(val: number): string {
    if (this.selectedOption() === val) {
        if (val === 7 && this.showFeedback()) {
          return 'bg-primary/20 border-primary shadow-glow';
        }
        return 'bg-card-dark border-primary shadow-glow';
    }
    return 'bg-bg-dark/40 border-white/10 hover:border-white/30';
  }
  
}
