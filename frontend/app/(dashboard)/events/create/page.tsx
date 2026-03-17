"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateEventPage() {

  const router = useRouter()

  const [faculty, setFaculty] = useState<any[]>([])

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    description: "",
    date: "",
    venue: "",
    faculty_coordinator: ""
  })

  useEffect(() => {

    const token = localStorage.getItem("token")

    fetch("http://127.0.0.1:8000/api/users/faculty/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setFaculty(data))

  }, [])

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e:any) => {
  e.preventDefault()

  const token = localStorage.getItem("token")

  const payload = {
    ...formData,
    faculty_coordinator: Number(formData.faculty_coordinator) // ✅ FIX
  }

  const response = await fetch(
    "http://127.0.0.1:8000/api/events/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
  )

  // const data = await response.json()
  let data = {}
try {
  data = await response.json()
} catch (e) {
  console.error("No JSON response")
}

console.log("STATUS:", response.status)
console.log("RESPONSE:", data)

  if(response.ok){
    router.push("/events")
  } else {
    console.error("ERROR:", data)   // ✅ now you will see real error
    alert("Event creation failed")
  }
}

  
  return (
    <div className="max-w-xl mx-auto">

      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              name="name"
              placeholder="Event Name"
              onChange={handleChange}
            />

            {/* <Input
              name="department"
              placeholder="Department"
              onChange={handleChange}
            /> */}
            <select
              name="department"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
              <option value="ME">Mechanical</option>
              <option value="CE">Civil</option>
              <option value="AIML">AI & ML</option>
            </select>

            <Input
              name="venue"
              placeholder="Venue"
              onChange={handleChange}
            />

            <Input
              type="date"
              name="date"
              onChange={handleChange}
            />

            <Input
              name="description"
              placeholder="Description"
              onChange={handleChange}
            />

            {/* Faculty Dropdown */}
            <select
              name="faculty_coordinator"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required   // ✅ ADD THIS
            >
              <option value="">Select Faculty Coordinator</option>

              {faculty.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>

            <Button type="submit" className="w-full">
              Create Event
            </Button>

          </form>

        </CardContent>
      </Card>

    </div>
  )
}