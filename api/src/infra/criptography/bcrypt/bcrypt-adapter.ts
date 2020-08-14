import { Hasher, HashComparator } from '../../../data/protocols'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Hasher, HashComparator {
  public constructor (private readonly salt: number) {}

  public async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  public async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
