import { CreateContractController, CreateContractModel } from './create-contract-controller'
import { HttpRequest, Validator } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { SubscribePlan, SubscribePlanModel } from '../../../domain/use-cases/subscribe-plan'

const makeFakeRequest = (): HttpRequest<CreateContractModel> => ({
  body: {
    planId: 'any_plan_id'
  },
  userId: 'any_user_id'
})

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    public validate (_input: any): Error {
      return null
    }
  }

  return new ValidatorStub()
}

const makeSubscribePlan = (): SubscribePlan => {
  class SubscribePlanStub implements SubscribePlan {
    public async subscribe (_subscriptionData: SubscribePlanModel): Promise<void> {}
  }

  return new SubscribePlanStub()
}

interface SutTypes {
  validatorStub: Validator
  subscribePlanStub: SubscribePlan
  sut: CreateContractController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const subscribePlanStub = makeSubscribePlan()
  const sut = new CreateContractController(validatorStub, subscribePlanStub)

  return {
    validatorStub,
    subscribePlanStub,
    sut
  }
}

describe('CreateContract Controller', () => {
  test('Should call Validator with correct value', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return a bad request error if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call SubscribePlan with correct values', async () => {
    const { sut, subscribePlanStub } = makeSut()
    const subscribeSpy = jest.spyOn(subscribePlanStub, 'subscribe')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(subscribeSpy).toHaveBeenCalledWith({
      userId: 'any_user_id',
      planId: 'any_plan_id'
    })
  })
})
