import { DbAddUser } from './db-add-user'
import { Hasher, AddUserRepository } from '../../protocols'
import { AddUserModel } from '../../../domain/use-cases/add-user'
import { User } from '../../../domain/models/user'

const makeFakeUserData = (): AddUserModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeUser = (): User => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    public async hash (_value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new HasherStub()
}

const makeAddUserRepository = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    public async add (_userData: AddUserModel): Promise<User> {
      return makeFakeUser()
    }
  }

  return new AddUserRepositoryStub()
}

interface SutTypes {
  hasherStub: Hasher
  addUserRepositoryStub: AddUserRepository
  sut: DbAddUser
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addUserRepositoryStub = makeAddUserRepository()
  const sut = new DbAddUser(hasherStub, addUserRepositoryStub)

  return {
    hasherStub,
    addUserRepositoryStub,
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

  test('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')

    const userData = makeFakeUserData()
    await sut.add(userData)

    expect(addSpy).toHaveBeenCalledWith({
      ...userData,
      password: 'hashed_password'
    })
  })

  test('Should throw if AddUserRepository throws', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const userData = makeFakeUserData()
    const promise = sut.add(userData)

    await expect(promise).rejects.toThrow()
  })
})
