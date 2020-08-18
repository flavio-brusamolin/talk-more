import { Encrypter, Decrypter } from '../../../data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  public constructor (
    private readonly secret: string,
    private readonly expiresIn: number
  ) {}

  public async encrypt (plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret, { expiresIn: this.expiresIn })
  }

  public async decrypt (ciphertext: string): Promise<string> {
    const { id }: any = jwt.verify(ciphertext, this.secret)
    return id
  }
}
