import { Encrypter } from '../../../data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  public constructor (
    private readonly secret: string,
    private readonly expiresIn: number
  ) {}

  public async encrypt (plaintext: string): Promise<string> {
    jwt.sign(
      { id: plaintext },
      this.secret,
      { expiresIn: this.expiresIn }
    )

    return null
  }
}
