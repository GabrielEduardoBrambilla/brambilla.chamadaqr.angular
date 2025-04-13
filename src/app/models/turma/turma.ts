import { Professor } from '../professor/professor';

export class Turma {
  id!: number;
  professorResponsavel!: Professor;
  ano!: string;
  semestre!: string;
  qtdAlunos!: number;
  curso!: string;
}
