import { Professor } from '../professor/professor';
import { Turma } from '../turma/turma'; // assuming this exists

export class Chamada {
  id!: number;
  professor!: Professor;
  turma!: Turma;
  createdAt!: Date;
  updatedAt?: Date;
  qtdAlunos?: number;
  qtdQrs?: number;
  status?: number;
  intervaloQr?: number;
}
