import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 5,
    url: 'url-test.com'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('test title test author')
  expect(element).toBeVisible()
})

test('doesnt render likes', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 5,
    url: 'url-test.com'
  }

  render(<Blog blog={blog} />)
  screen.debug()

  const element = screen.getByText('5', { exact: false })
  expect(element).not.toBeVisible()
})

test('doesnt render url', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 5,
    url: 'url-test.com'
  }

  render(<Blog blog={blog} />)
  screen.debug()

  const element = screen.getByText('url-test.com')
  expect(element).not.toBeVisible()
})