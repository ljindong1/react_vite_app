import { http, HttpResponse } from "msw"
import { faker } from "@faker-js/faker"
import type { UserProfile } from "@/types/user"

const users: UserProfile[] = Array.from({ length: 9 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  jobTitle: faker.person.jobTitle(),
  company: faker.company.name(),
  avatar: faker.image.avatarGitHub(),
  department: faker.commerce.department(),
}))

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json(users)
  }),
]
