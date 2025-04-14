import { Aluno } from '../aluno/aluno';
import { Professor } from '../professor/professor';

export class Turma {
  id!: number;
  professorResponsavel!: Professor;
  alunos!: Aluno[];
  ano!: string;
  semestre!: string;
  qtdAlunos!: number;
  curso!: string;
}
