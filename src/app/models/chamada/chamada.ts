import { Professor } from '../professor/professor';

export class Chamada {
  id!: number;
  professorResponsavel!: Professor;
  ano!: string;
  semestre!: string;
  qtdAlunos!: number;
  dataChamada!: Date;
  curso!: string;
}
