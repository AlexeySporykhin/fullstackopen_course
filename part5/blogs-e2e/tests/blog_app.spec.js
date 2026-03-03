const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'alexsp',
        name: 'Alexey Sp',
        password: 'test'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'alexsp', 'test')

      await expect(page.getByText('Alexey Sp logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'alexsp', 'wrong')

      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'alexsp', 'test')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'Test title',
        author: 'Test author',
        url: 'http://test.com'
      })

      await expect(page.getByText('Test title Test author')).toBeVisible()
    })
  })

  describe('When created a blog', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'alexsp', 'test')
      await createBlog(page, {
        title: 'Test title',
        author: 'Test author',
        url: 'http://test.com'
      })
    })

    test('it can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('it can be removed by the creator', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Remove blog Test title by Test author?'); // Optional: Assert the message
        await dialog.accept(); // Click 'OK'
      });

      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Test title Test author')).not.toBeVisible()
    })
  })
})
