import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

const secret = 'secret'
const expiresIn = 43200
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret, expiresIn)
}

describe('Jwt Adapter', () => {
  test('Should call jwt sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any_id')

    expect(signSpy).toHaveBeenCalledWith(
      { id: 'any_id' },
      secret,
      { expiresIn }
    )
  })
})
