import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('renders blog\'s content', () => {
  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'test author',
      likes: 5,
      url: 'url-test.com'
    }

    render(<Blog blog={blog} />)
  })
  test('renders title and author', () => {
    const element = screen.getByText('test title test author')
    expect(element).toBeVisible()
  })

  test('doesnt render likes', () => {
    const element = screen.getByText('5', { exact: false })
    expect(element).not.toBeVisible()
  })

  test('doesnt render url', () => {
    const element = screen.getByText('url-test.com')
    expect(element).not.toBeVisible()
  })
})

describe('clicking the button view displays the url and likes', () => {
  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'test author',
      likes: 5,
      url: 'url-test.com'
    }

    render(<Blog blog={blog} />)
  })
  test('renders likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('5', { exact: false })
    expect(element).toBeVisible()
  })

  test('renders url', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('url-test.com')
    expect(element).toBeVisible()
  })
})

describe('clicking the likes button', () => {

  test('if likes clicked twice the hadler will also be executed twice', async () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      likes: 5,
      url: 'url-test.com'
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} updateBlog={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})
