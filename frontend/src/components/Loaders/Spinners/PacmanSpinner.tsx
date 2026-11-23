import { PacmanLoader } from "react-spinners"

export const PacmanSpinner = () => {
  return (
    <div className="grid min-h-screen place-items-center" role="status" aria-label="Laddar">
      <PacmanLoader color="#006057" />
    </div>
  )
}
