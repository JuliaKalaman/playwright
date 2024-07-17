import { test, expect } from '@playwright/test'
import { users } from '../../src/credentials'

test.describe('Garage API tests with auth in BeforeEach', () => {
    test.beforeEach(async ({ request }) => {

        // console.log(await request.storageState())

        const authRequest = await request.post('/api/auth/signin', {
            data: {
                "email": users.julia.email,
                "password": users.julia.password,
                "remember": true,
            }
        })
    })

    test('Creating car with Playwright request. Positive test', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                "carBrandId": 2,
                "carModelId": 6,
                "mileage": 12345
            }
        })
        // console.log(await request.storageState())

        expect(createResponse.ok()).toBeTruthy()

        const createResponseBody = await createResponse.json()

        expect(createResponseBody.status).toBe('ok')

        const carId = createResponseBody.data.id
        expect(carId).toBeDefined()

        const getResponse = await request.get(`/api/cars/${carId}`)
        expect(getResponse.ok()).toBeTruthy()

        const getCarBody = await getResponse.json()

        expect(getCarBody.data).toEqual(expect.objectContaining({
            id: carId,
            carBrandId: 2,
            carModelId: 6,
            mileage: 12345
        }))
        // console.log(getCarBody.data)
    })

    test('Creating car with an incorrect Brand ID. Negative test 1', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                "carBrandId": 200,
                "carModelId": 6,
                "mileage": 12345
            }
        })

        const createResponseBody = await createResponse.json()
        expect(createResponseBody.status).toBe('error')
        expect(createResponseBody.message).toBe('Brand not found')
        // console.log(createResponseBody)
    })

    test('Creating car with an incorrect Model ID. Negative test 2', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                "carBrandId": 2,
                "carModelId": 600,
                "mileage": 12345
            }
        })

        const createResponseBody = await createResponse.json()
        expect(createResponseBody.status).toBe('error')
        expect(createResponseBody.message).toBe('Model not found')
        // console.log(createResponseBody)
    })

    test('Creating car with an incorrect mileage. Negative test 3', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                "carBrandId": 2,
                "carModelId": 6,
                "mileage": 123456789
            }
        })

        const createResponseBody = await createResponse.json()
        expect(createResponseBody.status).toBe('error')
        expect(createResponseBody.message).toBe('Mileage has to be from 0 to 999999')
        // console.log(createResponseBody)
    })
})