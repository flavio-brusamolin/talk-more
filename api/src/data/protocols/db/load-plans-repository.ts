import { Plan } from '../../../domain/models/plan'

export interface LoadPlansRepository {
  loadAll: () => Promise<Plan[]>
}
