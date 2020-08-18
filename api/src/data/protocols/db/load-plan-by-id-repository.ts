import { Plan } from '../../../domain/models/plan'

export interface LoadPlanByIdRepository {
  loadById: (id: string) => Promise<Plan>
}
