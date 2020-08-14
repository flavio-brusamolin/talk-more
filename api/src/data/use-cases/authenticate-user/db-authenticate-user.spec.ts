import { DbAuthenticateUser } from './db-authenticate-user'
import { AuthenticateUserModel } from '../../../domain/use-cases/authenticate-user'
import { User } from '../../../domain/models/user'
import { LoadUserByEmailRepository, HashComparator, Encrypter } from '../../protocols'

const makeFakeCredentials = (): AuthenticateUserModel => ({
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeUser = (): User => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    public async loadByEmail (_email: string): Promise<User> {
      return makeFakeUser()
    }
  }

  return new LoadUserByEmailRepositoryStub()
}

const makeHashComparator = (): HashComparator => {
  class HashComparatorStub implements HashComparator {
    public async compare (_value: string, _hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparatorStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    public async encrypt (_plaintext: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hashComparatorStub: HashComparator
  encrypterStub: Encrypter
  sut: DbAuthenticateUser
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepository()
  const hashComparatorStub = makeHashComparator()
  const encrypterStub = makeEncrypter()
  const sut = new DbAuthenticateUser(loadUserByEmailRepositoryStub, hashComparatorStub, encrypterStub)

  return {
    loadUserByEmailRepositoryStub,
    hashComparatorStub,
    encrypterStub,
    sut
  }
}

describe('DbAuthenticateUser Use Case', () => {
  test('Should call LoadUserByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')

    const credentials = makeFakeCredentials()
    await sut.authenticate(credentials)

    expect(loadByEmailSpy).toHaveBeenCalledWith(credentials.email)
  })

  test('Should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    const credentials = makeFakeCredentials()
    const promise = sut.authenticate(credentials)

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)

    const credentials = makeFakeCredentials()
    const accessToken = await sut.authenticate(credentials)

    expect(accessToken).toBeNull()
  })

  test('Should call HashComparator with correct values', async () => {
    const { sut, hashComparatorStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparatorStub, 'compare')

    const credentials = makeFakeCredentials()
    await sut.authenticate(credentials)

    expect(compareSpy).toHaveBeenCalledWith(credentials.password, 'hashed_password')
  })

  test('Should throw if HashComparator throws', async () => {
    const { sut, hashComparatorStub } = makeSut()
    jest.spyOn(hashComparatorStub, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })

    const credentials = makeFakeCredentials()
    const promise = sut.authenticate(credentials)

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparator returns false', async () => {
    const { sut, hashComparatorStub } = makeSut()
    jest.spyOn(hashComparatorStub, 'compare').mockReturnValueOnce(Promise.resolve(false))

    const credentials = makeFakeCredentials()
    const accessToken = await sut.authenticate(credentials)

    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const credentials = makeFakeCredentials()
    await sut.authenticate(credentials)

    expect(encryptSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw new Error()
    })

    const credentials = makeFakeCredentials()
    const promise = sut.authenticate(credentials)

    await expect(promise).rejects.toThrow()
  })

  test('Should return a accessToken on success', async () => {
    const { sut } = makeSut()

    const credentials = makeFakeCredentials()
    const accessToken = await sut.authenticate(credentials)

    expect(accessToken).toBe('any_token')
  })
})
