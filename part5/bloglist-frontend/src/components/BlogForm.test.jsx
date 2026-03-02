import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> form calls onSubmit with the rigth details', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('write title here')
  const inputAuthor = screen.getByPlaceholderText('write author here')
  const inputUrl = screen.getByPlaceholderText('write url here')

  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'testing a title')
  await user.type(inputAuthor, 'testing an author')
  await user.type(inputUrl, 'testing an url')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing an author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing an url')
})
