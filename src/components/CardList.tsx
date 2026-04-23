import { useEffect, useState } from "react"
import type { UserProfile } from "@/types/user"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardList() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="text-muted-foreground">불러오는 중...</p>
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Team Members</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.jobTitle}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
              <span>{user.email}</span>
              <span>{user.company}</span>
              <span className="text-xs">{user.department}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
