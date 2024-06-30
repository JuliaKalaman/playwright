import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { RegistrationForm } from './RegistrationForm';

export class HomePage extends BasePage {

    protected readonly _header: Locator
    protected readonly _signInButton: Locator
    protected readonly _modal: Locator
    protected readonly _registrationButton: Locator

    constructor(page: Page) {
        super(page, '/')
        this._header = this._page.locator('.header')
        this._signInButton = this._header.getByRole('button', { name: 'sign in' })
        this._modal = this._page.locator('.modal-content')
        this._registrationButton = this._modal.getByRole('button', { name: 'registration' })
    }

    async openRegistrationForm() {
        await this._signInButton.click()
        await this._registrationButton.click()
        return new RegistrationForm(this._modal)
    }
}