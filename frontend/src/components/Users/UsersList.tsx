import type { PublicUser } from "../../types/PublicUser"
import type { User } from "../../types/User"
import UserCard from "./UserCard"
import styles from "./Users.module.css"
import { ListSkeleton } from "../Loaders/Skeletons/ListSkeleton"
import ErrorState from "../errors/ErrorState"

interface UserListProps {
  users: (User | PublicUser)[]
  isPending: boolean
  isError: boolean
  hasActiveFilters: boolean
}

const UsersList = ({ users, isPending, isError, hasActiveFilters }: UserListProps) => {
  if (isPending) {
    return <ListSkeleton variant="user" />
  }

  if (isError) {
    return <ErrorState resource="användarna" />
  }

  if (users.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>{hasActiveFilters ? "Inga matchande användare" : "Inga användare att visa"}</h3>
        <p>
          {hasActiveFilters
            ? "Det finns inga användare som matchar din sökning eller filtrering."
            : "Det finns inga användare att visa just nu."}
        </p>
      </div>
    )
  }

  return (
    <ul className={styles.usersList}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  )
}

export default UsersList
