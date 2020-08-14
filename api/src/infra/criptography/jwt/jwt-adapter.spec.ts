import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  }
}))

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

  test('Should throw if jwt sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt('any_id')

    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on jwt sign success', async () => {
    const sut = makeSut()

    const accessToken = await sut.encrypt('any_id')

    expect(accessToken).toBe('any_token')
  })
})
