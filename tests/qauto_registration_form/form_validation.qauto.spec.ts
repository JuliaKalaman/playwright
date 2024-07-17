import { test, expect } from '@playwright/test'
import { HomePage } from '../../src/pages/HomePage'
import { RegistrationForm } from '../../src/pages/RegistrationForm'

test.describe('Check registration form', () => {

    let registrationForm: RegistrationForm

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.navigate()
        registrationForm = await homePage.openRegistrationForm()
    })

    test('Registration positive test', async () => {
        await registrationForm.inputName.fill('Ben')
        await registrationForm.inputLastName.fill('Affleck')
        await registrationForm.inputEmail.fill('aqa-affleck@test.com')
        await registrationForm.inputPassword.pressSequentially('1234!Qwerty$%', { delay: 100 })
        await registrationForm.inputReEnterPassword.pressSequentially('1234!Qwerty$%')
        await registrationForm.registerButton.click()
    })

    test('Empty fields, negative test 1', async () => {
        await registrationForm.inputName.click()
        await registrationForm.inputLastName.click()
        await expect.soft(registrationForm.modal.getByText('Name required'), 'Name required').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Name required'), 'Name required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(registrationForm.inputName, 'Name field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await registrationForm.inputEmail.click()
        await expect.soft(registrationForm.modal.getByText('Last name required'), 'Last name required').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Last name required'), 'Last name required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(registrationForm.inputLastName, 'Last name field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await registrationForm.inputPassword.click()
        await expect.soft(registrationForm.modal.getByText('Email required'), 'Email required').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Email required'), 'Email required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(registrationForm.inputEmail, 'Email required field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await registrationForm.inputReEnterPassword.click()
        await expect.soft(registrationForm.modal.getByText('Password required'), 'Password required').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Password required'), 'Password required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(registrationForm.inputPassword, 'Password required field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await registrationForm.inputReEnterPassword.blur()
        await expect.soft(registrationForm.modal.getByText('Re-enter password required'), 'Re-enter password required').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Re-enter password required'), 'Re-enter password required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(registrationForm.inputReEnterPassword, 'Re-enter password required field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect.soft(registrationForm.modal).toHaveScreenshot('sign-in-modal.png')
    })

    test('Field Name: wrong data & wrong length, negative test 2', async () => {
        await registrationForm.inputName.fill('8*#John')
        await registrationForm.inputName.blur()
        await expect.soft(registrationForm.modal.getByText('Name is invalid'), 'Name is invalid').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Name is invalid'), 'Red text: "Name is invalid"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await registrationForm.inputName.clear()
        await registrationForm.inputName.fill('John ')
        await registrationForm.inputName.blur()
        await expect.soft(registrationForm.modal.getByText('Name is invalid'), 'Name is invalid').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Name is invalid'), 'Red text: "Name is invalid"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await registrationForm.inputName.clear()
        await registrationForm.inputName.fill('J')
        await registrationForm.inputName.blur()
        await expect.soft(registrationForm.modal.getByText('Name has to be from 2 to 20 characters long'), 'Name has to be from 2 to 20 characters long').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Name has to be from 2 to 20 characters long'), 'Red text: "Name has to be from 2 to 20 characters long"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await registrationForm.inputName.clear()
        await registrationForm.inputName.fill('Johnjohnjohnjohnjohnj')
        await registrationForm.inputName.blur()
        await expect.soft(registrationForm.modal.getByText('Name has to be from 2 to 20 characters long'), 'Name has to be from 2 to 20 characters long').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Name has to be from 2 to 20 characters long'), 'Red text: "Name has to be from 2 to 20 characters long"').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Last name: wrong data & wrong length, negative test 3', async () => {
        await registrationForm.inputLastName.fill('8*#Deere')
        await registrationForm.inputLastName.blur()
        await expect.soft(registrationForm.modal.getByText('Last name is invalid'), 'Last name is invalid').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Last name is invalid'), 'Red text: "Last name is invalid"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await registrationForm.inputLastName.clear()
        await registrationForm.inputLastName.fill('Deere ')
        await registrationForm.inputLastName.blur()
        await expect.soft(registrationForm.modal.getByText('Last name is invalid'), 'Last name is invalid').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Last name is invalid'), 'Red text: "Last name is invalid"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await registrationForm.inputLastName.clear()
        await registrationForm.inputLastName.fill('D')
        await registrationForm.inputLastName.blur()
        await expect.soft(registrationForm.modal.getByText('Last name has to be from 2 to 20 characters long'), 'Last name has to be from 2 to 20 characters long').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Last name has to be from 2 to 20 characters long'), 'Red text: "Last name has to be from 2 to 20 characters long"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await registrationForm.inputLastName.clear()
        await registrationForm.inputLastName.fill('Deeredeeredeeredeered')
        await registrationForm.inputLastName.blur()
        await expect.soft(registrationForm.modal.getByText('Last name has to be from 2 to 20 characters long'), 'Last name has to be from 2 to 20 characters long').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Last name has to be from 2 to 20 characters long'), 'Red text: "Last name has to be from 2 to 20 characters long"').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Email: wrong data, negative test 4', async () => {
        await registrationForm.inputEmail.fill('aqa-deeretest.com')
        await registrationForm.inputEmail.blur()
        await expect.soft(registrationForm.modal.getByText('Email is incorrect'), 'Email is incorrect').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Email is incorrect'), 'Red text: "Email is incorrect"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await registrationForm.inputEmail.clear()
        await registrationForm.inputEmail.fill('aqa-deere@test')
        await registrationForm.inputEmail.blur()
        await expect.soft(registrationForm.modal.getByText('Email is incorrect'), 'Email is incorrect').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Email is incorrect'), 'Red text: "Email is incorrect"').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Password: wrong data, negative test 5', async () => {
        await registrationForm.inputPassword.fill('qwerty')
        await registrationForm.inputPassword.blur()
        await expect.soft(registrationForm.modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Password < 8 symbols').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Red text when Password < 8 symbols').toHaveCSS('color', 'rgb(220, 53, 69)')

        await registrationForm.inputPassword.clear()
        await registrationForm.inputPassword.fill('Qwerty8qwertyqwe')
        await registrationForm.inputPassword.blur()
        await expect.soft(registrationForm.modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Password > 15 symbols').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Red text when Password > 15 symbols').toHaveCSS('color', 'rgb(220, 53, 69)')


        await registrationForm.inputPassword.clear()
        await registrationForm.inputPassword.fill('Qwertyqwertyqw')
        await registrationForm.inputPassword.blur()
        await expect.soft(registrationForm.modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Password without integer').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Red text when Password without integer').toHaveCSS('color', 'rgb(220, 53, 69)')

        await registrationForm.inputPassword.clear()
        await registrationForm.inputPassword.fill('5wertyqwertyqw')
        await registrationForm.inputPassword.blur()
        await expect.soft(registrationForm.modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Password without capital letter').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Red text when Password without capital letter').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Re-enter password: Passwords do nor match, negative test 6', async () => {
        await registrationForm.inputPassword.fill('44QwertyQwerty')
        await registrationForm.inputReEnterPassword.fill('4QwertyQwerty')
        await registrationForm.inputReEnterPassword.blur()
        await expect.soft(registrationForm.modal.getByText('Passwords do not match'), 'Passwords do not match').toBeVisible()
        await expect.soft(registrationForm.modal.getByText('Passwords do not match'), 'Red text when Passwords do not match').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Register button is disabled, negative test 7', async () => {
        await registrationForm.inputName.fill('John')
        await registrationForm.inputLastName.fill('Deere')
        await registrationForm.inputEmail.click()
        await registrationForm.inputPassword.fill('44QwertyQwerty')
        await registrationForm.inputReEnterPassword.fill('44QwertyQwerty')
        await expect.soft(registrationForm.registerButton).toBeDisabled()
    })

})