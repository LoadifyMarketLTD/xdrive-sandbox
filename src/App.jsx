import React, { useState } from 'react'
import JobCard from './components/JobCard'

const initialJobs = [
  { id: 1, date: 'January 15, 2024', from: 'Liverpool', to: 'London', price: '£250.00' },
  { id: 2, date: 'January 14, 2024', from: 'Glasgow', to: 'Manchester', price: '£275.00' },
  { id: 3, date: 'January 13, 2024', from: 'Oxford', to: 'Birmingham', price: '£200.00' }
]

export default function App() {
  const [jobs] = useState(initialJobs)
  const [form, setForm] = useState({
    pickup: '',
    delivery: '',
    pickupDate: '',
    deliveryDate: '',
    vehicleType: '',
    payment: '',
    reference: '',
    notes: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(s => ({ ...s, [name]: value }))
  }

  function handlePost(e) {
    e.preventDefault()
    alert('Job posted (mock): ' + JSON.stringify(form))
    setForm({
      pickup: '',
      delivery: '',
      pickupDate: '',
      deliveryDate: '',
      vehicleType: '',
      payment: '',
      reference: '',
      notes: ''
    })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">XDRIVE<span>LOGISTICS</span></div>
        <nav className="nav">Dashboard · Jobs · Tracking · Drivers</nav>
      </header>

      <main className="container">
        <section className="left">
          <div className="card profile">
            <div className="avatar" />
            <h3>Daniel Preda</h3>
            <p className="muted">Driver</p>
            <button className="btn primary">Go Offline</button>
          </div>

          <div className="card active-job">
            <h4>Active Job</h4>
            <div>#29345</div>
            <small>Glasgow · 15/12/2023 14:00</small>
            <hr />
            <div>Delivery · Newcastle · 15/12/2023 18:30</div>
          </div>
        </section>

        <section className="main">
          <h2>Jobs</h2>

          <div className="jobs-list">
            {jobs.map(j => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>

          <h2>Live Tracking (mock)</h2>
          <div className="card map-card">
            <div className="map-placeholder">[map & route mock]</div>
            <div className="map-info">
              <div><strong>Assigned to</strong> Daniel Preda</div>
              <div className="addresses">
                <div><strong>Collection</strong><br/>Malvern Road, Birmingham</div>
                <div><strong>Delivery</strong><br/>Baker Street, London</div>
              </div>
              <button className="btn green">REF 1006</button>
            </div>
          </div>

          <h2>Post a Job</h2>
          <form className="card form-card" onSubmit={handlePost}>
            <label>Pickup Location
              <input name="pickup" value={form.pickup} onChange={handleChange} placeholder="Enter pickup location..." />
            </label>
            <label>Delivery Location
              <input name="delivery" value={form.delivery} onChange={handleChange} placeholder="Enter delivery location..." />
            </label>

            <div className="row">
              <label>Pickup Date
                <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} />
              </label>
              <label>Delivery Date
                <input type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} />
              </label>
            </div>

            <label>Vehicle Type
              <select name="vehicleType" value={form.vehicleType} onChange={handleChange}>
                <option value="">Select vehicle type</option>
                <option>Mercedes Sprinter</option>
                <option>Ford Transit</option>
                <option>Peugeot Boxer</option>
              </select>
            </label>

            <div className="row">
              <label>Payment Amount
                <input name="payment" value={form.payment} onChange={handleChange} placeholder="Enter payment amount" />
              </label>
              <label>Reference Number
                <input name="reference" value={form.reference} onChange={handleChange} placeholder="Reference" />
              </label>
            </div>

            <label>Additional Notes
              <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Enter additional notes..." />
            </label>

            <button className="btn green" type="submit">POST JOB</button>
          </form>
        </section>
      </main>

      <footer className="footer">© XDrive Logistics — UI mock</footer>
    </div>
  )
}
