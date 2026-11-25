import { AlertTriangle, RotateCw } from "lucide-react"
import styles from "./ErrorState.module.css"

type ErrorStateProps = {
  resource: string
  title?: string
  onRetry?: () => void
  isRetrying?: boolean
}

const ErrorState = ({ resource, title = "Något gick fel", onRetry, isRetrying = false }: ErrorStateProps) => (
  <div className={styles.errorState} role="alert">
    <div className={styles.icon} aria-hidden="true">
      <AlertTriangle size={22} />
    </div>

    <div className={styles.content}>
      <h3>{title}</h3>
      <p>Det gick inte att hämta {resource} just nu.</p>
      <p> Vänligen försök igen senare.</p>
      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry} disabled={isRetrying}>
          <RotateCw size={16} aria-hidden="true" />
          {isRetrying ? "Försöker igen…" : "Försök igen"}
        </button>
      )}
    </div>
  </div>
)

export default ErrorState
