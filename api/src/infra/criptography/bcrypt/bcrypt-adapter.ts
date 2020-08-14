import { Hasher, HashComparator } from '../../../data/protocols'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Hasher, HashComparator {
  private readonly salt = 12

  public async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  public async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)

    return false
  }
}
