import { Plan } from '../models/plan'

export interface LoadPlans {
  load: () => Promise<Plan[]>
}
