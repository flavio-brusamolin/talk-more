import { DbAddUser } from './db-add-user'
import { AddUserModel } from '../../../domain/use-cases/add-user'
import { Hasher } from '../../protocols/hasher'

const makeFakeUserData = (): AddUserModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    public async hash (_value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new HasherStub()
}

interface SutTypes {
  hasherStub: Hasher
  sut: DbAddUser
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const sut = new DbAddUser(hasherStub)

  return {
    hasherStub,
    sut
  }
}

describe('DbAddUser Use Case', () => {
  test('Should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')

    const userData = makeFakeUserData()
    await sut.add(userData)

    expect(hashSpy).toHaveBeenCalledWith(userData.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const userData = makeFakeUserData()
    const promise = sut.add(userData)

    await expect(promise).rejects.toThrow()
  })
})
