import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach } from 'vitest'

describe('', () => {
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
