import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const api = axios.create({ baseURL: 'http://localhost:5000/api/users' })

function App() {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchUsers() {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.get('/')
      setUsers(data)
    } catch (e) {
      setError(e.response?.data?.error || e.message || 'Error loading users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim() || !email.trim()) {
      setError('Username and email are required')
      return
    }
    setError('')
    try {
      const payload = { username: username.trim(), email: email.trim() }
      if (editingId) {
        await api.put(`/${editingId}`, payload)
        setEditingId(null)
      } else {
        await api.post('/', payload)
      }
      await fetchUsers()
      setUsername('')
      setEmail('')
    } catch (e) {
      setError(e.response?.data?.error || e.message || 'Request failed')
    }
  }

  function startEdit(user) {
    setEditingId(user.id)
    setUsername(user.username)
    setEmail(user.email)
  }

  function cancelEdit() {
    setEditingId(null)
    setUsername('')
    setEmail('')
  }

  async function handleDelete(id) {
    if (!confirm('Delete this user?')) return
    setError('')
    try {
      await api.delete(`/${id}`)
      if (editingId === id) cancelEdit()
      await fetchUsers()
    } catch (e) {
      setError(e.response?.data?.error || e.message || 'Delete failed')
    }
  }

  return (
    <div className="app">
      <h1>User CRUD</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="form-actions">
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && (
            <button type="button" onClick={cancelEdit}>Cancel</button>
          )}
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <button type="button" onClick={() => startEdit(u)}>Edit</button>
                  <button type="button" onClick={() => handleDelete(u.id)} className="delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && users.length === 0 && <p className="empty">No users yet. Add one above.</p>}
    </div>
  )
}

export default App
