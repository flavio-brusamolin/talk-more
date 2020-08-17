import { DbCheckUserAuthentication } from './db-check-user-authentication'
import { Decrypter } from '../../protocols'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    public async decrypt (_ciphertext: string): Promise<string> {
      return 'any_id'
    }
  }

  return new DecrypterStub()
}

interface SutTypes {
  decrypterStub: Decrypter
  sut: DbCheckUserAuthentication
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbCheckUserAuthentication(decrypterStub)

  return {
    decrypterStub,
    sut
  }
}

describe('DbCheckUserAuthentication Use Case', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.checkAuthentication('any_token')

    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
