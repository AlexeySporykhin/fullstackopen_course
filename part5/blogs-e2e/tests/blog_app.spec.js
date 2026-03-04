const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeNewBlog } = require('./helper')

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
        expect(dialog.message()).toContain('Remove blog Test title by Test author?');
        await dialog.accept(); // Click 'OK'
      });

      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Test title Test author')).not.toBeVisible()
    })

    test('it cannot be removed by another user', async ({ page, request }) => {
      await request.post('/api/users', {
        data: {
          username: 'otheruser',
          name: 'Other User',
          password: 'test'
        }
      })

      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'otheruser', 'test')
      await expect(page.getByText('Other User logged in')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })

  test('blogs are ordered according to likes', async ({ page }) => {
    await loginWith(page, 'alexsp', 'test');
    await createBlog(page, {
      title: 'First blog',
      author: 'Author One',
      url: 'http://firstblog.com'
    })
    await createBlog(page, {
      title: 'Second blog',
      author: 'Author Two',
      url: 'http://secondblog.com'
    })
    await createBlog(page, {
      title: 'Third blog',
      author: 'Author Three',
      url: 'http://thirdblog.com'
    })

    const blogElements = page.getByTestId('blog')

    const firstBlogBefore = await blogElements.filter({ hasText: 'First blog Author One' })
    const secondBlogBefore = await blogElements.filter({ hasText: 'Second blog Author Two' })
    const thirdBlogBefore = await blogElements.filter({ hasText: 'Third blog Author Three' })
    
    await likeNewBlog(firstBlogBefore, 1)
    await likeNewBlog(secondBlogBefore, 3)
    await likeNewBlog(thirdBlogBefore, 2)

    const firstBlog = await blogElements.nth(0).innerText()
    const secondBlog = await blogElements.nth(1).innerText()
    const thirdBlog = await blogElements.nth(2).innerText()

    expect(firstBlog).toContain('Second blog Author Two')
    expect(secondBlog).toContain('Third blog Author Three')
    expect(thirdBlog).toContain('First blog Author One')
  })
})