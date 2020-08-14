import { Hasher } from '../../../data/protocols'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Hasher {
  private readonly salt = 12

  public async hash (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)

    return null
  }
}
