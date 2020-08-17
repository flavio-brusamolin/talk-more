import { LoadPlans } from '../../../domain/use-cases/load-plans'
import { Plan } from '../../../domain/models/plan'
import { LoadPlansRepository } from '../../protocols'

export class DbLoadPlans implements LoadPlans {
  public constructor (private readonly loadPlansRepository: LoadPlansRepository) {}

  public async load (): Promise<Plan[]> {
    return await this.loadPlansRepository.loadAll()
  }
}
