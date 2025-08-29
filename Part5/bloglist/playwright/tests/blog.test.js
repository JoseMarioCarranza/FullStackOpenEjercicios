const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'José',
                username: 'Aperta',
                password: '123456'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
    })

    test('Login can fail', async ({ page }) => {
        await loginWith(page, 'Aperta', 'wrong')

        const notificationDiv = await page.locator('.notification')
        await expect(notificationDiv).toContainText('Wrong username or password')
        await expect(notificationDiv).toHaveCSS('border-style', 'solid')
        await expect(notificationDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })

    describe('When you are logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'Aperta', '123456')
        })

        test('You can log in', async ({ page }) => {
            await expect(page.getByText('José logged in')).toBeVisible()
        })

        test('You can post a new blog', async ({ page }) => {
            await page.getByRole('button', { name: 'New blog' }).click()
            await page.locator('input[name="Title"]').fill('title')
            await page.locator('input[name="Author"]').fill('author')
            await page.locator('input[name="Url"]').fill('url')
            await page.getByRole('button', { name: 'create' }).click()

            await expect(page.getByText('a new blog title by author')).toBeVisible()

            await expect(page.getByText('title author', { exact: true })).toBeVisible()
        })
    })
})